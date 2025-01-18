import React from 'react'
import Message from './Message'
import { Message as MessageType } from '../types'
import { filterConversationsByDate } from '../utils/filterConversationsByDate'

interface MessageGroupProps {
  date: Date
  messages: MessageType[]
  filter: string
}

const MessageGroup: React.FC<MessageGroupProps> = ({ messages, filter,date }) => {
  const messagesFiltered = filterConversationsByDate(messages, filter, date)

  return (
    <div className='w-full message-list' role='list' aria-label='Messages'>
      {messagesFiltered.map((msg, idx) => (
        <Message key={idx} message={msg} />
      ))}
    </div>
  )
}

export default MessageGroup
