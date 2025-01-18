import { ReactNode, MouseEvent } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  clicked?: boolean
}

export const FilterButton = ({ children, onClick, clicked }: ButtonProps) => {
  return (
    <button
      onClick={(e) => {
        onClick(e)
      }}
      className={`transition-colors duration-200 py-2 px-1 sm:px-1 xl:px-2 bg-blue-100 hover:bg-blue-300  text-nowrap w-full rounded-xl lg:text-base text-xs text-blue-900 ${
        clicked && ' bg-blue-300'
      }`}
    >
      {children}
    </button>
  )
}

export const ChatButton = ({ children, onClick, clicked }: ButtonProps) => {
  return (
    <button
      onClick={(e) => {
        onClick(e)
      }}
      className={`transition-colors duration-200 text-left lg:p-2 sm:p-2 p-1 pl-2 md:text-base text-xs bg-blue-100 hover:bg-blue-300 w-full text-nowrap rounded-lg truncate text-ellipsis max-w-xs shadow text-blue-900 ${
        clicked && ' bg-blue-300'
      }`}
    >
      {children}
    </button>
  )
}
