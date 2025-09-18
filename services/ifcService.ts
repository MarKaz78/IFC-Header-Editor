import { IfcHeaderDescription } from '../types';

/**
 * Parses the string content of an IFC file to find all descriptions
 * within the FILE_DESCRIPTION section of the header.
 * @param fileContent The raw string content of the IFC file.
 * @returns An array of IfcHeaderDescription objects.
 */
export const parseIfcHeaderDescriptions = (fileContent: string): IfcHeaderDescription[] => {
  const descriptions: IfcHeaderDescription[] = [];

  // Regex to find the entire FILE_DESCRIPTION(...) statement block.
  const fileDescBlockRegex = /^FILE_DESCRIPTION\s*\(([\s\S]*?)\);/m;
  const blockMatch = fileContent.match(fileDescBlockRegex);

  if (!blockMatch || !blockMatch[1]) {
    return []; // No FILE_DESCRIPTION block found
  }

  const argsString = blockMatch[1]; // The content between FILE_DESCRIPTION(...)

  // The description list is the first argument, enclosed in parentheses.
  // This regex finds the list by matching from the start of the arguments.
  const listRegex = /^\s*\(([\s\S]*?)\)/;
  const listMatch = argsString.match(listRegex);

  if (!listMatch || listMatch[1] === undefined) {
    return []; // No description list found inside the block
  }

  const descriptionsString = listMatch[1];

  // Regex to extract individual single-quoted strings from the list.
  // This handles escaped single quotes ('') within the string.
  const valueRegex = /'((?:''|[^'])*)'/g;
  let valueMatch;
  let index = 0;
  while ((valueMatch = valueRegex.exec(descriptionsString)) !== null) {
    // Unescape IFC string: \N\ -> newline, \\ -> \, '' -> '
    const value = valueMatch[1]
      .replace(/\\N\\/g, '\n')
      .replace(/\\\\/g, '\\')
      .replace(/''/g, "'");
    descriptions.push({ index, value });
    index++;
  }

  return descriptions;
};

/**
 * Updates the IFC file content with new header description values.
 * Multi-line input in a textarea is converted into multiple separate description entries.
 * @param originalContent The original raw string content of the IFC file.
 * @param updates A map where the key is the description's index and the value is the new description string.
 * @returns The updated IFC file content as a string.
 */
export const updateIfcHeaderDescriptions = (originalContent: string, updates: Map<number, string>): string => {
  const originalDescriptions = parseIfcHeaderDescriptions(originalContent);

  // This more robust regex captures the parts around the description list,
  // so we can replace the list itself without breaking the rest of the statement.
  // Group 1: The prefix, e.g., "FILE_DESCRIPTION("
  // Group 2: The entire description list to be replaced, e.g., "('desc1','desc2')"
  // Group 3: The suffix, e.g., ",'2;1');"
  const replaceRegex = /^(FILE_DESCRIPTION\s*\()(\([\s\S]*?\))([\s\S]*?;)/m;
  const match = originalContent.match(replaceRegex);

  if (!match) {
    console.warn("Could not find a valid FILE_DESCRIPTION line to update.");
    return originalContent;
  }
  
  // Build the new, flattened list of description strings.
  const finalValues: string[] = [];
  originalDescriptions.forEach(desc => {
    const updatedValue = updates.get(desc.index);
    if (updatedValue !== undefined) {
      // If there's an update, split it by newlines and add each line as a separate entry.
      // Filter out empty strings that result from multiple newlines or trailing newlines.
      const newLines = updatedValue.split(/\r?\n/).filter(line => line.length > 0);
      if (newLines.length > 0) {
        finalValues.push(...newLines);
      }
    } else {
      // Otherwise, add the original value.
      finalValues.push(desc.value);
    }
  });

  // Escape special characters for IFC format: \ -> \\, ' -> ''
  // Newlines are no longer converted to \N\, but are used to create new entries.
  const escapedValues = finalValues.map(v =>
    `'${v.replace(/\\/g, '\\\\').replace(/'/g, "''")}'`
  );

  const newDescriptionsListContent = escapedValues.join(',');
  const newDescriptionsList = `(${newDescriptionsListContent})`;

  const updatedContent = originalContent.replace(
    replaceRegex,
    `$1${newDescriptionsList}$3`
  );

  return updatedContent;
};