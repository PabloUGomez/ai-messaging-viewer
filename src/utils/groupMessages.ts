import { Message } from '../types'

export function groupChat(messages: Message[]) {
  const conversations: Message[][] = []

  // Ordenar los mensajes por timestamp en orden cronológico
  const sortedMessages = [...messages].sort((a, b) => {
    const dateA = new Date(a.message_date)
    const dateB = new Date(b.message_date)
    return dateB.getTime() - dateA.getTime()
  })

  let currentConversation: Message[] | null = null

  for (const message of sortedMessages) {
    if (message.reply_to_id === null) {
      if (currentConversation) {
        conversations.push(currentConversation)
      }
      currentConversation = [message]
    } else {
      const parentMessage = sortedMessages.find(
        (msg) => msg.id === message.reply_to_id
      )
      if (parentMessage) {
        if (currentConversation) {
          currentConversation.push(message)
        } else {
          currentConversation = [parentMessage, message]
        }
      }
    }

    if (message.bot_sender === 1 && message.reply_to_id !== null) {
      const nextMessage = sortedMessages.find(
        (msg) => msg.reply_to_id === message.id && msg.bot_sender === 0
      )
      if (!nextMessage) {
        if (currentConversation) {
          conversations.push(currentConversation)
        }
        currentConversation = null
      }
    }
  }

  if (currentConversation) {
    conversations.push(currentConversation)
  }

  for (const conversation of conversations) {
    conversation.sort(
      (a, b) =>
        new Date(a.message_date).getTime() - new Date(b.message_date).getTime()
    )
  }

  return conversations
}
