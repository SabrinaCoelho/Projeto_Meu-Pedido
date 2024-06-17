import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tipoUsuario } from '../TipoUsuarioEnum';
import { socket } from '../socket';
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
    informacoes: '',
    ativo: false
}

export const useCadastroUsuarioContext = () => {
    return useContext(CadastroUsuarioContext);
}

export const CadastroUsuarioContext = createContext({
    usuario: usuarioInicial,
    erros: {},
    setId: () => null,
    setTipo: () => null,
    setNome: () => null,
    setEmail: () => null,
    setSenha: () => null,
    setRestauranteId: () => null,
    setCnpj: () => null,
    setEndereco: () => null,
    setTelefone: () => null,
    setAtivo: () => null,
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
        setUsuario(estadoAnterior => {
            return {
                ...estadoAnterior,
                tipo
            }
        })
    }
    const setAtivo = (ativo) => {
        setUsuario(estadoAnterior => {
            return {
                ...estadoAnterior,
                ativo
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
        
        axios.post("http://localhost:3001/api/aut/registro", {usuario})
            .then(
                res => {
                    if(res && res.data){
                        navegar("/login")
                    }
                }
            )
            .catch(err => {//TODO
                console.log(err.response.data.message);
            }

        )

        //navegar('/cadastro/concluido')
    }

    /* const possoSelecionarInteresse = () => {
        return !!usuario.Tipo
    } */

    const contexto = {
        usuario,
        setId,
        setTipo,
        setNome,
        setEndereco,
        setTelefone,
        setCnpj,
        setRestauranteId,
        setEmail,
        setSenha,
        setSenhaConfirmada,
        setInformacoes,
        submeterUsuario,
        setAtivo
        //possoSelecionarInteresse
    }

    return (<CadastroUsuarioContext.Provider value={contexto}>
        {children}
    </CadastroUsuarioContext.Provider>)
}