'use client'

import { useState } from 'react'
import { signIn, signUp, confirmSignUp, signOut, getCurrentUser } from 'aws-amplify/auth'

type AuthMode = 'signIn' | 'signUp' | 'confirm'

export default function AuthUI() {
  const [mode, setMode] = useState<AuthMode>('signIn')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signIn({
        username: email,
        password
      })
      // Refresh the page to update auth state
      window.location.reload()
    } catch (err: any) {
      setError(err.message || 'Error signing in')
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email
          }
        }
      })
      setMode('confirm')
    } catch (err: any) {
      setError(err.message || 'Error signing up')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code
      })
      setMode('signIn')
    } catch (err: any) {
      setError(err.message || 'Error confirming sign up')
    } finally {
      setLoading(false)
    }
  }

  if (mode === 'confirm') {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-bold">Confirm Sign Up</h2>
        <form onSubmit={handleConfirm} className="space-y-4">
          <div>
            <label className="block mb-1">Confirmation Code</label>
            <p className="text-sm text-gray-500 mb-2">
              Check your email for the confirmation code
            </p>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Confirming...' : 'Confirm'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-bold">
        {mode === 'signIn' ? 'Sign In' : 'Sign Up'}
      </h2>
      <form onSubmit={mode === 'signIn' ? handleSignIn : handleSignUp} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {mode === 'signUp' && (
          <div className="text-sm text-gray-500 mb-4">
            Password must contain:
            <ul className="list-disc ml-5">
              <li>At least 8 characters</li>
              <li>At least one uppercase letter</li>
              <li>At least one lowercase letter</li>
              <li>At least one number</li>
              <li>At least one special character</li>
            </ul>
          </div>
        )}
        <button
          type="submit"
          disabled={loading || !email || !password}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : mode === 'signIn' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      <p className="mt-4 text-center">
        {mode === 'signIn' ? (
          <>
            Don't have an account?{' '}
            <button
              onClick={() => setMode('signUp')}
              className="text-blue-600 hover:underline"
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              onClick={() => setMode('signIn')}
              className="text-blue-600 hover:underline"
            >
              Sign In
            </button>
          </>
        )}
      </p>
    </div>
  )
}
