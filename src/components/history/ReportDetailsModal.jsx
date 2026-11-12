import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Printer,
  Bookmark,
  BookmarkCheck,
  Calendar,
  Clock,
  Layers,
  ShieldAlert,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileText,
  Share2,
} from 'lucide-react';
import { CATEGORY_CONFIG, STATUS_CONFIG } from '../../data/activityTypes';
import { Button, Badge } from '../common';
import { Link } from 'react-router-dom';

export const ReportDetailsModal = ({
  isOpen,
  onClose,
  activity,
  onToggleSave,
  onDelete,
}) => {
  if (!isOpen || !activity) return null;

  const categoryConf = CATEGORY_CONFIG[activity.category] || CATEGORY_CONFIG.biological_exploration;
  const statusConf = STATUS_CONFIG[activity.status] || {
    label: activity.status,
    badgeVariant: 'warning',
    description: 'Activity recorded.',
  };
  const CategoryIcon = categoryConf.icon || FileText;

  const handlePrint = () => {
    // Generate a printable window with clean medical SaaS formatting
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>MEDISCAN AI Report - ${activity.title}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 40px; color: #0F172A; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #2563EB; padding-bottom: 20px; margin-bottom: 24px; }
            .logo { font-size: 24px; font-weight: 800; color: #2563EB; letter-spacing: -0.5px; }
            .sublogo { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748B; font-weight: 600; }
            .meta { font-size: 12px; color: #64748B; text-align: right; }
            h1 { font-size: 20px; font-weight: 700; margin: 0 0 8px 0; color: #0F172A; }
            .badge { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; background: #EFF6FF; color: #1D4ED8; margin-bottom: 16px; }
            .section { margin-bottom: 20px; padding: 16px; border-radius: 8px; background: #F8FAFC; border: 1px solid #E2E8F0; }
            .section-title { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; color: #475569; margin-bottom: 8px; }
            .data-grid { display: grid; grid-template-columns: 140px 1fr; gap: 8px; font-size: 13px; }
            .label { font-weight: 600; color: #64748B; }
            .value { color: #0F172A; }
            .disclaimer { margin-top: 32px; padding: 14px; border: 1px solid #FCD34D; background: #FEF3C7; border-radius: 8px; font-size: 11px; color: #92400E; line-height: 1.5; }
            @media print { body { margin: 20px; } button { display: none; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo">MEDISCAN AI</div>
              <div class="sublogo">AI-Assisted Healthcare & Biological Research Platform</div>
            </div>
            <div class="meta">
              <div><strong>Report ID:</strong> ${activity.id}</div>
              <div><strong>Date:</strong> ${new Date(activity.timestamp).toLocaleString()}</div>
            </div>
          </div>

          <h1>${activity.title}</h1>
          <div class="badge">${categoryConf.label} • ${activity.status}</div>

          <div class="section">
            <div class="section-title">Screening & Activity Specification</div>
            <div class="data-grid">
              <div class="label">Category:</div>
              <div class="value">${categoryConf.label}</div>
              <div class="label">Status:</div>
              <div class="value">${activity.status}</div>
              <div class="label">Module ID:</div>
              <div class="value">${activity.moduleId || 'General'}</div>
              <div class="label">Nature:</div>
              <div class="value">${categoryConf.nature}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Technical Validation Information</div>
            <p style="font-size: 13px; color: #334155; line-height: 1.6; margin: 0;">
              ${statusConf.description}
            </p>
            ${
              activity.data && Object.keys(activity.data).length > 0
                ? `<div style="margin-top: 12px; font-size: 12px; color: #475569;">
                    <strong>Recorded Parameters:</strong>
                    <pre style="background: #FFFFFF; padding: 10px; border-radius: 6px; border: 1px solid #E2E8F0; overflow-x: auto;">${JSON.stringify(activity.data, null, 2)}</pre>
                   </div>`
                : ''
            }
          </div>

          <div class="disclaimer">
            <strong>OFFICIAL EDUCATIONAL & NON-DIAGNOSTIC DISCLAIMER:</strong><br/>
            This document represents a validated user screening activity or educational biological inquiry formulated within the MEDISCAN AI research prototype. It does NOT constitute a clinical medical diagnosis, radiological interpretation, or individualized therapeutic prescription. If this document was generated during an image or symptom validation workflow, no AI diagnostic inference was conducted. Always consult certified medical practitioners for clinical assessments.
          </div>

          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
            <div className="flex items-center gap-3.5">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shadow-xs"
                style={{ backgroundColor: `${categoryConf.color}15`, color: categoryConf.color }}
              >
                <CategoryIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900 truncate max-w-md">
                    {activity.title}
                  </h3>
                  <Badge variant={statusConf.badgeVariant} size="sm">
                    {activity.isSaved ? 'Saved Report' : 'Activity Record'}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>ID: {activity.id}</span>
                  <span>•</span>
                  <span>{new Date(activity.timestamp).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
            {/* Status & Nature Banner */}
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100/70">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900 mb-1">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Current Processing Status
              </div>
              <p className="text-sm font-semibold text-blue-950">
                {activity.status}
              </p>
              <p className="text-xs text-blue-800/80 mt-1 leading-relaxed">
                {statusConf.description}
              </p>
            </div>

            {/* Key Record Attributes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Category
                </span>
                <span className="text-xs font-bold text-slate-800 mt-0.5 block">
                  {categoryConf.label}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Module
                </span>
                <span className="text-xs font-bold text-slate-800 mt-0.5 block capitalize">
                  {activity.moduleId || 'General'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  AI Inference
                </span>
                <span className="text-xs font-bold text-amber-700 mt-0.5 block">
                  {statusConf.isAiComplete ? 'Formulated' : 'Pending Deployment'}
                </span>
              </div>
            </div>

            {/* Recorded Metadata / Payload details */}
            {activity.data && Object.keys(activity.data).length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Validation & Intake Details
                </h4>
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
                  {Object.entries(activity.data).map(([key, val]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-1.5 last:border-b-0 last:pb-0 gap-1">
                      <span className="font-semibold text-slate-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}:
                      </span>
                      <span className="text-slate-800 font-medium truncate max-w-sm">
                        {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation deep-link if conversation or biological explorer */}
            {activity.category === 'ai_conversation' && (
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/60">
                <div className="text-xs text-amber-900">
                  <span className="font-bold">Assistant Dialogue Record</span>
                  <p className="text-[11px] text-amber-700">Resume or review this educational thread in the AI Biology Assistant.</p>
                </div>
                <Link
                  to="/ai-assistant"
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Open Chat</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* Official Medical Disclaimer */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                  Non-Clinical Research Notice
                </span>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  This record is generated for educational screening demonstration purposes. If this activity pertains to medical images or symptoms, <strong>no automated clinical diagnosis or medical assessment was executed</strong>. Always seek the advice of a qualified physician for any medical concerns.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={activity.isSaved ? 'teal' : 'outline'}
                size="sm"
                onClick={() => onToggleSave(activity.id)}
                className="text-xs"
              >
                {activity.isSaved ? (
                  <>
                    <BookmarkCheck className="w-3.5 h-3.5 mr-1" />
                    <span>Saved to Reports</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5 mr-1" />
                    <span>Save Report</span>
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="text-xs"
              >
                <Printer className="w-3.5 h-3.5 mr-1" />
                <span>Export / Print PDF</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              {onDelete && (
                <button
                  onClick={() => {
                    onDelete(activity.id);
                    onClose();
                  }}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <Button variant="secondary" size="sm" onClick={onClose} className="text-xs">
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ReportDetailsModal;
