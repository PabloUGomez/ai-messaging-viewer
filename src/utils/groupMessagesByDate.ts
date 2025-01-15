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

export const groupMessagesByDate = (messages: Message[]) => {
  return messages.reduce((groups: { [key: string]: Message[] }, message) => {
    const date = new Date(message.message_date).toDateString();
    if (!groups[date]) groups[date] = [];
    groups[date].push(message);
    return groups;
  }, {});
};