import React from 'react'
import { Sidebar } from '.'

interface IProps {
  children: React.ReactNode
}
const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <div className="h-screen bg-dashboard bg-cover">
      <Sidebar />
      <main className='w-[calc(100%-320px)] h-full ml-auto p-5'>
        {children}
      </main>
    </div>
  )
}

export default Layout
