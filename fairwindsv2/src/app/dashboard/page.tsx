'use client'

import { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/data'
import { type Schema } from '@/amplify/data/resource'
import { useAuthenticator, withAuthenticator } from '@aws-amplify/ui-react'
import { signOut } from 'aws-amplify/auth'
import Link from 'next/link'
import { AuthProvider } from '@/components/AuthProvider'

function DashboardPage() {
  interface RV {
    id: string;
    make: string | null;
    model: string | null;
    year: number | null;
    vin?: string | null;
    notes?: string | null;
    ownerEmail: string | null;
  }
  
  const [rvs, setRVs] = useState<RV[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuthenticator()
  const client = generateClient<Schema>()

  useEffect(() => {
    async function loadRVProfile() {
      try {
        console.log('Loading RV profile for user:', user?.signInDetails?.loginId);
        const rvs = await client.models.RV.list({
          filter: {
            ownerEmail: {
              eq: user?.signInDetails?.loginId
            }
          }
        })
        console.log('Fetched RVs:', rvs.data);
        setRVs(rvs.data)
      } catch (error) {
        console.error('Error loading RV profile:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user?.signInDetails?.loginId) {
      loadRVProfile()
    }
  }, [user?.signInDetails?.loginId])

  const renderContent = () => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )
    }

    if (rvs.length === 0) {
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Your RVs</h1>
            <Link
              href="/rv/new"
              className="inline-block py-2 px-4 rounded-lg bg-primary text-white font-bold hover:opacity-90 transition-opacity"
            >
              Add New RV
            </Link>
          </div>
          <div className="space-y-6">
            {rvs.map((rv) => (
              <div key={rv.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Make</p>
                      <p className="mt-1 text-lg text-gray-900">{rv.make || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Model</p>
                      <p className="mt-1 text-lg text-gray-900">{rv.model || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Year</p>
                      <p className="mt-1 text-lg text-gray-900">{rv.year || 'N/A'}</p>
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
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">Maintenance</h2>
                    <button className="text-primary hover:text-primary-dark font-medium">
                      Add Record
                    </button>
                  </div>
                  <p className="text-gray-600 mt-2">No maintenance records yet.</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
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
    )
  }

  return (
    <AuthProvider>
      {renderContent()}
    </AuthProvider>
  )
}

export default withAuthenticator(DashboardPage)
