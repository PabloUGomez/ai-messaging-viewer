
import React from 'react';
import { formatDate } from '../utils/formatDate';

interface MessageProps {
  message: {
    bot_sender: number;
    message_text: string;
    message_date: string;
    sender_name: string;
    platform: string;
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isAI = message.bot_sender === 1;
  return (
    <div
      className={`flex items-start ${isAI ? 'justify-start' : 'justify-end'} my-2`}
    >
      <div
        className={`max-w-xs p-4 rounded-lg shadow ${
          isAI ? 'bg-blue-100 text-blue-900' : 'bg-green-100 text-green-900'
        }`}
      >
        <p className="font-bold">{message.sender_name || 'Unknown Sender'}</p>
        <p>{message.message_text}</p>
        <small className="text-gray-500 text-xs">
          {formatDate(message.message_date)} - {message.platform}
        </small>
      </div>
    </div>
  );
};

export default Message;
