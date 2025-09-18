
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
            IFC Header Editor
            </h1>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Upload your IFC file, edit the 'Description' fields in the file header, and download the updated version instantly.
            </p>
        </header>
    );
}
