// import Link from 'next/link'

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#0B0D2C' }}>
//       <h1 className="text-6xl font-bold text-white mb-8">
//         NextGen Pros
//       </h1>
//       <p className="text-gray-400 text-xl mb-12">
//         Football Player Management Platform
//       </p>
//       <div className="flex gap-4">
//         <Link href="/admin/dashboard">
//           <button className="px-8 py-4 bg-cyan-500 text-white rounded-lg font-semibold hover:scale-105 transition-all">
//             Admin Dashboard
//           </button>
//         </Link>
//         <Link href="/login">
//           <button className="px-8 py-4 bg-purple-500 text-white rounded-lg font-semibold hover:scale-105 transition-all">
//             Login
//           </button>
//         </Link>
//       </div>
//     </div>
//   )
// }



import Banner from '@/components/landing/Banner'
import ClubsSection from '@/components/landing/ClubSection'
import FeaturedPlayers from '@/components/landing/Featured'
import Footer from '@/components/landing/Footer'
import HowItWorks from '@/components/landing/HowItWorks'
import LatestNews from '@/components/landing/LatestNews'
import Navbar from '@/components/landing/Navbar'
import Subscription from '@/components/landing/Subscription'
import UpcomingEvent from '@/components/landing/UpcomingEvents'
import React from 'react'

export default function LandingPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <Banner />
      <ClubsSection />
      <HowItWorks />
      <FeaturedPlayers />
      <LatestNews />
      <UpcomingEvent />
      <Subscription />
      <Footer />
    </div>
  )
}

