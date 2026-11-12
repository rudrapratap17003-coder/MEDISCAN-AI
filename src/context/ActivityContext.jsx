import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getAllUnifiedActivities,
  addOrUpdateActivity,
  toggleSavedStatus,
  removeActivity,
  clearAllActivities,
  calculateActivityStats,
} from '../services/activityService';
import { ACTIVITY_CATEGORIES } from '../data/activityTypes';

const ActivityContext = createContext(null);

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    imageAnalyses: 0,
    symptomAssessments: 0,
    biologicalExplorations: 0,
    conversations: 0,
    savedReports: 0,
    recentActivity: 'None',
    lastTimestamp: null,
  });

  const refresh = useCallback(() => {
    const list = getAllUnifiedActivities();
    setActivities(list);
    setStats(calculateActivityStats());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addActivity = useCallback((record) => {
    const created = addOrUpdateActivity(record);
    refresh();
    return created;
  }, [refresh]);

  const deleteActivity = useCallback((id) => {
    removeActivity(id);
    refresh();
  }, [refresh]);

  const toggleSave = useCallback((id, shouldSave = null) => {
    toggleSavedStatus(id, shouldSave);
    refresh();
  }, [refresh]);

  const clearHistory = useCallback(() => {
    clearAllActivities();
    refresh();
  }, [refresh]);

  const savedReports = activities.filter((act) => act.isSaved);

  const value = {
    activities,
    savedReports,
    stats,
    addActivity,
    deleteActivity,
    toggleSave,
    clearHistory,
    refreshActivities: refresh,
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => {
  const ctx = useContext(ActivityContext);
  if (!ctx) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return ctx;
};

export default ActivityContext;
