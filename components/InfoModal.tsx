import React, { useEffect } from 'react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = ''; // Restore scrolling
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-slate-800/80 rounded-xl shadow-2xl p-6 md:p-8 ring-1 ring-slate-700 w-full max-w-2xl text-slate-300 relative transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 p-1 text-slate-500 hover:text-cyan-400 transition-colors rounded-full"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-cyan-400 mb-4 pr-8">About IFC Header Editor</h2>
        
        <div className="space-y-4 text-slate-400 max-h-[70vh] overflow-y-auto pr-2">
            <p>
                This tool allows you to quickly view and edit the 'Description' properties within an IFC file's header. It's designed for simple metadata updates without needing complex BIM software.
            </p>

            <h3 className="text-lg font-semibold text-slate-200 pt-2">How It Works</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>Upload:</strong> Select or drag-and-drop your .ifc file. The application reads the file directly in your browser.</li>
                <li><strong>Edit:</strong> The app parses the <code>FILE_DESCRIPTION</code> block and displays all description entries. You can modify existing values, add new ones, or delete entries.</li>
                <li><strong>Download:</strong> Once you're done, click the download button to get a new .ifc file with your changes applied.</li>
            </ol>

            <div className="pt-4">
                <h3 className="text-lg font-semibold text-slate-200">Privacy & Security</h3>
                <p>
                    Your privacy is paramount. All file processing happens entirely on your computer, within your web browser. <strong>Your files are never uploaded to any server.</strong>
                </p>
            </div>
             <div className="pt-4 text-sm text-center text-slate-500 border-t border-slate-700 mt-6">
                Stworzone przez <a href="https://www.linkedin.com/company/bim-partner/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold">BIM PARTNER</a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;