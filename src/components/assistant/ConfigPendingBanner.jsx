import React from 'react';
import { AlertCircle, Key, Info, HelpCircle } from 'lucide-react';

export const ConfigPendingBanner = ({ onCheckStatus }) => {
  return (
    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-900 shadow-2xs">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0 mt-0.5">
          <Key className="w-4 h-4" />
        </div>
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              AI Assistant Configuration Pending
            </h4>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-200 text-amber-800">
              Backend Setup Required
            </span>
          </div>

          <p className="text-xs text-amber-800 leading-relaxed font-medium">
            AI assistant configuration is pending. Please configure the backend API key.
          </p>

          <div className="text-[11px] text-amber-700/90 space-y-1 pt-1 border-t border-amber-200/60">
            <p>
              To enable live conversational intelligence powered by Google Gemini:
            </p>
            <ol className="list-decimal pl-4 space-y-0.5">
              <li>Open or create <code className="px-1 py-0.5 bg-amber-100 rounded font-mono text-[10px]">backend/.env</code> in your project directory.</li>
              <li>Set <code className="px-1 py-0.5 bg-amber-100 rounded font-mono text-[10px]">GEMINI_API_KEY=your_key_here</code>.</li>
              <li>Restart or run the backend service (<code className="px-1 py-0.5 bg-amber-100 rounded font-mono text-[10px]">uvicorn main:app</code>).</li>
            </ol>
          </div>

          {onCheckStatus && (
            <div className="pt-1.5">
              <button
                onClick={onCheckStatus}
                className="text-xs font-bold text-amber-900 hover:text-amber-950 underline cursor-pointer"
              >
                Re-check backend API status
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigPendingBanner;
