import React, { useEffect } from 'react';
import { Translation } from '../lib/translations';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translation;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, t }) => {
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
      className="fixed inset-0 bg-slate-900/50 dark:bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white dark:bg-slate-800/80 rounded-xl shadow-2xl p-6 md:p-8 ring-1 ring-slate-200 dark:ring-slate-700 w-full max-w-2xl text-slate-700 dark:text-slate-300 relative transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 p-1 text-slate-400 dark:text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors rounded-full"
          aria-label={t.modal_close_aria}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-4 pr-8">{t.modal_title}</h2>
        
        <div className="space-y-4 text-slate-600 dark:text-slate-400 max-h-[70vh] overflow-y-auto pr-2">
            <p>
                {t.modal_p1}
            </p>

            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 pt-2">{t.modal_how_it_works}</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>{t.modal_step1.split(':')[0]}:</strong> {t.modal_step1.split(':')[1]}</li>
                <li><strong>{t.modal_step2.split(':')[0]}:</strong> {t.modal_step2.split(':')[1]}</li>
                <li><strong>{t.modal_step3.split(':')[0]}:</strong> {t.modal_step3.split(':')[1]}</li>
            </ol>

            <div className="pt-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">{t.modal_privacy_title}</h3>
                <p>
                    {t.modal_privacy_p1}
                </p>
            </div>
             <div className="pt-4 text-sm text-center text-slate-500 border-t border-slate-200 dark:border-slate-700 mt-6">
                {t.footer_created_by} <a href="https://www.linkedin.com/company/bim-partner/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors font-semibold">BIM PARTNER</a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;