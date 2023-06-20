import React from 'react'

interface IProps {
  color: string
  text: string
}
const Badge: React.FC<IProps> = ({ color, text }) => {
  return (
    <div>
      {color === "red" ? <span className="bg-red-100 text-red-800 text-xs font-medium  px-5 py-1 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">{text}</span> :
        <span className="bg-green-100 text-green-800 text-xs font-medium  px-5 py-1 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">{text}</span>}
    </div>
  )
}

export default Badge
