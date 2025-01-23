'use client'

import AuthUI from '@/components/AuthUI'
import { useAuth } from '@/components/AuthProvider'

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      {!isAuthenticated ? (
        <AuthUI />
      ) : (
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Welcome to Fairwinds</h1>
          <p className="text-gray-600">You are now signed in!</p>
        </div>
      )}
    </main>
  )
}
