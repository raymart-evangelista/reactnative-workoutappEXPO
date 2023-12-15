import { useState, createContext } from "react";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    email: null,
    token: null,
    login: (userData) => {setUser(userData)},
    logout: () => {setUser(null)},
  })
  console.log('this is authState: ')
  console.log(authState)

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider