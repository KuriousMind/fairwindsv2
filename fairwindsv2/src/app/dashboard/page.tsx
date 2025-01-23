'use client'

import { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/data'
import { type Schema } from '@/amplify/data/resource'
import { useAuthenticator, withAuthenticator } from '@aws-amplify/ui-react'
import { signOut } from 'aws-amplify/auth'
import Link from 'next/link'
import { AuthProvider } from '@/components/AuthProvider'

function DashboardPage() {
  const [rv, setRV] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuthenticator()
  const client = generateClient<Schema>()

  useEffect(() => {
    async function loadRVProfile() {
      try {
        const rvs = await client.models.RV.list({
          filter: {
            ownerEmail: {
              eq: user?.username
            }
          }
        })
        if (rvs.data.length > 0) {
          setRV(rvs.data[0])
        }
      } catch (error) {
        console.error('Error loading RV profile:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user?.username) {
      loadRVProfile()
    }
  }, [user?.username])

  const renderContent = () => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )
    }

    if (!rv) {
      return (
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Your Dashboard</h1>
              <p className="text-gray-600 mb-8">Looks like you haven't set up your RV profile yet.</p>
              <div className="space-y-4">
                <Link
                  href="/rv/new"
                  className="inline-block py-2 px-4 rounded-lg bg-primary text-white font-bold hover:opacity-90 transition-opacity"
                >
                  Create RV Profile
                </Link>
                <div className="pt-4">
                  <button
                    onClick={async () => {
                      try {
                        await signOut();
                        window.location.reload();
                      } catch (error) {
                        console.error('Error signing out:', error);
                      }
                    }}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Your RV</h1>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Make</p>
                  <p className="mt-1 text-lg text-gray-900">{rv.make}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Model</p>
                  <p className="mt-1 text-lg text-gray-900">{rv.model}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Year</p>
                  <p className="mt-1 text-lg text-gray-900">{rv.year}</p>
                </div>
                {rv.vin && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">VIN</p>
                    <p className="mt-1 text-lg text-gray-900">{rv.vin}</p>
                  </div>
                )}
              </div>
              {rv.notes && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500">Notes</p>
                  <p className="mt-1 text-gray-900">{rv.notes}</p>
                </div>
              )}
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Maintenance</h2>
              <p className="text-gray-600">No maintenance records yet.</p>
              {/* We'll add maintenance records here in the next phase */}
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex justify-center">
              <button
                onClick={async () => {
                  try {
                    await signOut();
                    window.location.reload();
                  } catch (error) {
                    console.error('Error signing out:', error);
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AuthProvider>
      {renderContent()}
    </AuthProvider>
  )
}

export default withAuthenticator(DashboardPage)
