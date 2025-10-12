import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { IfcHeaderDescription } from './types';
import { parseIfcHeaderDescriptions, updateIfcHeaderDescriptions } from './services/ifcService';
import { exportToExcel, importFromExcel } from './services/excelService';
import FileUpload from './components/FileUpload';
import PropertyEditor from './components/PropertyEditor';
import Button from './components/Button';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { translations } from './lib/translations';

type Language = 'pl' | 'en' | 'es';
type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('pl');
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  const [fileName, setFileName] = useState<string | null>(null);
  const [originalContent, setOriginalContent] = useState<string | null>(null);
  const [descriptions, setDescriptions] = useState<IfcHeaderDescription[]>([]);
  const [initialDescriptions, setInitialDescriptions] = useState<IfcHeaderDescription[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  const t = useMemo(() => translations[language], [language]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.app_title;
  }, [language, t]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeToggle = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const handleLanguageChange = useCallback(() => {
    setLanguage(prev => {
        if (prev === 'pl') return 'en';
        if (prev === 'en') return 'es';
        return 'pl';
    });
  }, []);

  const getErrorMessage = (e: unknown) => {
    if (e instanceof Error && t[e.message as keyof typeof t]) {
        return t[e.message as keyof typeof t];
    }
    return t.error_unknown;
  };

  const handleFileSelect = useCallback((file: File) => {
    setIsLoading(true);
    setError(null);
    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        if (!content) {
            throw new Error("error_file_empty");
        }
        setOriginalContent(content);
        const parsedDescriptions = parseIfcHeaderDescriptions(content);
        setDescriptions(parsedDescriptions);
        setInitialDescriptions(parsedDescriptions);
      } catch (e) {
        setError(getErrorMessage(e));
        resetState();
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
        setError(t.error_reading_file);
        setIsLoading(false);
    }
    reader.readAsText(file);
  }, [t]);

  const handleDescriptionChange = useCallback((index: number, newValue: string) => {
    setDescriptions(prev =>
      prev.map(desc => (desc.index === index ? { ...desc, value: newValue } : desc))
    );
  }, []);

  const handleDescriptionDelete = useCallback((indexToDelete: number) => {
    setDescriptions(prev => prev.filter(desc => desc.index !== indexToDelete));
    setSelectedIndices(prev => prev.filter(i => i !== indexToDelete));
  }, []);

  const handleAddNewDescription = () => {
    setDescriptions(prev => {
      const newIndex = prev.length > 0 ? Math.max(...prev.map(d => d.index)) + 1 : 0;
      return [
        ...prev,
        { index: newIndex, value: '' }
      ];
    });
  };

  const handleDownload = useCallback(() => {
    if (!originalContent) return;

    try {
        const updatedContent = updateIfcHeaderDescriptions(originalContent, descriptions);
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
        setError(t.error_generating_file);
    }
  }, [originalContent, descriptions, fileName, t]);

  const handleSelectAll = useCallback((checked: boolean) => {
    if (checked) {
      setSelectedIndices(descriptions.map(d => d.index));
    } else {
      setSelectedIndices([]);
    }
  }, [descriptions]);

  const handleSelectRow = useCallback((index: number, checked: boolean) => {
    setSelectedIndices(prev => {
      if (checked) {
        return [...prev, index];
      } else {
        return prev.filter(i => i !== index);
      }
    });
  }, []);

  const handleExport = () => {
    const selectedDescriptions = descriptions.filter(d => selectedIndices.includes(d.index));
    if (selectedDescriptions.length > 0) {
      const exportFileName = 'IFC_Description.xlsx';
      exportToExcel(selectedDescriptions, exportFileName, t);
    }
  };

  const handleImportClick = () => {
    importInputRef.current?.click();
  };

  const handleImportFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);
    try {
        const importedData = await importFromExcel(file, t);
        
        setDescriptions(prevDescriptions => {
            const descriptionsMap = new Map<number, string>(prevDescriptions.map(d => [d.index, d.value]));

            for (const item of importedData) {
                descriptionsMap.set(item.Index, item.Description);
            }

            const newDescriptions: IfcHeaderDescription[] = Array.from(descriptionsMap.entries()).map(([index, value]) => ({
                index,
                value
            }));
            
            newDescriptions.sort((a, b) => a.index - b.index);
            
            return newDescriptions;
        });

    } catch (e) {
        setError(getErrorMessage(e));
    } finally {
        setIsLoading(false);
        if (event.target) {
            event.target.value = '';
        }
    }
  };

  const resetState = () => {
    setFileName(null);
    setOriginalContent(null);
    setDescriptions([]);
    setInitialDescriptions([]);
    setSelectedIndices([]);
    setError(null);
    setIsLoading(false);
  }

  const isDownloadDisabled = useMemo(() => {
    return JSON.stringify(descriptions.map(({index, value}) => ({index, value})).sort((a, b) => a.index - b.index)) === 
           JSON.stringify(initialDescriptions.map(({index, value}) => ({index, value})).sort((a, b) => a.index - b.index));
  }, [descriptions, initialDescriptions]);

  return (
    <div className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-5xl mx-auto flex flex-col flex-grow">
        <Header t={t} onLanguageChange={handleLanguageChange} language={language} theme={theme} onThemeToggle={handleThemeToggle} />
        <main className="flex-grow bg-white/50 dark:bg-slate-800/50 rounded-xl shadow-2xl p-6 md:p-8 mt-6 ring-1 ring-slate-200 dark:ring-slate-700">
          {!originalContent ? (
            <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} t={t} />
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{t.main_view_title}</h2>
                    <p className="text-slate-600 dark:text-slate-400 mt-1 truncate">{t.main_view_file}: {fileName}</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={handleDownload} disabled={isDownloadDisabled}>
                        {t.button_download}
                    </Button>
                    <Button onClick={resetState} variant="secondary">
                        {t.button_new_file}
                    </Button>
                </div>
              </div>
              {error && <div className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 p-3 rounded-lg mb-4">{error}</div>}
              {descriptions.length > 0 ? (
                <>
                  <PropertyEditor 
                    properties={descriptions} 
                    onPropertyChange={handleDescriptionChange}
                    onPropertyDelete={handleDescriptionDelete}
                    selectedIndices={selectedIndices}
                    onSelectAll={handleSelectAll}
                    onSelectRow={handleSelectRow}
                    t={t}
                  />
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-2">
                        <Button onClick={handleImportClick} variant="secondary">
                          {t.button_import_excel}
                        </Button>
                        <Button onClick={handleExport} variant="secondary" disabled={selectedIndices.length === 0}>
                          {t.button_export_excel}
                        </Button>
                        <input
                            type="file"
                            ref={importInputRef}
                            onChange={handleImportFile}
                            className="hidden"
                            accept=".xlsx, .xls"
                        />
                    </div>
                    <Button onClick={handleAddNewDescription} variant="secondary">
                      {t.button_add_value}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-10 px-6 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <p className="text-lg text-slate-500 dark:text-slate-400">{t.no_descriptions_found}</p>
                     <div className="mt-4">
                        <Button onClick={handleAddNewDescription} variant="secondary">
                         {t.button_add_first_desc}
                        </Button>
                    </div>
                </div>
              )}
            </div>
          )}
          {error && !originalContent && (
             <div className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 p-3 rounded-lg mt-4">{error}</div>
          )}
        </main>
      </div>
      <Footer t={t} />
    </div>
  );
};

export default App;