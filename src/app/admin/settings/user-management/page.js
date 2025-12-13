'use client'

import { useSelector } from 'react-redux'

export default function UserManagementPage() {
  const theme = useSelector(state => state.theme)

  return (
    <div 
      className="border rounded-lg p-4 lg:p-8 min-h-[400px] flex items-center justify-center"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <div className="text-center">
        <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">User Management</h3>
        <p className="text-sm lg:text-base text-gray-400">Coming Soon...</p>
      </div>
    </div>
  )
}