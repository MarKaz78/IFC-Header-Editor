import React from 'react';
import { IfcHeaderDescription } from '../types';

interface PropertyEditorProps {
  properties: IfcHeaderDescription[];
  onPropertyChange: (index: number, newValue: string) => void;
}

const PropertyEditor: React.FC<PropertyEditorProps> = ({ properties, onPropertyChange }) => {
  return (
    <div className="overflow-x-auto bg-slate-900/70 rounded-lg ring-1 ring-slate-700">
      <table className="w-full text-sm text-left text-slate-300">
        <thead className="text-xs text-cyan-400 uppercase bg-slate-800">
          <tr>
            <th scope="col" className="px-6 py-3 w-1/6">
              Index
            </th>
            <th scope="col" className="px-6 py-3 w-2/5">
              Current Description
            </th>
            <th scope="col" className="px-6 py-3 w-2/5">
              New Description
            </th>
          </tr>
        </thead>
        <tbody>
          {properties.map((prop) => (
            <tr key={prop.index} className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors">
              <th scope="row" className="px-6 py-4 font-mono font-medium text-slate-200 whitespace-nowrap align-top">
                {prop.index + 1}
              </th>
              <td className="px-6 py-4 text-slate-400 align-top whitespace-pre-wrap">
                {prop.value || <span className="italic">empty</span>}
              </td>
              <td className="px-6 py-4">
                <textarea
                  defaultValue={prop.value}
                  onChange={(e) => onPropertyChange(prop.index, e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 text-slate-200 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2.5 transition resize-y min-h-[42px]"
                  placeholder="Enter new description"
                  aria-label={`New description for index ${prop.index + 1}`}
                  rows={3}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyEditor;