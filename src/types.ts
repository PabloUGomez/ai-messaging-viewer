export type Message = {
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

  export type filterType = "RECENT" | "TODAY" | "YESTERDAY" | "LAST_WEEK";

  export type Chat = {
    id: string;
    messages: Message[];
  };