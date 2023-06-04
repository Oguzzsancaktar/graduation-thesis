import React from 'react'
import { Sidebar } from '.'

interface IProps {
  children: React.ReactNode
}
const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <div className="h-screen">
      <Sidebar />
      <main className='w-[calc(100%-320px)] ml-auto p-5'>
        {children}
      </main>
    </div>
  )
}

export default Layout
