import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const comandaInicial = {
    atendente: 'Rohan',
    erros: {},
    cliente: 'Josuke',
    mesa: '5',
    comandaID: '1234',
    inicio: '10:45:56',
    termino: ''
}

export const ComandaContext = createContext({
    comanda: comandaInicial,
    setErros: () => null,
    setAtendente: () => null,
    setCliente: () => null,
    setMesa: () => null,
    setComandaID: () => null,
    setInicio: () => null,
    setTermino: () => null,
})

export const useComandaContext = () => {
    return useContext(ComandaContext);
}

export const ComandaProvider = ({ children }) => {

    const navegar = useNavigate()

    const [comanda, setComanda] = useState(comandaInicial)

    const setAtendente = (atendente) => {
        console.log(atendente)
        setComanda(estadoAnterior => {
            return {
                ...estadoAnterior,
                atendente
            }
        })
    }
    const setErro = (erro) => {
        setComanda(estadoAnterior => {
            return {
                ...estadoAnterior,
                erro
            }
        })
    }
    const setCliente = (cliente) => {
        setComanda(estadoAnterior => {
            return {
                ...estadoAnterior,
                cliente
            }
        })
    }
    const setMesa = (mesa) => {
        setComanda(estadoAnterior => {
            return {
                ...estadoAnterior,
                mesa
            }
        })
    }
    
    const setComandaID = (comandaID) => {
        setComanda(estadoAnterior => {
            return {
                ...estadoAnterior,
                comandaID
            }
        })
    }
    const setInicio = (inicio) => {
        setComanda(estadoAnterior => {
            return {
                ...estadoAnterior,
                inicio
            }
        })
    }
    const setTermino = (termino) => {
        setComanda(estadoAnterior => {
            return {
                ...estadoAnterior,
                termino
            }
        })
    }
    

    const submeterComanda = () => {
        
        console.log(comanda)
        //navegar('/cadastro/concluido')
    }

    /* const possoSelecionarInteresse = () => {
        return !!usuario.Tipo
    } */

    const contexto = {
        comanda,
        setErro,
        setAtendente,
        setCliente,
        setMesa,
        setComandaID,
        setInicio,
        setTermino,
        submeterComanda
    }

    return (
    <ComandaContext.Provider value={contexto}>
        {children}
    </ComandaContext.Provider>)
}