import { cn } from '../lib/cn';

export default function ChatBubble({ text, sender }) {
  const isMe = sender === 'me';
  return (
    <div className={cn('flex w-full', isMe ? 'justify-end' : 'justify-start')}>
      <div
        className="max-w-[72%]"
        style={{
          padding: '10px 14px',
          fontSize: 'var(--font-size-base)',
          lineHeight: 'var(--line-height-normal)',
          borderRadius: isMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
          background: isMe ? 'var(--gradient-brand)' : 'var(--color-bg-tertiary)',
          color: isMe ? 'var(--color-text-on-brand)' : 'var(--color-text-primary)',
        }}
      >
        {text}
      </div>
    </div>
  );
}
