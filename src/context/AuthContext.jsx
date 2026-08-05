import { createContext, useContext, useCallback, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AuthContext = createContext(null)

// NOTE: This is a client-only auth stub backed by localStorage so the UI flows
// (login, register, protected checkout) work end-to-end on mock data.
// Swap `login`/`register` for real calls to your Flask API's
// POST /login and POST /register endpoints when the backend is connected —
// see services/api.js for the documented endpoint contract.
export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage('freshmart_users', [])
  const [currentUser, setCurrentUser] = useLocalStorage('freshmart_current_user', null)

  const register = useCallback(({ fullName, email, password }) => {
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'An account with this email already exists' }
    }
    const user = { fullName, email, password }
    setUsers((prev) => [...prev, user])
    setCurrentUser({ fullName, email })
    return { ok: true }
  }, [users, setUsers, setCurrentUser])

  const login = useCallback(({ email, password }) => {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!found) return { ok: false, error: 'Invalid email or password' }
    setCurrentUser({ fullName: found.fullName, email: found.email })
    return { ok: true }
  }, [users, setCurrentUser])

  const logout = useCallback(() => setCurrentUser(null), [setCurrentUser])

  const value = useMemo(
    () => ({ currentUser, login, register, logout, isAuthenticated: !!currentUser }),
    [currentUser, login, register, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
