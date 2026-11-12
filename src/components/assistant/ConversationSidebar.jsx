import React from 'react';
import {
  MessageSquare,
  Plus,
  Trash2,
  Clock,
  ShieldAlert,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Button, Badge } from '../common';

export const ConversationSidebar = ({
  conversations,
  activeId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onClearAll,
}) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-2 bg-slate-50/60">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Conversations
          </h3>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={onNewConversation}
          className="text-xs px-2.5 py-1 h-7 rounded-lg font-semibold"
        >
          <Plus className="w-3.5 h-3.5 mr-1" />
          <span>New Chat</span>
        </Button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {conversations.length === 0 ? (
          <div className="text-center py-10 px-4">
            <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-700">No conversations yet</p>
            <p className="text-[11px] text-slate-400 mt-1">
              Start by typing a question or selecting a suggested biological topic.
            </p>
          </div>
        ) : (
          conversations.map((conv) => {
            const isActive = conv.id === activeId;
            return (
              <div
                key={conv.id}
                className={`group flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-900 font-semibold border border-blue-100 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }`}
                onClick={() => onSelectConversation(conv.id)}
              >
                <div className="flex-1 min-w-0 pr-2">
                  <p className="text-xs truncate font-medium">
                    {conv.title || 'Untitled Conversation'}
                  </p>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {conv.messages.length} messages
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteConversation(conv.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                  title="Delete conversation"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Storage Disclaimer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/70 space-y-2">
        <div className="flex items-start gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-[10px] text-slate-500 leading-relaxed">
            Local conversation history is stored in your browser session for your convenience and is <strong>not a medical record</strong>.
          </p>
        </div>

        {conversations.length > 0 && (
          <button
            onClick={onClearAll}
            className="w-full text-center text-[10px] font-semibold text-slate-400 hover:text-red-600 transition-colors py-1"
          >
            Clear all chat history
          </button>
        )}
      </div>
    </div>
  );
};

export default ConversationSidebar;
