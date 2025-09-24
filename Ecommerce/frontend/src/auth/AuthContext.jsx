import { createContext, useState, useEffect} from 'react'

export const AuthContext = createContext() //crea el contexto de auth 

export const AuthProvider =({ children })=>{
    const [user, setUser]= useState(null)
    
    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(token){
            setUser({ token })
        }
    },[])

    const login = (token)=>{
        localStorage.setItem("token", token)
        setUser({ token }) //simular un login
    }

    const logout = ()=>{
        localStorage.removeItem("token")
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{ user, login , logout}} >
            {children}
        </AuthContext.Provider>
    )
}

