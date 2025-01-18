import { useState, useEffect } from 'react';
import axios from 'axios';
import { Message } from '../types';


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
