import React from 'react';
import { Translation } from '../lib/translations';

interface FooterProps {
    t: Translation;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
    return (
        <footer className="w-full max-w-5xl mx-auto text-center py-4 mt-8">
            <p className="text-sm text-slate-500">
                {t.footer_created_by} <a href="https://www.linkedin.com/company/bim-partner/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors font-semibold">BIM PARTNER</a>. {t.footer_rights_reserved}
            </p>
        </footer>
    );
}