
import React, { useRef } from 'react';
import useFetchMessages from '../hooks/useFetchMessages';
import MessageGroup from '../components/MessageGroup';
import ScrollToBottomButton from '../components/ScrollToBottomButton';
import { groupMessagesByDate } from '../utils/groupMessagesByDate';

const MessageViewer: React.FC = () => {
  const { messages, loading, error } = useFetchMessages();
  const containerRef = useRef<HTMLDivElement>(null);

  //if (loading) return <Loader />;
  //if (error) return <ErrorMessage message={error} />;

  const groupedMessages = groupMessagesByDate(messages);

  const scrollToBottom = () => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };
  console.log(messages);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div
        ref={containerRef}
        className="h-[70vh] overflow-y-scroll border rounded-lg shadow"
      >
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <MessageGroup key={date} date={date} messages={msgs} />
        ))}
      </div>
      <ScrollToBottomButton onClick={scrollToBottom} />
    </div>
  );
};

export default MessageViewer;
