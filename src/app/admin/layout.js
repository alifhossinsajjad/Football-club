// src/app/admin/layout.js
'use client'

import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0B0D2C]">
      <Sidebar />
      <Topbar />
      
      {/* Main Content */}
      <main className="ml-64 mt-20 p-8">
        {children}
      </main>
    </div>
  )
}