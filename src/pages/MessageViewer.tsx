import React, { useRef, useState } from 'react'
import useFetchMessages from '../hooks/useFetchMessages'
import MessageGroup from '../components/MessageGroup'
import ScrollToBottomButton from '../components/ScrollToBottomButton'
import {groupChat } from '../utils/groupMessages'
import Header from '../components/Header'
import { ChatButton, FilterButton } from '../components/Button'
import { filterType } from '../types'
import { formatDate } from '../utils/formatDate'
import { toast } from 'sonner'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { AnimatePresence, motion } from 'framer-motion'
import { filterConversationsByDate } from '../utils/filterConversationsByDate'

const MessageViewer: React.FC = () => {
  const { messages, loading, error } = useFetchMessages()
  const containerRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = React.useState<filterType>('RECENT')
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const now = new Date('2024-03-13T09:51:13Z')

  if (loading) return <Loader />
  if (error) return <Error />
  const groupChats = groupChat(messages)

  const scrollToBottom = () => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newFilter = e.currentTarget
      .textContent!.toUpperCase()
      .replace(' ', '_') as filterType
    setFilter(newFilter as filterType)
    toast.success(`Filter set to ${newFilter}`)
  }

  return (
    <div className='h-screen flex flex-col items-center overflow-hidden bg-gray-900/90 space-y-2'>
      <Header />
      <div className='flex overflow-hidden w-full '>
        <aside className='bg-gray-900 text-white w-1/3  lg:w-1/4 xl:w-1/4 p-4 flex flex-col ml-2 rounded-xl'>
          <div>
            <h3 className='text-md font-medium'>Filter:</h3>
            <ul
              className='2xl:flex justify-between items-center mt-2 grid grid-cols-2 gap-2 message-list'
              role='list'
              aria-label='Messages'
            >
              <li className='xl:w-full'>
                <FilterButton
                  onClick={handleClick}
                  clicked={filter === 'RECENT'}
                >
                  Recent
                </FilterButton>
              </li>
              <li className='xl:w-full'>
                <FilterButton
                  onClick={handleClick}
                  clicked={filter === 'TODAY'}
                >
                  Today
                </FilterButton>
              </li>
              <li className='xl:w-full'>
                <FilterButton
                  onClick={handleClick}
                  clicked={filter === 'YESTERDAY'}
                >
                  Yesterday
                </FilterButton>
              </li>
              <li className='xl:w-full'>
                <FilterButton
                  onClick={handleClick}
                  clicked={filter === 'LAST_WEEK'}
                >
                  Last week
                </FilterButton>
              </li>
            </ul>
          </div>
          <h3 className='text-md font-medium mb-2 mt-4'>Chats</h3>
          <div className='flex-1 overflow-y-auto custom-scrollbar  overflow-x-hidden '>
            <ul
              className='space-y-2 message-list'
              role='list'
              aria-label='Messages'
            >
              <li className='mr-2 font-bold'>
                <ChatButton
                  onClick={() => {
                    setSelectedChat(null)
                    toast.success(`All chats selected`)
                  }}
                  clicked={selectedChat === null}
                >
                  All
                </ChatButton>
              </li>
              {groupChat(filterConversationsByDate(messages, filter, now)).map(
                (chat, index) => {
                  if (filter !== null) {
                    return (
                      <li
                        key={index}
                        className='mr-2 flex flex-row justify-between'
                      >
                        <ChatButton
                          onClick={() => {
                            setSelectedChat(chat[0].id)
                            toast.success(`Chat selected`)
                          }}
                          clicked={selectedChat === chat[0].id}
                        >
                          <span className='flex items-center justify-between mb-2'>
                            <h4 className='font-bold '>
                              {chat[chat.length - 1].sender_name}
                            </h4>
                            <p className='md:text-sm text-xs hidden sm:block'>
                              {formatDate(chat[chat.length - 1].message_date)}
                            </p>
                          </span>
                          {chat[chat.length - 1].message_text}
                        </ChatButton>
                      </li>
                    )
                  }
                }
              )}
            </ul>
          </div>
        </aside>

        <motion.main
          className='flex-1 bg-gray-900 p-6 overflow-y-auto custom-scrollbar mx-2 rounded-xl w-full'
          ref={containerRef}
          key={`${filter}-${selectedChat}`}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <AnimatePresence mode='wait'>
            <div className='text-gray-700 w-full'>
              {groupChats.map((chat, index) => {
                if (selectedChat === null) {
                  return (
                    <MessageGroup
                      key={index}
                      date={now}
                      messages={chat}
                      filter={filter}
                    />
                  )
                } else {
                  if (selectedChat === chat[0].id) {
                    return (
                      <MessageGroup
                        key={index}
                        date={now}
                        messages={chat}
                        filter={filter}
                      />
                    )
                  }
                }
              })}
            </div>
          </AnimatePresence>
        </motion.main>
      </div>

      <ScrollToBottomButton onClick={scrollToBottom} />

      <footer className='w-full pb-2 px-2 '>
        <div className='bg-gray-900 text-white text-center py-3 w-full rounded-xl'>
          Pablo Gomez Dev
        </div>
      </footer>
    </div>
  )
}

export default MessageViewer
