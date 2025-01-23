'use client'

import RVProfileForm from '@/components/RVProfileForm'
import { AuthProvider } from '@/components/AuthProvider'
import { withAuthenticator } from '@aws-amplify/ui-react'

function NewRVPage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create RV Profile</h1>
            <p className="mt-2 text-sm text-gray-600">
              Enter your RV details below to get started with maintenance tracking
            </p>
          </div>
          <RVProfileForm />
        </div>
      </div>
    </AuthProvider>
  )
}

export default withAuthenticator(NewRVPage)
