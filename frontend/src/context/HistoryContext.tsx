import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

export interface HistoryItem {
  id: string;
  username: string;
  timestamp: number;
}

interface HistoryContextType {
  history: HistoryItem[];
  addSearch: (username: string) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const stored = localStorage.getItem('searchHistory');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(history));
  }, [history]);

  const addSearch = useCallback((username: string) => {
    if (!username.trim()) return;
    
    setHistory((prev) => {
      // Remove if it already exists to avoid duplicates
      const filtered = prev.filter((item) => item.username.toLowerCase() !== username.toLowerCase());
      
      // Add to beginning and keep only top 5
      const newHistory = [
        { id: crypto.randomUUID(), username: username.trim(), timestamp: Date.now() },
        ...filtered,
      ].slice(0, 5);
      
      return newHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <HistoryContext.Provider value={{ history, addSearch, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory(): HistoryContextType {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
}
