import React from 'react'
import { formatDate } from '../utils/formatDate'
import CopyIcon from '../icons/copy'
import { toast } from 'sonner'

interface MessageProps {
  message: {
    bot_sender: number
    message_text: string
    message_date: string
    sender_name: string
    platform: string
    reply_to_id: number | null
  }
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isAI = message.bot_sender === 1
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Message copied to clipboard')
    })
  }
  return (
    <div className='w-full'>
      <h5
        className={`bg-gray-300/50 py-2 px-6 mt-8 text-sm font-bold w-fit mx-auto rounded-xl ${
          message.reply_to_id !== null ? 'hidden' : 'flex'
        }`}
      >
        {message.reply_to_id === null && formatDate(message.message_date)}
      </h5>

      <div
        onClick={() => copyToClipboard(message.message_text)}
        className={`flex items-start ${
          isAI ? 'justify-start' : 'justify-end'
        } my-2`}
      >
        <div
          className={`max-w-xs p-2 md:p-4 rounded-lg shadow group hover:cursor-pointer ${
            isAI ? 'bg-blue-100 text-blue-900' : 'bg-green-100 text-green-900'
          }`}
        >
          <span className='flex items-center justify-between pb-1'>
            <p className='font-bold'>
              {message.sender_name || 'Unknown Sender'}
            </p>
            <button>
              <CopyIcon className='hidden group-hover:inline-block' />
            </button>
          </span>

          <p>{message.message_text}</p>
          <small className='text-gray-500 text-xs'>
            {formatDate(message.message_date)} - {message.platform}
          </small>
        </div>
      </div>
    </div>
  )
}

export default Message
