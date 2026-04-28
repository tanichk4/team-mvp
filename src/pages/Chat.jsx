import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Video, Info, Smile, Image as ImageIcon, Send } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';
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
    markRead(matchId);
  }, [matchId, markRead]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [convo.length]);

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen text-tinder-muted">
        Conversation not found
      </div>
    );
  }

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(matchId, text);
    setText('');
  };

  return (
    <div className="flex flex-col h-screen bg-chat-dark text-white">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3 bg-chat-dark border-b border-white/10 shrink-0">
        <button
          onClick={() => navigate('/messages')}
          className="text-white -ml-2 p-2"
          aria-label="Back"
        >
          <ArrowLeft size={24} />
        </button>
        <img src={profile.photos[0]} alt={profile.name} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[15px] truncate">{profile.name}</p>
          <p className="text-[12px] text-white/60 truncate">{profile.distance}</p>
        </div>
        <button aria-label="Video call" className="p-2 text-white/80">
          <Video size={22} />
        </button>
        <button aria-label="Info" className="p-2 text-white/80">
          <Info size={22} />
        </button>
      </header>

      {/* Match marker */}
      <div className="text-center py-4 text-[12px] text-white/50 shrink-0">
        You matched with {profile.name}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {convo.map((m) => (
          <ChatBubble key={m.id} text={m.text} sender={m.sender} />
        ))}
        {convo.length === 0 && (
          <div className="text-center text-white/50 text-sm py-8">
            Say hi to {profile.name}!
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="px-3 py-3 bg-chat-dark border-t border-white/10 shrink-0">
        <div className="flex items-center gap-2 bg-chat-bubble rounded-full pl-4 pr-1.5 py-1.5">
          <button aria-label="Emoji" className="text-white/60">
            <Smile size={22} />
          </button>
          <button aria-label="Image" className="text-white/60">
            <ImageIcon size={22} />
          </button>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Type a message"
            className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none text-[15px] py-1.5"
          />
          <button
            onClick={handleSend}
            disabled={!text.trim()}
            aria-label="Send"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-opacity ${
              text.trim() ? 'bg-tinder-gradient text-white' : 'bg-white/10 text-white/40'
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
