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
      <div className="p-6 bg-white rounded-lg shadow-lg border-2 border-accent">
        <h2 className="mb-4 text-2xl font-bold text-heading">Confirm Sign Up</h2>
        <form onSubmit={handleConfirm} className="space-y-4">
          <div>
            <label className="block mb-1 text-text font-medium">Confirmation Code</label>
            <p className="text-sm text-text/70 mb-2">
              Check your email for the confirmation code
            </p>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 border-2 border-primary/20 rounded-lg focus:border-primary focus:outline-none"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
          className="w-full px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 disabled:bg-primary/50 transition-colors"
          >
            {loading ? 'Confirming...' : 'Confirm'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border-2 border-accent">
      <h2 className="mb-4 text-2xl font-bold text-heading">
        {mode === 'signIn' ? 'Sign In' : 'Sign Up'}
      </h2>
      <form onSubmit={mode === 'signIn' ? handleSignIn : handleSignUp} className="space-y-4">
        <div>
          <label className="block mb-1 text-text font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border-2 border-primary/20 rounded-lg focus:border-primary focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-text font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border-2 border-primary/20 rounded-lg focus:border-primary focus:outline-none"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {mode === 'signUp' && (
          <div className="text-sm text-text/70 mb-4">
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
          className="w-full px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 disabled:bg-primary/50 transition-colors"
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
              className="text-primary hover:text-primary/80 font-medium bg-transparent p-0"
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              onClick={() => setMode('signIn')}
              className="text-primary hover:text-primary/80 font-medium bg-transparent p-0"
            >
              Sign In
            </button>
          </>
        )}
      </p>
    </div>
  )
}
