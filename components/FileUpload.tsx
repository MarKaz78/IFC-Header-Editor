
import React, { useState, useCallback } from 'react';
import Loader from './Loader';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileSelect(event.target.files[0]);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  const dropzoneClasses = `flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300
    ${isDragging ? 'border-cyan-400 bg-slate-700' : 'border-slate-600 bg-slate-800 hover:bg-slate-700'}`;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-64">
        <Loader />
        <p className="mt-4 text-lg text-slate-300">Processing IFC file...</p>
      </div>
    );
  }

  return (
    <div 
        className={dropzoneClasses}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg className="w-10 h-10 mb-4 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
        </svg>
        <p className="mb-2 text-lg text-slate-400"><span className="font-semibold text-cyan-400">Click to upload</span> or drag and drop</p>
        <p className="text-sm text-slate-500">IFC file (.ifc)</p>
      </div>
      <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept=".ifc" />
    </div>
  );
};

export default FileUpload;
