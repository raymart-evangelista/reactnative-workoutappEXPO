import { useState, createContext } from "react";

export const AuthContext = createContext({
  user: null,
  login: (userData) => {setUser(userData)},
  logout: () => {setUser(null)},
})

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    login: (userData) => {setUser(userData)},
    logout: () => {setUser(null)},
  })

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider