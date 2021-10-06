import { createContext, useEffect, useState } from 'react';
import { API_URL } from '@/config/index';
import { setCookie } from 'nookies'
import { api } from 'services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => { })


  // Register user

  const register = async (user) => {
    console.log(user)
  }

  // Login user

  const login = async ({ email: identifier, password }) => {
    try {
      const response = await api.post('/auth/local', {
        identifier,
        password
      })

      const { user, jwt } = response.data;

      setCookie(undefined, 'djevent.token', jwt, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: "/"
      })

      setUser(user)

    } catch (e) {
      setError(e.message);
      setError(null);
    }
  }

  // Logout user

  const logout = async () => {
    console.log('Logout')
  }

  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    console.log('check')
  }

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout, checkUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthContext
