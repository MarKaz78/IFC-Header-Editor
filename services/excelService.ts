import { IfcHeaderDescription } from '../types';
import { Translation } from '../lib/translations';

declare var XLSX: any;

interface ExcelRow {
    Index: number;
    Description: string;
}

export const exportToExcel = (
    descriptions: IfcHeaderDescription[],
    fileName: string = 'ifc_descriptions.xlsx',
    t: Translation
): void => {
    try {
        const dataToExport = descriptions.map(d => ({
            Index: d.index,
            Description: d.value
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Descriptions');
        
        worksheet['!cols'] = [{ wch: 10 }, { wch: 80 }];

        XLSX.writeFile(workbook, fileName);
    } catch (error) {
        console.error("Error exporting to Excel:", error);
        throw new Error("error_excel_export");
    }
};

export const importFromExcel = (file: File, t: Translation): Promise<ExcelRow[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const data = event.target?.result;
                if (!data) {
                    throw new Error("error_excel_read");
                }

                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json: any[] = XLSX.utils.sheet_to_json(worksheet);

                if (json.length > 0) {
                    const firstRow = json[0];
                    if (!('Index' in firstRow && 'Description' in firstRow)) {
                        throw new Error("error_excel_format");
                    }
                }

                const importedData: ExcelRow[] = json.map((row, i) => {
                    if (typeof row.Index !== 'number' || typeof row.Description === 'undefined') {
                         const errorMessage = t.error_excel_row_data.replace('{row}', String(i + 2));
                         throw new Error(errorMessage);
                    }
                    return {
                        Index: row.Index,
                        Description: String(row.Description ?? '')
                    };
                });
                
                resolve(importedData);

            } catch (error) {
                console.error("Error importing from Excel:", error);
                reject(error instanceof Error ? error : new Error("error_excel_processing"));
            }
        };

        reader.onerror = () => {
            reject(new Error("error_reading_file"));
        };

        reader.readAsArrayBuffer(file);
    });
};
