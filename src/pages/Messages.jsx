import { Link } from 'react-router-dom';
import { Search, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

function formatTimestamp(ts) {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 60) return `${min}m`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d`;
  const wk = Math.floor(day / 7);
  return `${wk}w`;
}

export default function Messages() {
  const { matches, messages, unread } = useApp();

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pt-4 pb-6 md:pt-8">
      <section className="mb-6">
        <h2
          className="text-brand-gradient font-bold mb-3"
          style={{ fontSize: 'var(--font-size-base)' }}
        >
          New Matches
        </h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="shrink-0 flex flex-col items-center gap-1.5" style={{ width: 64 }}>
            <div
              className="rounded-full flex items-center justify-center text-white font-bold"
              style={{
                width: 64,
                height: 64,
                background: 'var(--gradient-brand)',
                fontSize: 'var(--font-size-md)',
              }}
            >
              {matches.length + 12}
            </div>
            <span
              className="text-brand-gradient font-semibold truncate w-full text-center"
              style={{ fontSize: 'var(--font-size-xs)' }}
            >
              Likes
            </span>
          </div>
          {matches.map((m) => (
            <Link
              key={m.id}
              to={`/messages/${m.id}`}
              className="shrink-0 flex flex-col items-center gap-1.5"
              style={{ width: 64 }}
            >
              <div
                className="rounded-full p-[2px]"
                style={{
                  width: 64,
                  height: 64,
                  background: unread[m.id] ? 'var(--gradient-brand)' : 'transparent',
                }}
              >
                <img
                  src={m.photos[0]}
                  alt={m.name}
                  className="w-full h-full rounded-full object-cover"
                  style={{ border: '2px solid var(--color-surface-card)' }}
                />
              </div>
              <span
                className="font-medium truncate w-full text-center"
                style={{ fontSize: 'var(--font-size-xs)' }}
              >
                {m.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold" style={{ fontSize: 'var(--font-size-base)' }}>
            Messages
          </h2>
          <button aria-label="Search" style={{ color: 'var(--color-text-secondary)' }}>
            <Search size={20} strokeWidth={1.5} />
          </button>
        </div>

        <Link
          to="/likes"
          className="flex items-center gap-3 py-3 mb-1 active:opacity-80"
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'var(--gradient-gold)' }}
          >
            <Sparkles size={22} className="text-white" fill="white" />
          </div>
          <div className="flex-1">
            <p
              className="text-gold-gradient font-bold"
              style={{ fontSize: 'var(--font-size-base)' }}
            >
              Get more matches
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-secondary)',
              }}
            >
              Try Tinder Gold today
            </p>
          </div>
        </Link>

        <ul>
          {matches.map((m, idx) => {
            const convo = messages[m.id] || [];
            const last = convo[convo.length - 1];
            const isUnread = unread[m.id];
            return (
              <li
                key={m.id}
                style={
                  idx > 0
                    ? { borderTop: '1px solid var(--color-border-light)', marginLeft: 66 }
                    : undefined
                }
              >
                <Link
                  to={`/messages/${m.id}`}
                  className="flex items-center gap-3 py-3 active:opacity-80"
                  style={idx > 0 ? { marginLeft: -66, paddingLeft: 0 } : undefined}
                >
                  <div className="relative shrink-0" style={{ marginLeft: idx > 0 ? 66 : 0 }}>
                    <img
                      src={m.photos[0]}
                      alt={m.name}
                      className="rounded-full object-cover"
                      style={{ width: 54, height: 54 }}
                    />
                    {idx % 2 === 0 && (
                      <span
                        className="absolute bottom-0 right-0 rounded-full"
                        style={{
                          width: 12,
                          height: 12,
                          background: 'var(--color-like)',
                          border: '2px solid var(--color-surface-card)',
                        }}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className="truncate"
                        style={{
                          fontSize: 'var(--font-size-base)',
                          fontWeight: isUnread ? 800 : 700,
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {m.name}
                      </span>
                      {last && (
                        <span
                          className="shrink-0"
                          style={{
                            fontSize: 'var(--font-size-xs)',
                            color: 'var(--color-text-tertiary)',
                          }}
                        >
                          {formatTimestamp(last.ts)}
                        </span>
                      )}
                    </div>
                    <p
                      className="truncate"
                      style={{
                        fontSize: 'var(--font-size-sm)',
                        color: isUnread ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                        fontWeight: isUnread ? 600 : 400,
                      }}
                    >
                      {last
                        ? `${last.sender === 'me' ? 'You: ' : ''}${last.text}`
                        : 'You matched. Say hi!'}
                    </p>
                  </div>
                  {isUnread && (
                    <span
                      className="rounded-full shrink-0 animate-obsidian-pulse"
                      style={{
                        width: 8,
                        height: 8,
                        background: 'var(--color-brand-primary)',
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
