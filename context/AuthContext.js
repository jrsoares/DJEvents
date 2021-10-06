import { createContext, useEffect, useState } from 'react';
import { API_URL } from '@/config/index';
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from 'services/api';
import Router from 'next/router';
import { FaAppStoreIos } from 'react-icons/fa';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'djevent.token': jwt } = parseCookies();

    if (jwt) {
      api.get('users/me', {
      }).then(response => {
        const { username, email, role } = response.data
        setUser({
          username, email, role
        })

      }).catch(() => {
        logout()
      })
    } else {
      logout()
    }
  }, [])



  // Register user

  const register = async ({ username, email, password }) => {

    try {
      const response = await api.post('/auth/local/register', {
        username, email, password
      })

      const { user, jwt } = response.data;

      setCookie(undefined, 'djevent.token', jwt, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: "/"
      })

      setUser(user);

      Router.push('/account/dashboard')

    } catch (e) {
      setError(e.message);
      setError(null);
    }
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

      setUser(user);

      Router.push('/account/dashboard')

    } catch (e) {
      setError(e.message);
      setError(null);
    }
  }

  // Logout user

  const logout = () => {
    destroyCookie(undefined, 'djevent.token');
    Router.push('/')
  }

  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    console.log('check')
  }

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout, checkUserLoggedIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthContext
