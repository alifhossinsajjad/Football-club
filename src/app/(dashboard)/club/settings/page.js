'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ClubSettingsPage() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/club/settings/security')
  }, [router])
  
  return null
}