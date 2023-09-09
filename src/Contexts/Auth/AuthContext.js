import React from 'react'

const AuthContext = React.createContext({isLoggedIn: false, isAdmin: false})

export default AuthContext;