import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import axios from 'axios';

const LoginInicial = {
    email: '',
    senha: ''
}

export const LoginContext = createContext({
    usuario: LoginInicial,
    erros: {},
    setEmail: () => null,
    setSenha: () => null
})

export const useLoginContext = () => {
    return useContext(LoginContext);
}

export const LoginProvider = ({ children }) => {

    const navegar = useNavigate();
    const { login, setUserType } = useAuth();

    const [usuario, setLogin] = useState(LoginInicial)

    const setEmail = ({target}) => {
        const email = target.value;
        setLogin(estadoAnterior => {
            return {
                ...estadoAnterior,
                email
            }
        })
    }
    const setSenha = ({target}) => {
        const senha = target.value;
        setLogin(estadoAnterior => {
            return {
                ...estadoAnterior,
                senha
            }
        })
    }

    const submeterLogin = () => {
        axios.post("http://localhost:3001/api/aut/login", {usuario})
            .then(
                res => {
                    if(res){
                        localStorage.setItem("token", res.data.token)
                        localStorage.setItem("usuario", res.data.usuario.email)
                        login(res.data.token);
                        setUserType(res.data.usuario.tipo);
                        navegar('/perfil')
                    }
                }
            )
            .catch(err => {
                console.log(err.response.data.message);
                alert(err.response.data.message);
            }

        )
    }

    /* const possoSelecionarInteresse = () => {
        return !!usuario.Tipo
    } */

    const contexto = {
        usuario,
        setEmail,
        setSenha,
        submeterLogin
    }

    return (<LoginContext.Provider value={contexto}>
        {children}
    </LoginContext.Provider>)
}