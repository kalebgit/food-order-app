import React from 'react'

const AuthContext = React.createContext({isLoggedIn: true, isAdmin: true})

export default AuthContext;