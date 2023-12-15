import { useState, createContext } from "react";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    email: null,
    token: null,
    login: (userData) => { setAuthState({ ...authState, ...userData })},
    logout: () => { setAuthState({ user: null, email: null, token: null })},
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