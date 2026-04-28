import { cn } from '../lib/cn';

export default function ChatBubble({ text, sender }) {
  const isMe = sender === 'me';
  return (
    <div className={cn('flex w-full', isMe ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[75%] px-4 py-2.5 text-[15px] leading-snug',
          isMe
            ? 'bg-tinder-gradient text-white rounded-2xl rounded-br-md'
            : 'bg-chat-bubble text-white rounded-2xl rounded-bl-md'
        )}
      >
        {text}
      </div>
    </div>
  );
}
