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
    atendenteId: '',
    atendenteNome: '',
    erros: {},
    cliente: '',
    mesa: '',
    comandaId: '',
    inicio: '',
    termino: '',
    restauranteId: '',
    total: '',
    pedidos: []
}

export const ComandaContext = createContext({
    comanda: comandaInicial,
    setErros: () => null,
    setRestauranteId: () => null,
    setAtendenteId: () => null,
    setAtendenteNome: () => null,
    setCliente: () => null,
    setMesa: () => null,
    setComandaId: () => null,
    setInicio: () => null,
    setTermino: () => null,
    setStatus: () => null,
    setPedidos: () => null,
    setTotal: () => null
})

export const useComandaContext = () => {
    return useContext(ComandaContext);
}

export const ComandaProvider = ({ children }) => {

    const navegar = useNavigate()

    const [comanda, setComanda] = useState(comandaInicial)

    const setRestauranteId = (restauranteId) => {
        setComanda(estadoAnterior => {
            return {
                ...estadoAnterior,
                restauranteId
            }
        })
    }

    const setAtendenteId = (atendenteId) => {
        setComanda(estadoAnterior => {
            return {
                ...estadoAnterior,
                atendenteId
            }
        })
    }
    const setAtendenteNome = (atendenteNome) => {
        setComanda(estadoAnterior => {
            return {
                ...estadoAnterior,
                atendenteNome
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
    
    const setComandaId = (comandaId) => {
        setComanda(estadoAnterior => {
            return {
                ...estadoAnterior,
                comandaId
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
    const setTotal = (total) => {//fechou (tem o termino lá) mas foi pago?
        setComanda(estadoAnterior => {
            return {
                ...estadoAnterior,
                total
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
    
    const usuarioEmail = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");

    const submeterComanda = () => {
        console.log(comanda)
        axios.post("http://localhost:3001/api/comandas",
            {comanda},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(
                res => {
                    console.log("OK, CHAOS!")
                    console.log(res);

                    setComandaId(res.data.comanda.comandaId)
                    navegar('/perfil/comanda-digital')
                }
            )
            .catch(err => {//TODO
                console.log(err)
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
        setRestauranteId,
        setAtendenteId,
        setAtendenteNome,
        setCliente,
        setMesa,
        setComandaId,
        setInicio,
        setTermino,
        setPedidos,
        setStatus,
        submeterComanda,
        setTotal
    }

    return (
    <ComandaContext.Provider value={contexto}>
        {children}
    </ComandaContext.Provider>)
}