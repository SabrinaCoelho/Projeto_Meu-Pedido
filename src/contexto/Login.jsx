import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginInicial = {
    email: '',
    senha: '',
    tipo: '1'
}

export const useLoginContext = () => {
    return useContext(LoginContext);
}

export const LoginContext = createContext({
    login: LoginInicial,
    erros: {},
    setEmail: () => null,
    setSenha: () => null,
    setTipo: () => null
})

export const LoginProvider = ({ children }) => {

    const navegar = useNavigate()

    const [login, setLogin] = useState(LoginInicial)

    const setEmail = (email) => {
        console.log(email)
        setLogin(estadoAnterior => {
            return {
                ...estadoAnterior,
                email
            }
        })
    }
    const setSenha = (senha) => {
        setLogin(estadoAnterior => {
            return {
                ...estadoAnterior,
                senha
            }
        })
    }
    const setTipo = (tipo) => {
        setLogin(estadoAnterior => {
            return {
                ...estadoAnterior,
                tipo
            }
        })
    }
    

    const submeterLogin = () => {
        
        console.log(login)
        //navegar('/cadastro/concluido')
    }

    /* const possoSelecionarInteresse = () => {
        return !!usuario.Tipo
    } */

    const contexto = {
        login,
        setEmail,
        setSenha,
        setTipo,
        submeterLogin
    }

    return (<LoginContext.Provider value={contexto}>
        {children}
    </LoginContext.Provider>)
}