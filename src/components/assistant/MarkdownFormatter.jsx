import React from 'react';

/**
 * Lightweight custom markdown formatter for educational AI responses.
 * Formats headings, bullet lists, bold highlights, and biological terminology.
 */
export const MarkdownFormatter = ({ content }) => {
  if (!content) return null;

  const lines = content.split('\n');
  const elements = [];
  let currentList = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="my-2 space-y-1.5 pl-4 list-disc text-slate-700 marker:text-blue-500">
          {currentList.map((item, idx) => (
            <li key={idx} className="text-xs sm:text-sm leading-relaxed">
              {formatInline(item)}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const formatInline = (text) => {
    // Process **bold** and `code`
    const parts = [];
    let remaining = text;
    let keyIdx = 0;

    // Regex for bold **text** or *text* or `code`
    const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      if (match[2]) {
        // **bold**
        parts.push(
          <strong key={keyIdx++} className="font-semibold text-slate-900">
            {match[2]}
          </strong>
        );
      } else if (match[3]) {
        // *italic*
        parts.push(
          <em key={keyIdx++} className="italic text-slate-800">
            {match[3]}
          </em>
        );
      } else if (match[4]) {
        // `code` / term
        parts.push(
          <span
            key={keyIdx++}
            className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-[11px] border border-blue-100"
          >
            {match[4]}
          </span>
        );
      }
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Check for lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\.\s/.test(trimmed)) {
      const text = trimmed.replace(/^[-*]\s+|\d+\.\s+/, '');
      currentList.push(text);
      return;
    } else {
      flushList();
    }

    // Check for empty lines
    if (!trimmed) {
      return;
    }

    // Check for headings
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h4 key={`h3-${index}`} className="text-sm font-bold text-slate-900 mt-3 mb-1">
          {formatInline(trimmed.substring(4))}
        </h4>
      );
    } else if (trimmed.startsWith('## ')) {
      elements.push(
        <h3 key={`h2-${index}`} className="text-base font-bold text-slate-900 mt-4 mb-1.5 pb-1 border-b border-slate-100">
          {formatInline(trimmed.substring(3))}
        </h3>
      );
    } else if (trimmed.startsWith('# ')) {
      elements.push(
        <h2 key={`h1-${index}`} className="text-lg font-extrabold text-slate-900 mt-4 mb-2">
          {formatInline(trimmed.substring(2))}
        </h2>
      );
    } else {
      // Regular paragraph
      elements.push(
        <p key={`p-${index}`} className="text-xs sm:text-sm text-slate-700 leading-relaxed my-1.5">
          {formatInline(trimmed)}
        </p>
      );
    }
  });

  flushList();

  return <div className="space-y-1">{elements}</div>;
};

export default MarkdownFormatter;
