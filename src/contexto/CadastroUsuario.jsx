import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tipoUsuario } from '../TipoUsuarioEnum';
import axios from 'axios';

const usuarioInicial = {
    id: '',
    tipo: '',
    nome: '',
    email: '',
    senha:'',
    restauranteId: '',
    cnpj: '',
    endereco: '',
    telefone: '',
    senhaConfirmada: '',
    informacoes: ''
}

export const useCadastroUsuarioContext = () => {
    return useContext(CadastroUsuarioContext);
}

export const CadastroUsuarioContext = createContext({
    usuario: usuarioInicial,
    erros: {},
    setTipo: () => null,
    setNome: () => null,
    setEmail: () => null,
    setSenha: () => null,
    setRestauranteId: () => null,
    setCnpj: () => null,
    setEndereco: () => null,
    setTelefone: () => null,
    setInformacoes: () => null,
    setSenhaConfirmada: () => null,
    submeterUsuario: () => null,
    possoSelecionarInteresse: () => null
})


export const CadastroUsuarioProvider = ({ children }) => {

    const navegar = useNavigate()

    const [usuario, setUsuario] = useState(usuarioInicial)


    const setId = (id) => {
        setUsuario(estadoAnterior => {
            return {
                ...estadoAnterior,
                id
            }
        })
    }
    
    const setTipo = (tipo) => {
        console.log("----------------", tipo)
        setUsuario(estadoAnterior => {
            return {
                ...estadoAnterior,
                tipo
            }
        })
    }
    const setNome = (nome) => {
        setUsuario(estadoAnterior => {
            return {
                ...estadoAnterior,
                nome
            }
        })
    }
    const setEmail = (email) => {
        setUsuario(estadoAnterior => {
            return {
                ...estadoAnterior,
                email
            }
        })
    }
    const setSenha = (senha) => {
        setUsuario(estadoAnterior => {
            return {
                ...estadoAnterior,
                senha
            }
        })
    }
    const setRestauranteId = (restauranteId) => {
        setUsuario(estadoAnterior => {
            return {
                ...estadoAnterior,
                restauranteId
            }
        })
    }
    const setCnpj = (cnpj) => {
        setUsuario(estadoAnterior => {
            return {
                ...estadoAnterior,
                cnpj
            }
        })
    }
    const setEndereco = (endereco) => {
        setUsuario(estadoAnterior => {
            return {
                ...estadoAnterior,
                endereco
            }
        })
    }
    const setTelefone = (telefone) => {
        setUsuario(estadoAnterior => {
            return {
                ...estadoAnterior,
                telefone
            }
        })
    }
    const setInformacoes = (informacoes) => {
        setUsuario(estadoAnterior => {
            return {
                ...estadoAnterior,
                informacoes
            }
        })
    }
    const setSenhaConfirmada = (senhaConfirmada) => {
        setUsuario(estadoAnterior => {
            return {
                ...estadoAnterior,
                senhaConfirmada
            }
        })
    }

    const submeterUsuario = () => {
        
        console.log(usuario)
        axios.post("http://localhost:3001/usuarios", {usuario})
            .then(
                res => {
                    console.log("OK, CHAOS!")
                    console.log(res);
                    if(res){
                        navegar("/login")
                    }
                }
            )
            .catch(err => {//TODO
                console.log("NAO deu certo")
            }

        )

        //navegar('/cadastro/concluido')
    }

    /* const possoSelecionarInteresse = () => {
        return !!usuario.Tipo
    } */

    const contexto = {
        usuario,
        setTipo,
        setNome,
        setEndereco,
        setTelefone,
        setCnpj,
        setRestauranteId,
        setEmail,
        setSenha,
        setSenhaConfirmada,
        submeterUsuario,
        //possoSelecionarInteresse
    }

    return (<CadastroUsuarioContext.Provider value={contexto}>
        {children}
    </CadastroUsuarioContext.Provider>)
}