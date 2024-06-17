import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const atendenteInicial = {
    submetido: false,
    id: '',
    tipo: '',
    nome: '',
    email: '',
    senha:'',
    senhaConfirmada:'',
    restauranteId: '',
    ativo: false
}

export const useCadastroAtendenteContext = () => {
    return useContext(CadastroAtendenteContext);
}

export const CadastroAtendenteContext = createContext({
    atendente: atendenteInicial,
    erros: {},
    setAtendenteId: () => null,
    setSubmetido: () => null,
    setTipoAtendente: () => null,
    setNomeAtendente: () => null,
    setEmailAtendente: () => null,
    setSenhaAtendente: () => null,
    setRestauranteIdAtendente: () => null,
    setAtivoAtendente: () => null,
    setSenhaConfirmadaAtendente: () => null,
    submeterUsuarioAtendente: () => null,
    resetAtendente: () => null,
    possoSelecionarInteresse: () => null
})


export const CadastroAtendenteProvider = ({ children }) => {

    const navegar = useNavigate()

    const [atendente, setAtendente] = useState(atendenteInicial)
    

    const setSubmetido = (submetido) => {
        setAtendente(estadoAnterior => {
            return {
                ...estadoAnterior,
                submetido
            }
        })
    }
    const setAtendenteId = (id) => {
        setAtendente(estadoAnterior => {
            return {
                ...estadoAnterior,
                id
            }
        })
    }
    
    const setTipoAtendente = (tipo) => {
        setAtendente(estadoAnterior => {
            return {
                ...estadoAnterior,
                tipo
            }
        })
    }
    const setAtivoAtendente = (ativo) => {
        setAtendente(estadoAnterior => {
            return {
                ...estadoAnterior,
                ativo
            }
        })
    }
    const setNomeAtendente = (nome) => {
        console.log(nome)
        setAtendente(estadoAnterior => {
            return {
                ...estadoAnterior,
                nome
            }
        })
    }
    const setEmailAtendente = (email) => {
        setAtendente(estadoAnterior => {
            return {
                ...estadoAnterior,
                email
            }
        })
    }
    const setSenhaAtendente = (senha) => {
        setAtendente(estadoAnterior => {
            return {
                ...estadoAnterior,
                senha
            }
        })
    }
    const setRestauranteIdAtendente = (restauranteId) => {
        setAtendente(estadoAnterior => {
            return {
                ...estadoAnterior,
                restauranteId
            }
        })
    }
    
    const setSenhaConfirmadaAtendente = (senhaConfirmada) => {
        setAtendente(estadoAnterior => {
            return {
                ...estadoAnterior,
                senhaConfirmada
            }
        })
    }
    const resetAtendente = () => {
        // setNomeAtendente("");
    }

    const submeterUsuarioAtendente = () => {
        
    }

    /* const possoSelecionarInteresse = () => {
        return !!usuario.Tipo
    } */

    const contexto = {
        atendente,
        setSubmetido,
        setAtendenteId,
        setTipoAtendente,
        setNomeAtendente,
        setRestauranteIdAtendente,
        setEmailAtendente,
        setSenhaAtendente,
        setSenhaConfirmadaAtendente,
        submeterUsuarioAtendente,
        resetAtendente,
        setAtivoAtendente
        //possoSelecionarInteresse
    }

    return (<CadastroAtendenteContext.Provider value={contexto}>
        {children}
    </CadastroAtendenteContext.Provider>)
}