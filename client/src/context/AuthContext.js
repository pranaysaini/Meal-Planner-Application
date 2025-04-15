import React, { createContext, useState, useEffect, useContext } from 'react';
import { setAuthToken } from '../utils/api';
import { decodeToken } from '../utils/auth';
// Add this import at the top

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            setAuthToken(token);
            const decoded = decodeToken(token);
            setUser(decoded);
            setIsAuthenticated(true);
        }
        setAuthToken(false);
    }, [])
    
    const login = async(token) => {
        localStorage.setItem('token', token);
        setAuthToken(token);
        const decoded = decodeToken(token);
        setUser(decoded);
        setIsAuthenticated(true);
    }
    
    const logout = async(token) => {
        localStorage.removeItem('token')
        setAuthToken(null);
        setUser(null);
        setIsAuthenticated(false);
    }
    
    return (
        <AuthContext.Provider value={{user, isAuthenticated, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
};

