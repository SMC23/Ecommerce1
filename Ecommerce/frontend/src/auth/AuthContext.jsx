import { createContext, useState } from 'react'

export const AuthContext = createContext() //crea el contexto de auth 

export const AuthProvider =({ children })=>{
    const [user, setUser]= useState(null)

    const login = (username)=>{
        setUser({ name: username }) //simular un login
    }

    const logout = ()=>{
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{ user, login , logout}} >
            {children}
        </AuthContext.Provider>
    )
}

