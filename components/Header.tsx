import React, { useState } from 'react';
import InfoModal from './InfoModal';
import { Translation } from '../lib/translations';

type Language = 'pl' | 'en' | 'es';
type Theme = 'light' | 'dark';

interface HeaderProps {
    t: Translation;
    language: Language;
    onLanguageChange: () => void;
    theme: Theme;
    onThemeToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ t, language, onLanguageChange, theme, onThemeToggle }) => {
    const [isInfoModalOpen, setInfoModalOpen] = useState(false);

    const getNextLanguageLabel = (lang: Language) => {
        if (lang === 'pl') return 'EN';
        if (lang === 'en') return 'ES';
        return 'PL';
    };

    return (
        <>
            <header className="text-center relative">
                <div className="absolute top-[-4px] right-[-4px] sm:top-0 sm:right-0 flex items-center gap-2">
                     <button
                        onClick={onThemeToggle}
                        className="p-2 text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"
                        aria-label="Toggle theme"
                        title="Toggle theme"
                    >
                        {theme === 'light' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                               <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                            </svg>
                        )}
                    </button>
                    <button
                        onClick={onLanguageChange}
                        className="p-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 w-10"
                        aria-label="Change language"
                        title="Change language"
                    >
                        {getNextLanguageLabel(language)}
                    </button>
                    <button 
                        onClick={() => setInfoModalOpen(true)}
                        className="p-2 text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"
                        aria-label={t.header_info_button_aria}
                        title={t.header_info_button_aria}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                    </button>
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-600 dark:from-cyan-400 dark:to-teal-500 py-2">
                    {t.header_title}
                </h1>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    {t.header_subtitle}
                </p>
            </header>
            <InfoModal isOpen={isInfoModalOpen} onClose={() => setInfoModalOpen(false)} t={t} />
        </>
    );
}