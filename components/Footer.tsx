import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="w-full max-w-5xl mx-auto text-center py-4 mt-8">
            <p className="text-sm text-slate-500">
                Stworzone przez <a href="https://www.linkedin.com/company/bim-partner/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold">BIM PARTNER</a>. Wszelkie prawa zastrzeżone.
            </p>
        </footer>
    );
}
