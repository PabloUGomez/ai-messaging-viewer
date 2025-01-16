import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('http://www.backup-backend.readychatai.com/messages_json');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching messages:', error.message);
    res.status(500).json({ error: 'Error fetching messages' });
  }
}
