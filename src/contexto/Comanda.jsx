import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* const comandaInicial = {
    atendente: 'Rohan',
    erros: {},
    cliente: 'Josuke',
    mesa: '5',
    comandaID: '1234',
    inicio: '10:45:56',
    termino: ''
} */
const comandaInicial = {
    atendente: '',
    erros: {},
    cliente: '',
    mesa: '',
    comandaID: '',
    inicio: '',
    termino: '',
    pedidos: []
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
    setStatus: () => null,
    setPedidos: () => null
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
        console.log(cliente)
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
    const setStatus = (status) => {//fechou (tem o termino lá) mas foi pago?
        setComanda(estadoAnterior => {
            return {
                ...estadoAnterior,
                status
            }
        })
    }
    const setPedidos = (pedidos) => {
        setComanda(estadoAnterior => {
            return {
                ...estadoAnterior,
                pedidos
            }
        })
    }
    

    const submeterComanda = () => {
        
        console.log(comanda)
        axios.post("http://localhost:3001/comanda", {comanda})
            .then(
                res => {
                    console.log("OK, CHAOS!")
                    console.log(res);
                    
                }
            )
            .catch(err => {//TODO
                console.log("NAO deu certo")
            }

        )
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
        setPedidos,
        setStatus,
        submeterComanda
    }

    return (
    <ComandaContext.Provider value={contexto}>
        {children}
    </ComandaContext.Provider>)
}