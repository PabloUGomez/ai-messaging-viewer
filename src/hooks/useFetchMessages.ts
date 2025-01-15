import { useState, useEffect } from 'react';
import axios from 'axios';

interface Message {
  bot_sender: number;
  business_id: number;
  id: number;
  message_date: string;
  message_text: string;
  platform: string;
  received_number: number;
  reply_to_id: number | null;
  sender_name: string;
  sender_number: number;
}

const useFetchMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('api/messages_json');
        setMessages(response.data);
      } catch (error) {
        setError(`Failed to load messages. ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return { messages, loading, error };
};

export default useFetchMessages;
