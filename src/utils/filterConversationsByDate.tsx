import { Message } from '../types'


function isMessageWithinRange(messageDate: Date, filter: string, now: Date): boolean {
  const messageTime = messageDate.getTime();

  const startOfToday = new Date(now);
  startOfToday.setUTCHours(0, 0, 0, 0); 
  const endOfToday = new Date(startOfToday);
  endOfToday.setUTCHours(23, 59, 59, 999);

  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfToday.getDate() - 1); 

  const endOfYesterday = new Date(startOfYesterday);
  endOfYesterday.setUTCHours(23, 59, 59, 999); 

    const startOfLastWeek = new Date(now);
  startOfLastWeek.setDate(now.getDate() - 7); 
  startOfLastWeek.setUTCHours(0, 0, 0, 0); 
  
  const endOfLastWeek = new Date(startOfLastWeek);
  endOfLastWeek.setDate(startOfLastWeek.getDate() + 7); 
  endOfLastWeek.setUTCHours(23, 59, 59, 999); 

  if (filter === 'RECENT') {
    return true; // Todos los mensajes
  }

  if (filter === 'TODAY') {
    // Mensajes desde el inicio del día de hoy hasta el final del día de hoy
    return messageTime >= startOfToday.getTime() && messageTime <= endOfToday.getTime();
  }

  if (filter === 'YESTERDAY') {
    // Mensajes entre el inicio de ayer y el final de ayer
    return messageTime >= startOfYesterday.getTime() && messageTime <= endOfYesterday.getTime();
  }

  if (filter === 'LAST_WEEK') {
    // Mensajes desde el inicio de la semana pasada (lunes) hasta el final de la semana pasada (domingo)
    return messageTime >= startOfLastWeek.getTime() && messageTime <= endOfLastWeek.getTime();
  }

  return false; // Si el filtro no coincide
}


export function filterConversationsByDate(
  conversations: Message[],
  filter: string,
  now: Date
): Message[] {
  return conversations.filter((message) => {
    const messageDate = new Date(message.message_date)
    return isMessageWithinRange(messageDate, filter, now)
  })
}
