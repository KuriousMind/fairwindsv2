'use client'

import AuthUI from '@/components/AuthUI'
import { useAuth } from '@/components/AuthProvider'
import { signOut } from 'aws-amplify/auth'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 p-4">
      <div className="w-full md:w-1/2 max-w-md">
        <Image
          src="/rvpirate.png"
          alt="RV Pirate"
          width={500}
          height={500}
          className="w-full h-auto"
          priority
        />
      </div>
      {!isAuthenticated ? (
        <div className="w-full md:w-1/2 max-w-md">
          <AuthUI />
        </div>
      ) : (
        <div className="p-6 bg-white rounded-lg shadow-lg border-2 border-accent">
          <h1 className="text-3xl font-bold mb-4 text-heading">Welcome to Fairwinds</h1>
          <p className="text-text mb-6">You are now signed in! Ready to maintain your vessel?</p>
          <div className="space-y-4">
            <Link 
              href="/rv/new"
              className="block w-full py-2 px-4 rounded-lg bg-primary text-white font-bold hover:opacity-90 transition-opacity text-center"
            >
              Create RV Profile
            </Link>
            <Link 
              href="/dashboard"
              className="block w-full py-2 px-4 rounded-lg bg-accent text-white font-bold hover:opacity-90 transition-opacity text-center"
            >
              View Maintenance Tasks
            </Link>
            <button
              onClick={async () => {
                try {
                  await signOut();
                  window.location.reload();
                } catch (error) {
                  console.error('Error signing out:', error);
                }
              }}
              className="block w-full py-2 px-4 rounded-lg bg-accent text-white font-bold hover:opacity-90 transition-opacity text-center"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
