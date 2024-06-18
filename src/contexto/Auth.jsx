import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null); // Novo estado para armazenar o tipo de usuário

    const validateToken = (token) => {
        // Suponha que decodifique o token JWT para verificar a validade e extrair informações
        if (token && token !== "undefined") {
            try {
                const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload do JWT
                setUserType(payload.user_type); // Suponha que o tipo de usuário está armazenado no payload
                return true;
            } catch (e) {
                return false;
            }
        }
        return false;
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        //if (token && validateToken(token)) {
        if (token) {
            setIsLoggedIn(true);
        } else {//revisar
            logout(); // Assegura que tudo é resetado se o token não é válido
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        //if (validateToken(token)) {
            setIsLoggedIn(true);
        //}
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserType(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userType, setUserType, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};