import PlayerSideBar from '@/components/layout/PlayerSideBar'
import PlayerTopBar from '@/components/layout/PlayerTopBar'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-['Inter']">
      <PlayerSideBar/>
      <div className="lg:ml-58.75 min-h-screen flex flex-col">
        <PlayerTopBar/>
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout