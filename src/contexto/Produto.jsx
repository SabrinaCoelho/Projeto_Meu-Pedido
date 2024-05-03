import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProdutoInicial = {
    nome: '',
    descricao: '',
    preco: ''
}

export const ProdutoContext = createContext({
    produto: ProdutoInicial,
    erros: {},
    setNome: () => null,
    setDescricao: () => null,
    setPreco: () => null,
    setCategoria: () => null
})

export const useProdutoContext = () => {
    return useContext(ProdutoContext);
}

export const ProdtutoProvider = ({ children }) => {

    const navegar = useNavigate()

    const [produto, setProduto] = useState(ProdutoInicial)

    const setNome = (nome) => {
        console.log(nome)
        setProduto(estadoAnterior => {
            return {
                ...estadoAnterior,
                nome
            }
        })
    }
    const setDescricao = (descricao) => {
        setProduto(estadoAnterior => {
            return {
                ...estadoAnterior,
                descricao
            }
        })
    }
    const setPreco = (preco) => {
        setProduto(estadoAnterior => {
            return {
                ...estadoAnterior,
                preco
            }
        })
    }
    const setCategoria = (categoria) => {
        setProduto(estadoAnterior => {
            return {
                ...estadoAnterior,
                categoria
            }
        })
    }
    

    const submeterProduto = () => {
        
        console.log(produto)
        //navegar('/cadastro/concluido')
    }

    /* const possoSelecionarInteresse = () => {
        return !!usuario.Tipo
    } */

    const contexto = {
        produto,
        setNome,
        setDescricao,
        setPreco,
        setCategoria,
        submeterProduto
    }

    return (
    <ProdutoContext.Provider value={contexto}>
        {children}
    </ProdutoContext.Provider>)
}