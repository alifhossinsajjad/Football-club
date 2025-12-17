'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function BoostingPage() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/admin/boosting/boosted-players')
  }, [router])
  
  return null
}