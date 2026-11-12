import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  RotateCcw,
  Trash2,
  Menu,
  X,
  Compass,
  Layers,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';
import { Button, Badge, Card, Modal } from '../components/common';
import {
  ChatMessage,
  ChatInput,
  SuggestedQuestions,
  QuickLearningShortcuts,
  ConversationSidebar,
  ConfigPendingBanner,
} from '../components/assistant';

const STORAGE_KEY = 'mediscan_conversations_v1';

const createNewConversation = () => ({
  id: 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
  title: 'New Biological Inquiry',
  messages: [],
  createdAt: new Date().toISOString(),
});

export const AIBiologyAssistantPage = () => {
  const [conversations, setConversations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse saved conversations', e);
    }
    return [createNewConversation()];
  });

  const [activeId, setActiveId] = useState(() => {
    return conversations[0]?.id || '';
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backendConfigured, setBackendConfigured] = useState(true);
  const [backendChecked, setBackendChecked] = useState(false);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const messagesEndRef = useRef(null);

  // Sync conversations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch (e) {
      console.warn('Failed to save conversations to localStorage', e);
    }
  }, [conversations]);

  // Check backend health and configuration on mount
  const checkBackendHealth = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setBackendConfigured(Boolean(data.configured));
      } else {
        setBackendConfigured(false);
      }
    } catch (err) {
      console.warn('Backend connection check failed', err);
      setBackendConfigured(false);
    } finally {
      setBackendChecked(true);
    }
  };

  useEffect(() => {
    checkBackendHealth();
  }, []);

  // Auto scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const activeConversation =
    conversations.find((c) => c.id === activeId) || conversations[0] || createNewConversation();

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages, isLoading]);

  const handleNewConversation = () => {
    const newConv = createNewConversation();
    setConversations((prev) => [newConv, ...prev]);
    setActiveId(newConv.id);
    setIsSidebarOpenMobile(false);
  };

  const handleDeleteConversation = (idToDelete) => {
    const updated = conversations.filter((c) => c.id !== idToDelete);
    if (updated.length === 0) {
      const fresh = createNewConversation();
      setConversations([fresh]);
      setActiveId(fresh.id);
    } else {
      setConversations(updated);
      if (activeId === idToDelete) {
        setActiveId(updated[0].id);
      }
    }
  };

  const handleClearCurrentConversation = () => {
    setConversations((prev) =>
      prev.map((c) => (c.id === activeId ? { ...c, messages: [] } : c))
    );
    setShowClearConfirm(false);
  };

  const handleClearAllConversations = () => {
    const fresh = createNewConversation();
    setConversations([fresh]);
    setActiveId(fresh.id);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setShowClearConfirm(false);
  };

  const handleSendMessage = async (customText = null) => {
    const textToSend = (customText || input).trim();
    if (!textToSend || isLoading) return;

    // Create user message
    const userMsg = {
      id: 'msg_' + Date.now(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toISOString(),
    };

    // Build next messages list
    const currentMsgs = activeConversation.messages || [];
    const updatedMessages = [...currentMsgs, userMsg];

    // Auto title if first message
    let newTitle = activeConversation.title;
    if (currentMsgs.length === 0) {
      newTitle = textToSend.length > 36 ? textToSend.substring(0, 36) + '...' : textToSend;
    }

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId ? { ...c, title: newTitle, messages: updatedMessages } : c
      )
    );

    if (!customText) {
      setInput('');
    }
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: currentMsgs.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          conversation_id: activeId,
        }),
      });

      if (!response.ok) {
        let errDetail = 'Unable to connect to the assistant service.';
        try {
          const errJson = await response.json();
          if (errJson && errJson.detail) {
            errDetail = errJson.detail;
          }
        } catch {}

        if (response.status === 503 || errDetail.includes('configuration is pending')) {
          setBackendConfigured(false);
          const assistantErrMsg = {
            id: 'err_' + Date.now(),
            role: 'assistant',
            content: 'AI assistant configuration is pending. Please configure the backend API key.',
            timestamp: new Date().toISOString(),
            isError: true,
          };
          setConversations((prev) =>
            prev.map((c) =>
              c.id === activeId ? { ...c, messages: [...updatedMessages, assistantErrMsg] } : c
            )
          );
          return;
        }

        throw new Error(errDetail);
      }

      const data = await response.json();
      setBackendConfigured(true);

      const assistantMsg = {
        id: 'msg_' + Date.now(),
        role: 'assistant',
        content: data.response || 'No response formulated.',
        timestamp: new Date().toISOString(),
        model: data.model,
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId ? { ...c, messages: [...updatedMessages, assistantMsg] } : c
        )
      );
    } catch (err) {
      console.error('Chat error:', err);
      const assistantErrMsg = {
        id: 'err_' + Date.now(),
        role: 'assistant',
        content:
          err.message ||
          'A network error occurred while communicating with the assistant. Please try again.',
        timestamp: new Date().toISOString(),
        isError: true,
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId ? { ...c, messages: [...updatedMessages, assistantErrMsg] } : c
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetryLast = () => {
    const msgs = activeConversation.messages || [];
    const lastUserMsg = [...msgs].reverse().find((m) => m.role === 'user');
    if (lastUserMsg) {
      // Remove any trailing error
      const cleanedMsgs = msgs.filter((m) => !m.isError);
      setConversations((prev) =>
        prev.map((c) => (c.id === activeId ? { ...c, messages: cleanedMsgs } : c))
      );
      handleSendMessage(lastUserMsg.content);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div>
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <Link to="/dashboard" className="hover:text-blue-600 transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">AI Biology Assistant</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex items-center justify-center shadow-xs">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  AI Biology Assistant
                </h1>
                <Badge variant={backendConfigured ? 'teal' : 'warning'} size="sm">
                  {backendConfigured ? 'Gemini AI Ready' : 'Config Pending'}
                </Badge>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Explore biology, understand disease mechanisms, and learn how the human body works through conversational AI.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={handleNewConversation}
              className="text-xs"
            >
              <span>New Conversation</span>
            </Button>
            <button
              onClick={() => setIsSidebarOpenMobile(!isSidebarOpenMobile)}
              className="md:hidden p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              aria-label="Toggle conversations"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Backend Configuration Pending Banner (if not configured) */}
      {!backendConfigured && backendChecked && (
        <ConfigPendingBanner onCheckStatus={checkBackendHealth} />
      )}

      {/* Main Workspace Layout (Sidebar + Chat Area) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[640px] items-stretch">
        {/* Left: Conversation History Sidebar (Desktop: 4 cols, Mobile: Drawer) */}
        <div
          className={`md:col-span-4 lg:col-span-3 ${
            isSidebarOpenMobile ? 'block fixed inset-0 z-50 p-4 bg-slate-900/60 backdrop-blur-xs' : 'hidden md:block'
          }`}
        >
          <div className="h-full max-h-[720px] md:sticky md:top-20">
            {isSidebarOpenMobile && (
              <button
                onClick={() => setIsSidebarOpenMobile(false)}
                className="md:hidden absolute top-6 right-6 p-2 rounded-full bg-white text-slate-600 shadow-md z-10"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <ConversationSidebar
              conversations={conversations}
              activeId={activeId}
              onSelectConversation={(id) => {
                setActiveId(id);
                setIsSidebarOpenMobile(false);
              }}
              onNewConversation={handleNewConversation}
              onDeleteConversation={handleDeleteConversation}
              onClearAll={() => setShowClearConfirm(true)}
            />
          </div>
        </div>

        {/* Right: Active Chat Conversation Area (Desktop: 8-9 cols) */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col bg-slate-50/70 border border-slate-200 rounded-3xl overflow-hidden shadow-xs h-[720px]">
          {/* Top Bar of Active Conversation */}
          <div className="px-5 py-3.5 bg-white border-b border-slate-100 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0" />
              <h2 className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                {activeConversation.title || 'Biological Inquiry'}
              </h2>
              <span className="text-[11px] text-slate-400 shrink-0">
                ({activeConversation.messages.length} messages)
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {activeConversation.messages.length > 0 && (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-100 transition-colors"
                  title="Clear conversation"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Scrollable Messages Canvas */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {activeConversation.messages.length === 0 ? (
              // Empty State with Welcome & Learning Cards
              <div className="py-6 sm:py-8 space-y-8 max-w-3xl mx-auto">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Welcome to MEDISCAN Biology Assistant
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                    Ask any question about human anatomy, physiological pathways, or disease mechanisms. Grounded on verified biological data.
                  </p>
                </div>

                {/* Suggested Questions */}
                <SuggestedQuestions onSelectQuestion={(q) => handleSendMessage(q)} />

                {/* Quick Learning Shortcuts to Phase 6 Explorer */}
                <QuickLearningShortcuts />
              </div>
            ) : (
              // Active Conversation Messages
              <div className="space-y-4 max-w-4xl mx-auto">
                {activeConversation.messages.map((msg, idx) => (
                  <ChatMessage
                    key={msg.id || idx}
                    message={msg}
                    onRetry={handleRetryLast}
                    isLast={idx === activeConversation.messages.length - 1}
                  />
                ))}

                {/* Typing / Processing Indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 items-center text-slate-500 text-xs py-2 px-1"
                  >
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      <span className="text-[11px] text-slate-500 ml-1 font-medium">
                        Formulating biological explanation...
                      </span>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Bottom Message Input Area */}
          <div className="p-4 bg-white border-t border-slate-200/80 shrink-0">
            <div className="max-w-4xl mx-auto space-y-2">
              <ChatInput
                input={input}
                setInput={setInput}
                onSend={() => handleSendMessage()}
                isLoading={isLoading}
              />

              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                <span className="flex items-center gap-1 text-slate-500">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                  Educational AI tutor. Does not formulate medical diagnoses or treatment plans.
                </span>
                <Link
                  to="/biological-explorer"
                  className="hidden sm:inline-flex items-center gap-1 text-blue-600 hover:underline font-medium"
                >
                  <span>Anatomy & Physiology Explorer</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <Modal
          isOpen={showClearConfirm}
          onClose={() => setShowClearConfirm(false)}
          title="Clear Conversation?"
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Are you sure you want to clear messages from this conversation? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2.5 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleClearCurrentConversation}
              >
                Clear Current
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AIBiologyAssistantPage;
