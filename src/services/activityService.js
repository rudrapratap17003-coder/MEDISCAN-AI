import { ACTIVITY_CATEGORIES, ACTIVITY_STATUS } from '../data/activityTypes';

const ACTIVITY_STORAGE_KEY = 'mediscan_activity_records_v1';
const CONVERSATION_STORAGE_KEY = 'mediscan_conversations_v1';

/**
 * Loads stored activity records from localStorage.
 */
export const getStoredActivities = () => {
  try {
    const raw = localStorage.getItem(ACTIVITY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Failed to load activities from storage:', err);
    return [];
  }
};

/**
 * Saves activity records to localStorage.
 */
export const persistActivities = (records) => {
  try {
    localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(records));
  } catch (err) {
    console.error('Failed to persist activities:', err);
  }
};

/**
 * Retrieves assistant conversations from localStorage and formats them as activity records.
 */
export const getAssistantConversationsAsActivities = () => {
  try {
    const raw = localStorage.getItem(CONVERSATION_STORAGE_KEY);
    if (!raw) return [];
    const conversations = JSON.parse(raw);
    if (!Array.isArray(conversations)) return [];

    return conversations
      .filter((conv) => conv && conv.messages && conv.messages.length > 0)
      .map((conv) => ({
        id: conv.id,
        category: ACTIVITY_CATEGORIES.AI_CONVERSATION,
        title: conv.title || 'AI Biology Assistant Inquiry',
        timestamp: conv.createdAt || (conv.messages[0] && conv.messages[0].timestamp) || new Date().toISOString(),
        status: ACTIVITY_STATUS.CONVERSATION_SAVED,
        moduleId: 'ai-assistant',
        data: {
          conversationId: conv.id,
          messageCount: conv.messages.length,
          preview: conv.messages[0]?.content || '',
        },
        isSaved: Boolean(conv.isSaved),
        isConversationRef: true,
      }));
  } catch (err) {
    console.warn('Failed to load assistant conversations for activities:', err);
    return [];
  }
};

/**
 * Returns all activities, unified across screening, validation, explorations, and conversations.
 */
export const getAllUnifiedActivities = () => {
  const customActivities = getStoredActivities();
  const convActivities = getAssistantConversationsAsActivities();

  // Combine and de-duplicate by ID
  const map = new Map();
  customActivities.forEach((act) => map.set(act.id, act));
  convActivities.forEach((act) => {
    if (!map.has(act.id)) {
      map.set(act.id, act);
    }
  });

  // Sort newest first
  return Array.from(map.values()).sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

/**
 * Appends or updates an activity record.
 */
export const addOrUpdateActivity = (record) => {
  const current = getStoredActivities();
  const id = record.id || `act_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  const timestamp = record.timestamp || new Date().toISOString();

  const formatted = {
    id,
    category: record.category || ACTIVITY_CATEGORIES.BIOLOGICAL_EXPLORATION,
    title: record.title || 'Activity Record',
    timestamp,
    status: record.status || ACTIVITY_STATUS.EXPLORATION_COMPLETED,
    moduleId: record.moduleId || 'general',
    data: record.data || {},
    isSaved: Boolean(record.isSaved),
  };

  const index = current.findIndex((item) => item.id === id);
  let updated;
  if (index >= 0) {
    updated = [...current];
    updated[index] = { ...updated[index], ...formatted };
  } else {
    updated = [formatted, ...current];
  }

  persistActivities(updated);
  return formatted;
};

/**
 * Toggles the saved status of an activity or report.
 */
export const toggleSavedStatus = (activityId, shouldSave = null) => {
  const current = getStoredActivities();
  const index = current.findIndex((item) => item.id === activityId);

  if (index >= 0) {
    const newSaved = shouldSave !== null ? shouldSave : !current[index].isSaved;
    current[index] = { ...current[index], isSaved: newSaved };
    persistActivities(current);
    return current[index];
  }

  // Check if it's a conversation reference
  try {
    const raw = localStorage.getItem(CONVERSATION_STORAGE_KEY);
    if (raw) {
      const conversations = JSON.parse(raw);
      const cIndex = conversations.findIndex((c) => c.id === activityId);
      if (cIndex >= 0) {
        const newSaved = shouldSave !== null ? shouldSave : !conversations[cIndex].isSaved;
        conversations[cIndex].isSaved = newSaved;
        localStorage.setItem(CONVERSATION_STORAGE_KEY, JSON.stringify(conversations));
      }
    }
  } catch {}

  return null;
};

/**
 * Deletes a single activity record.
 */
export const removeActivity = (activityId) => {
  const current = getStoredActivities();
  const filtered = current.filter((item) => item.id !== activityId);
  persistActivities(filtered);
};

/**
 * Clears all activity records.
 */
export const clearAllActivities = () => {
  try {
    localStorage.removeItem(ACTIVITY_STORAGE_KEY);
  } catch {}
};

/**
 * Computes high-level overview metrics for the dashboard and history header.
 */
export const calculateActivityStats = () => {
  const all = getAllUnifiedActivities();
  const images = all.filter((a) => a.category === ACTIVITY_CATEGORIES.IMAGE_ANALYSIS).length;
  const symptoms = all.filter((a) => a.category === ACTIVITY_CATEGORIES.SYMPTOM_ASSESSMENT).length;
  const explorations = all.filter((a) => a.category === ACTIVITY_CATEGORIES.BIOLOGICAL_EXPLORATION).length;
  const conversations = all.filter((a) => a.category === ACTIVITY_CATEGORIES.AI_CONVERSATION).length;
  const saved = all.filter((a) => a.isSaved).length;

  return {
    total: all.length,
    imageAnalyses: images,
    symptomAssessments: symptoms,
    biologicalExplorations: explorations,
    conversations,
    savedReports: saved,
    recentActivity: all[0] ? all[0].title : 'None',
    lastTimestamp: all[0] ? all[0].timestamp : null,
  };
};
