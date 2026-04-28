import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import profiles from '../data/profiles';
import seedMessages from '../data/messages';

const AppContext = createContext(null);

const STORAGE_KEY = 'team-mvp:app-state:v1';

const ME_DEFAULT = {
  name: 'Tanya',
  age: 27,
  photo: 'https://picsum.photos/600/800?random=99',
  completeness: 65,
  bio: 'PM by day, swiping for product insights by night 😉',
};

function hydrateSeedMessages(now = Date.now()) {
  const out = {};
  for (const [matchId, convo] of Object.entries(seedMessages)) {
    out[matchId] = convo.map(({ minutesAgo, ...m }) => ({
      ...m,
      ts: now - Math.round(minutesAgo * 60_000),
    }));
  }
  return out;
}

function loadInitialState() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function AppProvider({ children }) {
  const persisted = useMemo(() => loadInitialState(), []);

  const [matches, setMatches] = useState(() => persisted?.matches ?? profiles.slice(0, 3));
  const [messages, setMessages] = useState(() => persisted?.messages ?? hydrateSeedMessages());
  const [unread, setUnread] = useState(() => persisted?.unread ?? { 1: false, 2: true, 3: false });
  const [me, setMe] = useState(() => persisted?.me ?? ME_DEFAULT);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ matches, messages, unread, me })
      );
    } catch {
      // quota or private-mode write failure — runtime keeps working in memory
    }
  }, [matches, messages, unread, me]);

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
    setUnread((prev) => (prev[matchId] ? { ...prev, [matchId]: false } : prev));
  }, []);

  const value = useMemo(
    () => ({ matches, messages, unread, me, addMatch, sendMessage, markRead, setMe }),
    [matches, messages, unread, me, addMatch, sendMessage, markRead]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
