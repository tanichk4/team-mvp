import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import profiles from '../data/profiles';
import seedMessages from '../data/messages';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [matches, setMatches] = useState(() => profiles.slice(0, 3));
  const [messages, setMessages] = useState(() => ({ ...seedMessages }));
  const [unread, setUnread] = useState(() => ({ 1: false, 2: true, 3: false }));

  const addMatch = useCallback((profile) => {
    setMatches((prev) => (prev.some((p) => p.id === profile.id) ? prev : [profile, ...prev]));
    setMessages((prev) => (prev[profile.id] ? prev : { ...prev, [profile.id]: [] }));
  }, []);

  const sendMessage = useCallback((matchId, text) => {
    if (!text.trim()) return;
    setMessages((prev) => ({
      ...prev,
      [matchId]: [
        ...(prev[matchId] || []),
        { id: Date.now(), text: text.trim(), sender: 'me', ts: Date.now() },
      ],
    }));
    setUnread((prev) => ({ ...prev, [matchId]: false }));
  }, []);

  const markRead = useCallback((matchId) => {
    setUnread((prev) => ({ ...prev, [matchId]: false }));
  }, []);

  const value = useMemo(
    () => ({ matches, messages, unread, addMatch, sendMessage, markRead }),
    [matches, messages, unread, addMatch, sendMessage, markRead]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
