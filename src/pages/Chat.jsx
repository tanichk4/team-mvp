import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Video, Info, Smile, Image as ImageIcon, Send } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';
import Avatar from '../components/Avatar';
import { useApp } from '../context/AppContext';
import profiles from '../data/profiles';

export default function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const matchId = Number(id);
  const { messages, sendMessage, markRead } = useApp();
  const profile = profiles.find((p) => p.id === matchId);
  const convo = messages[matchId] || [];
  const [text, setText] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!profile) {
      navigate('/messages', { replace: true });
      return;
    }
    markRead(matchId);
  }, [profile, matchId, markRead, navigate]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [convo.length]);

  if (!profile) return null;

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(matchId, text);
    setText('');
  };

  return (
    <div
      className="flex flex-col h-screen"
      style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}
    >
      <header
        className="flex items-center gap-3 px-4 surface-nav shrink-0"
        style={{
          height: 'var(--nav-height-top)',
          borderBottom: '1px solid var(--color-border-light)',
        }}
      >
        <button
          onClick={() => navigate('/messages')}
          className="-ml-2 p-2"
          aria-label="Back"
          style={{ color: 'var(--color-text-primary)' }}
        >
          <ArrowLeft size={24} strokeWidth={1.5} />
        </button>
        <Avatar src={profile.photos[0]} name={profile.name} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex-1 min-w-0">
          <p
            className="truncate"
            style={{
              fontSize: 'var(--font-size-md)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
            }}
          >
            {profile.name}
          </p>
          <p
            className="truncate"
            style={{
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-like)',
              fontWeight: 600,
            }}
          >
            Online
          </p>
        </div>
        <button aria-label="Video call" className="p-2" style={{ color: 'var(--color-text-secondary)' }}>
          <Video size={22} strokeWidth={1.5} />
        </button>
        <button aria-label="Info" className="p-2" style={{ color: 'var(--color-text-secondary)' }}>
          <Info size={22} strokeWidth={1.5} />
        </button>
      </header>

      <div
        className="text-center py-4 shrink-0"
        style={{
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-tertiary)',
          letterSpacing: 'var(--letter-spacing-wider)',
        }}
      >
        YOU MATCHED WITH {profile.name.toUpperCase()}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {convo.map((m) => (
          <ChatBubble key={m.id} text={m.text} sender={m.sender} />
        ))}
        {convo.length === 0 && (
          <div
            className="text-center py-8"
            style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-sm)' }}
          >
            Say hi to {profile.name}!
          </div>
        )}
      </div>

      <div
        className="px-3 shrink-0 flex items-center"
        style={{
          height: 'var(--nav-height-top)',
          backgroundColor: 'var(--color-bg-secondary)',
          borderTop: '1px solid var(--color-border-light)',
        }}
      >
        <div
          className="flex items-center gap-2 w-full pl-4 pr-1.5"
          style={{
            backgroundColor: 'var(--color-bg-tertiary)',
            borderRadius: 'var(--radius-pill)',
            height: 40,
          }}
        >
          <button aria-label="Emoji" style={{ color: 'var(--color-text-secondary)' }}>
            <Smile size={20} strokeWidth={1.5} />
          </button>
          <button aria-label="Image" style={{ color: 'var(--color-text-secondary)' }}>
            <ImageIcon size={20} strokeWidth={1.5} />
          </button>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Type a message"
            className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none text-base py-1.5"
          />
          <button
            onClick={handleSend}
            disabled={!text.trim()}
            aria-label="Send"
            className="rounded-full flex items-center justify-center transition-opacity"
            style={{
              width: 36,
              height: 36,
              background: text.trim()
                ? 'var(--gradient-brand)'
                : 'var(--color-bg-tertiary)',
              color: text.trim() ? 'var(--color-text-on-brand)' : 'var(--color-text-tertiary)',
              opacity: text.trim() ? 1 : 0.6,
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
