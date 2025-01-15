
import React from 'react';
import Message from './Message';

interface MessageGroupProps {
  date: string;
  messages: {
    bot_sender: number;
    message_text: string;
    message_date: string;
    sender_name: string;
    platform: string;
  }[];
}

const MessageGroup: React.FC<MessageGroupProps> = ({ date, messages }) => {
  return (
    <div>
      <div className="sticky top-0 bg-gray-200 text-center py-2 z-10">
        <span className="text-sm font-bold">{date}</span>
      </div>
      {messages.map((msg, idx) => (
        <Message key={idx} message={msg} />
      ))}
    </div>
  );
};

export default MessageGroup;
