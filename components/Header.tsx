import React, { useState } from 'react';
import InfoModal from './InfoModal';

export const Header: React.FC = () => {
    const [isInfoModalOpen, setInfoModalOpen] = useState(false);

    return (
        <>
            <header className="text-center relative">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
                IFC Header Editor
                </h1>
                <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                Upload your IFC file, edit the 'Description' fields in the file header, and download the updated version instantly.
                </p>
                <button 
                    onClick={() => setInfoModalOpen(true)}
                    className="absolute top-[-4px] right-[-4px] sm:top-0 sm:right-0 p-2 text-slate-500 hover:text-cyan-400 transition-colors rounded-full hover:bg-slate-800"
                    aria-label="About this application"
                    title="About this application"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </button>
            </header>
            <InfoModal isOpen={isInfoModalOpen} onClose={() => setInfoModalOpen(false)} />
        </>
    );
}