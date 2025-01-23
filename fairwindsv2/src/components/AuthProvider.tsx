'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser } from 'aws-amplify/auth'
import { Amplify } from 'aws-amplify'
import { configureAmplify } from '@/app/amplifyconfiguration'

// Configure Amplify
Amplify.configure(configureAmplify(), { ssr: true })

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: any | null
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
      const user = await getCurrentUser()
      setIsAuthenticated(true)
      setUser(user)
    } catch (error) {
      setIsAuthenticated(false)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user }}>
      {children}
    </AuthContext.Provider>
  )
}
