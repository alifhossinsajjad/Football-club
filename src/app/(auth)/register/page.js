import Link from 'next/link'
import React from 'react'

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="text-center pt-16 pb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-2">NextGen Pros</h1>
        <h2 className="text-2xl text-gray-600">Join as a...</h2>
        <p className="text-gray-500 mt-2">Select your role to start your registration</p>
      </div>

      {/* Role Cards */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Player Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm a Player</h3>
          <p className="text-gray-600 mb-8">
            Create a profile to showcase your talents and get discovered by clubs & scouts
          </p>
          <Link 
            href="/register/playerRegister" 
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Started →
          </Link>
        </div>

        {/* Scout/Agent Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">I'm a Scout /</h3>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Agent</h3>
          <p className="text-gray-600 mb-8">
            Discover promising young talents and build professional connections
          </p>
          <Link 
            href="/register/scoutRegister" 
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Get Started →
          </Link>
        </div>

        {/* Club/Academy Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">I'm a Club /</h3>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Academy</h3>
          <p className="text-gray-600 mb-8">
            Find and recruit the next generation of football stars
          </p>
          <Link 
            href="/register/academyRegister" 
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Get Started →
          </Link>
        </div>
      </div>

      {/* Sign In Link */}
      <div className="text-center mt-12 pb-16">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link href="/signin" className="text-blue-600 font-semibold hover:text-blue-800 hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage