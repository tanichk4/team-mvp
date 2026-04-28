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
      {/* Matches row */}
      <section className="mb-6">
        <h2 className="text-base font-bold text-tinder-pink mb-3">New Matches</h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {/* Likes you tile */}
          <div className="shrink-0 w-[72px] flex flex-col items-center gap-1.5">
            <div className="w-[72px] h-[72px] rounded-full bg-tinder-gradient flex items-center justify-center text-white font-bold text-lg">
              {matches.length + 12}
            </div>
            <span className="text-xs text-tinder-pink font-semibold">Likes</span>
          </div>
          {matches.map((m) => (
            <Link
              key={m.id}
              to={`/messages/${m.id}`}
              className="shrink-0 w-[72px] flex flex-col items-center gap-1.5"
            >
              <div className={`w-[72px] h-[72px] rounded-full p-[2px] ${unread[m.id] ? 'bg-tinder-gradient' : 'bg-transparent'}`}>
                <img
                  src={m.photos[0]}
                  alt={m.name}
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                />
              </div>
              <span className="text-xs font-medium truncate w-full text-center">{m.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Messages list */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold">Messages</h2>
          <button aria-label="Search" className="text-tinder-muted">
            <Search size={20} />
          </button>
        </div>

        {/* Tinder Gold spotlight row */}
        <div className="flex items-center gap-3 py-3 mb-1">
          <div className="w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center shrink-0">
            <Sparkles size={22} className="text-white" fill="white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-[15px] text-tinder-gold">Get more matches</p>
            <p className="text-[13px] text-tinder-muted">Try Tinder Gold today</p>
          </div>
        </div>

        <ul className="divide-y divide-gray-100">
          {matches.map((m) => {
            const convo = messages[m.id] || [];
            const last = convo[convo.length - 1];
            return (
              <li key={m.id}>
                <Link to={`/messages/${m.id}`} className="flex items-center gap-3 py-3 active:bg-gray-50">
                  <img
                    src={m.photos[0]}
                    alt={m.name}
                    className="w-14 h-14 rounded-full object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-semibold text-[15px] truncate">{m.name}</span>
                      {last && (
                        <span className="text-xs text-tinder-muted shrink-0">{formatTimestamp(last.ts)}</span>
                      )}
                    </div>
                    <p className={`text-[14px] truncate ${unread[m.id] ? 'text-tinder-text font-medium' : 'text-tinder-muted'}`}>
                      {last
                        ? `${last.sender === 'me' ? 'You: ' : ''}${last.text}`
                        : 'You matched. Say hi!'}
                    </p>
                  </div>
                  {unread[m.id] && <span className="w-2.5 h-2.5 rounded-full bg-tinder-pink shrink-0" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
