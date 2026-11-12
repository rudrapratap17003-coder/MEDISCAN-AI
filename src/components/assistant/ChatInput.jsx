import React, { useRef, useEffect } from 'react';
import { Send, CornerDownLeft, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '../common';

export const ChatInput = ({
  input,
  setInput,
  onSend,
  isLoading,
  disabled,
  placeholder = "Ask about organ functions, biological pathways, disease mechanisms...",
}) => {
  const textareaRef = useRef(null);

  // Auto-resize textarea up to max height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 160)}px`;
    }
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && !disabled && input.trim()) {
        onSend();
      }
    }
  };

  const charCount = input.length;
  const maxChars = 4000;

  return (
    <div className="relative bg-white rounded-2xl border border-slate-200/90 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all p-3">
      <textarea
        ref={textareaRef}
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || isLoading}
        maxLength={maxChars}
        className="w-full bg-transparent resize-none text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none max-h-40 overflow-y-auto leading-relaxed"
      />

      <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-1">
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span className="hidden sm:inline-flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px] border border-slate-200">
              Enter
            </kbd>
            <span>to send</span>
            <span className="text-slate-300">•</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px] border border-slate-200">
              Shift + Enter
            </kbd>
            <span>for new line</span>
          </span>
          <span className="sm:hidden">Press send</span>
        </div>

        <div className="flex items-center gap-3">
          {charCount > 500 && (
            <span className={`text-[10px] ${charCount > 3500 ? 'text-amber-600' : 'text-slate-400'}`}>
              {charCount}/{maxChars}
            </span>
          )}

          <Button
            size="sm"
            variant="primary"
            disabled={!input.trim() || isLoading || disabled}
            onClick={onSend}
            className="rounded-xl px-3.5 py-1.5 h-8 text-xs font-semibold shadow-xs"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
                <span>Thinking...</span>
              </>
            ) : (
              <>
                <span>Send</span>
                <Send className="w-3.5 h-3.5 ml-1.5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
