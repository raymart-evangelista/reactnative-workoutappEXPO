import { useState, createContext } from "react";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    email: null,
    token: null,
  })

  const login = (userData) => { 
    setAuthState({ ...authState, ...userData })
    console.log('user logged in')
  }

  const logout = () => { 
    setAuthState({ ...authState, user: null, email: null, token: null })
    console.log('user logged out')
  }

  console.log('this is authState: ')
  console.log(authState)

  return (
    <AuthContext.Provider value={{ authState, setAuthState, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider