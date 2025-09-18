
import React, { useState, useCallback, useMemo } from 'react';
import { IfcHeaderDescription } from './types';
import { parseIfcHeaderDescriptions, updateIfcHeaderDescriptions } from './services/ifcService';
import FileUpload from './components/FileUpload';
import PropertyEditor from './components/PropertyEditor';
import Button from './components/Button';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [originalContent, setOriginalContent] = useState<string | null>(null);
  const [descriptions, setDescriptions] = useState<IfcHeaderDescription[]>([]);
  const [editedValues, setEditedValues] = useState<Map<number, string>>(new Map());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    setIsLoading(true);
    setError(null);
    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        if (!content) {
            throw new Error("File is empty or could not be read.");
        }
        setOriginalContent(content);
        const parsedDescriptions = parseIfcHeaderDescriptions(content);
        setDescriptions(parsedDescriptions);
        setEditedValues(new Map());
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred during parsing.');
        resetState();
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
        setError("Failed to read the file.");
        setIsLoading(false);
    }
    reader.readAsText(file);
  }, []);

  const handleDescriptionChange = useCallback((index: number, newValue: string) => {
    setEditedValues(prev => {
      const newMap = new Map(prev);
      const originalDescription = descriptions.find(d => d.index === index);
      // Only store the change if it's different from the original value
      if (originalDescription && originalDescription.value !== newValue) {
        newMap.set(index, newValue);
      } else {
        newMap.delete(index); // If changed back to original, remove from edits
      }
      return newMap;
    });
  }, [descriptions]);

  const handleDownload = useCallback(() => {
    if (!originalContent || editedValues.size === 0) return;

    try {
        const updatedContent = updateIfcHeaderDescriptions(originalContent, editedValues);
        const blob = new Blob([updatedContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const newFileName = fileName ? `edited-${fileName}` : 'edited-file.ifc';
        a.download = newFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to generate the updated file.');
    }
  }, [originalContent, editedValues, fileName]);

  const resetState = () => {
    setFileName(null);
    setOriginalContent(null);
    setDescriptions([]);
    setEditedValues(new Map());
    setError(null);
    setIsLoading(false);
  }

  const isDownloadDisabled = useMemo(() => editedValues.size === 0, [editedValues]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-5xl mx-auto flex flex-col flex-grow">
        <Header />
        <main className="flex-grow bg-slate-800/50 rounded-xl shadow-2xl p-6 md:p-8 mt-6 ring-1 ring-slate-700">
          {!originalContent ? (
            <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} />
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-cyan-400">Editing Header Descriptions</h2>
                    <p className="text-slate-400 mt-1 truncate">File: {fileName}</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={handleDownload} disabled={isDownloadDisabled}>
                        Download Modified IFC
                    </Button>
                    <Button onClick={resetState} variant="secondary">
                        Load New File
                    </Button>
                </div>
              </div>
              {error && <div className="bg-red-900/50 text-red-300 p-3 rounded-lg mb-4">{error}</div>}
              {descriptions.length > 0 ? (
                <PropertyEditor 
                  properties={descriptions} 
                  onPropertyChange={handleDescriptionChange} 
                />
              ) : (
                <div className="text-center py-10 px-6 bg-slate-800 rounded-lg">
                    <p className="text-lg text-slate-400">No 'Description' entries were found in the file header.</p>
                </div>
              )}
            </div>
          )}
          {error && !originalContent && (
             <div className="bg-red-900/50 text-red-300 p-3 rounded-lg mt-4">{error}</div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
