import React from 'react';
import { IfcHeaderDescription } from '../types';
import { Translation } from '../lib/translations';

interface PropertyEditorProps {
  properties: IfcHeaderDescription[];
  selectedIndices: number[];
  onPropertyChange: (index: number, newValue: string) => void;
  onPropertyDelete: (index: number) => void;
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (index: number, checked: boolean) => void;
  t: Translation;
}

const PropertyEditor: React.FC<PropertyEditorProps> = ({ 
  properties, 
  selectedIndices,
  onPropertyChange, 
  onPropertyDelete,
  onSelectAll,
  onSelectRow,
  t
}) => {
  const isAllSelected = properties.length > 0 && selectedIndices.length === properties.length;

  return (
    <div className="overflow-x-auto bg-white/70 dark:bg-slate-900/70 rounded-lg ring-1 ring-slate-200 dark:ring-slate-700">
      <table className="w-full text-sm text-left text-slate-600 dark:text-slate-300">
        <thead className="text-xs text-cyan-700 dark:text-cyan-400 uppercase bg-slate-100 dark:bg-slate-800">
          <tr>
            <th scope="col" className="px-4 py-3 w-[5%]">
              <input 
                type="checkbox"
                className="w-4 h-4 text-cyan-600 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-500 rounded focus:ring-cyan-500 focus:ring-offset-white dark:focus:ring-offset-slate-800"
                checked={isAllSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
                aria-label={t.table_aria_select_all}
              />
            </th>
            <th scope="col" className="px-6 py-3 w-[5%]">
              {t.table_header_index}
            </th>
            <th scope="col" className="px-6 py-3 w-[37%]">
              {t.table_header_current_desc}
            </th>
            <th scope="col" className="px-6 py-3 w-[43%]">
              {t.table_header_new_desc}
            </th>
            <th scope="col" className="px-6 py-3 w-[10%] text-center">
              {t.table_header_actions}
            </th>
          </tr>
        </thead>
        <tbody>
          {properties.map((prop, displayIndex) => (
            <tr key={prop.index} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <td className="px-4 py-4">
                <input 
                  type="checkbox"
                  className="w-4 h-4 text-cyan-600 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-500 rounded focus:ring-cyan-500 focus:ring-offset-white dark:focus:ring-offset-slate-800"
                  checked={selectedIndices.includes(prop.index)}
                  onChange={(e) => onSelectRow(prop.index, e.target.checked)}
                  aria-label={`${t.table_aria_select_row} ${displayIndex + 1}`}
                />
              </td>
              <th scope="row" className="px-6 py-4 font-mono font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap align-top">
                {displayIndex + 1}
              </th>
              <td className="px-6 py-4 text-slate-500 dark:text-slate-400 align-top whitespace-pre-wrap">
                {prop.value || <span className="italic">{t.table_empty_cell}</span>}
              </td>
              <td className="px-6 py-4">
                <textarea
                  value={prop.value}
                  onChange={(e) => onPropertyChange(prop.index, e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2.5 transition resize-y min-h-[42px]"
                  placeholder={t.table_new_desc_placeholder}
                  aria-label={`${t.table_header_new_desc} ${displayIndex + 1}`}
                  rows={3}
                />
              </td>
              <td className="px-6 py-4 align-top text-center">
                <button
                  onClick={() => onPropertyDelete(prop.index)}
                  className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  aria-label={`${t.table_aria_delete_row} ${displayIndex + 1}`}
                  title={t.table_delete_tooltip}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyEditor;