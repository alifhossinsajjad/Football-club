'use client'

import { useSelector } from 'react-redux'
import ClubSidebar from '@/components/layout/ClubSidebar'
import ClubTopbar from '@/components/layout/ClubTopbar'

export default function ClubLayout({ children }) {
  const theme = useSelector(state => state.theme)

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundColor: theme.colors.backgroundDark,
      }}
    >
      <ClubSidebar />
      <ClubTopbar />
      
      {/* Main Content - Responsive */}
      <main className="lg:ml-64 mt-20 p-4 lg:p-8">
        {children}
      </main>
    </div>
  )
}