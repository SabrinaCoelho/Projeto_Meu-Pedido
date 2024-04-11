import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AtendimentoInicial = {
    cliente: '',
    mesa: '',
    comanda: '1'
}

export const AtendimentoContext = createContext({
    atendimento: AtendimentoInicial,
    erros: {},
    setMesa: () => null,
    setCliente: () => null,
    setComanda: () => null
})

export const useAtendimentoContext = () => {
    return useContext(AtendimentoContext);
}

export const AtendimentoProvider = ({ children }) => {

    const navegar = useNavigate()

    const [atendimento, setAtendimento] = useState(AtendimentoInicial)

    const setCliente = (cliente) => {
        console.log(cliente)
        setAtendimento(estadoAnterior => {
            return {
                ...estadoAnterior,
                cliente
            }
        })
    }
    const setMesa = (mesa) => {
        setAtendimento(estadoAnterior => {
            return {
                ...estadoAnterior,
                mesa
            }
        })
    }
    const setComanda = (comanda) => {
        setAtendimento(estadoAnterior => {
            return {
                ...estadoAnterior,
                comanda
            }
        })
    }
    

    const submeterAtendimento = () => {
        
        console.log(atendimento)
        //navegar('/cadastro/concluido')
    }

    /* const possoSelecionarInteresse = () => {
        return !!usuario.Tipo
    } */

    const contexto = {
        atendimento,
        setMesa,
        setCliente,
        setComanda,
        submeterAtendimento
    }

    return (
    <AtendimentoContext.Provider value={contexto}>
        {children}
    </AtendimentoContext.Provider>)
}