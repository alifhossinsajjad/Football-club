'use client'

import { useSelector } from 'react-redux'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'

export default function AdminLayout({ children }) {
  const theme = useSelector(state => state.theme)

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundColor: theme.colors.backgroundDark,
      }}
    >
      <Sidebar />
      <Topbar />
      
      {/* Main Content - Responsive */}
      <main className="lg:ml-64 mt-20 p-4 lg:p-8">
        {children}
      </main>
    </div>
  )
}