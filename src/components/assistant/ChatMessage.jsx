import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { MarkdownFormatter } from './MarkdownFormatter';
import { Badge } from '../common';
import { Link } from 'react-router-dom';

export const ChatMessage = ({
  message,
  onRetry,
  isLast,
}) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';
  const isError = message.isError;

  const handleCopy = () => {
    if (message.content) {
      navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatTimestamp = (date) => {
    if (!date) return '';
    try {
      const d = typeof date === 'string' ? new Date(date) : date;
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'} w-full group`}
    >
      {/* Assistant Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
          <Bot className="w-4 h-4" />
        </div>
      )}

      {/* Message Bubble Container */}
      <div className={`max-w-[85%] sm:max-w-[78%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Header (Role & Time) */}
        <div className="flex items-center gap-2 mb-1 px-1">
          <span className="text-[11px] font-semibold text-slate-500">
            {isUser ? 'You' : 'MEDISCAN Biology Assistant'}
          </span>
          <span className="text-[10px] text-slate-400">
            {formatTimestamp(message.timestamp || new Date())}
          </span>
          {!isUser && (
            <span className="text-[10px] text-teal-600 font-medium px-1.5 py-0.2 rounded bg-teal-50 border border-teal-100">
              Grounded
            </span>
          )}
        </div>

        {/* Content Box */}
        <div
          className={`p-4 rounded-2xl relative shadow-xs transition-all ${
            isUser
              ? 'bg-blue-600 text-white rounded-tr-xs'
              : isError
              ? 'bg-red-50/90 border border-red-200 text-red-900 rounded-tl-xs'
              : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs hover:border-slate-300'
          }`}
        >
          {isUser ? (
            <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          ) : isError ? (
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm font-medium text-red-800">
                  {message.content}
                </p>
              </div>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 text-xs font-semibold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Retry Question
                </button>
              )}
            </div>
          ) : (
            <div>
              <MarkdownFormatter content={message.content} />

              {/* Quick explorer deep link callout if relevant topic mentioned */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-slate-500">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  Educational Biology Explanation
                </span>
                <Link
                  to="/biological-explorer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  <span>Open Biological Explorer</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions for Assistant message (Copy, Retry) */}
        {!isUser && !isError && (
          <div className="flex items-center gap-2 mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-100 transition-colors"
              title="Copy answer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-600 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
          <User className="w-4 h-4" />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;
