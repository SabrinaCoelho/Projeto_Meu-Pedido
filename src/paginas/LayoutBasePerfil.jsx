import styled from '@emotion/styled'
import { Outlet, useLocation } from "react-router-dom";
import { useCadastroUsuarioContext } from "../contexto/CadastroUsuario";
import { useLoginContext } from "../contexto/Login"
import MenuLateral from "../componentes/MenuLateral/MenuLateral"
import { useEffect } from 'react';
import axios from 'axios';

import { useSocketContext } from '../contexto/Socket'; 
import { useAuth } from '../contexto/Auth';

const SideMenu = styled.div`
    height: 100%;
    width: 200px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
`
const SideMenuItem = styled.a`
    padding: 6px 6px 6px 6px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    margin: 0;
    &:hover{
        color: #f1f1f1;
    }
`
const Conteudo = styled.div`
    margin-left: 200px;
`
const ContainerPerfil = styled.div`
    height: 200px;
    width: 100%;
    background-color: pink;
`
export const LayoutBasePerfil = () => {
    const { socket, connect, isConnected } = useSocketContext();
    
    let {pathname} = useLocation()
    let teste = pathname.split("/")
    pathname = teste[1]
    //console.log(pathname)
    let userId = teste[2]
    
    const { 
        usuario,
        setId,
        setNome, 
        setTelefone,
        setRestauranteId,
        setEmail, 
        setTipo,
        setCnpj,
        setEndereco,
        setInformacoes,
        setAtivo,
    } = useCadastroUsuarioContext()
    
    const usuarioEmail = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");
    const { setUserType } = useAuth();

    useEffect(
        () => {
            if(isConnected){
                let filtro = usuario.tipo === "cliente" ? usuario.email : usuario.id
                axios.get(`http://localhost:3001/api/comandas_relacionadas/`+ filtro,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                    .then(
                        res => {
                            if(res && res.data){
                                const {comandas} = res.data;
                                if(usuario.tipo & usuario.ativo === "atendente"){
                                    socket.emit("online", {
                                        query: {
                                            comandas,
                                            usuarioId: usuario.id,
                                            usuarioTipo: usuario.tipo,
                                            restauranteId: usuario.restauranteId
                                        }
                                    });
                                }else{
                                    socket.emit("online", {
                                        query: {
                                            comandas,
                                            usuarioId: usuario.id,
                                            usuarioTipo: usuario.tipo
                                        }
                                    });
                                }
                            }
                        }
                    )
                    .catch(err => {//TODO
                        console.log(err.response.data.message);
                    }

                )
            }
        }, [isConnected, usuario]
    );
    useEffect(
        () => {
            axios.get(`http://localhost:3001/api/aut/usuarios/${usuarioEmail}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(
                    res => {
                        if(res && res.data){
                            const {nome, email, tipo, id, telefone, cnpj, endereco, restauranteId, informacoes, ativo} = res.data.usuario;
                            setNome(nome);
                            setEmail(email);
                            setTipo(tipo);
                            setId(id)
                            setTelefone(telefone);
                            setCnpj(cnpj);
                            setEndereco(endereco);
                            setInformacoes(informacoes);
                            setAtivo(ativo);
                            setUserType(tipo);
                            setRestauranteId(restauranteId);
                            // console.log(usuario)
                            // if(tipo === "restaurante"){
                                // if(!socket.connected){//TODO melhorar isso aqui
                                    connect();//VERIFICAR URGENTE 15/06
                                // }
                            // }
                        }
                    }
                )
                .catch(err => {//TODO
                    console.log("NAO deu certo")
                    console.log(err)
                    alert(err.response.data.message);
                }

            ) 
        }, [userId]
    )

    let itens = []
    if(usuario.tipo == "restaurante"){
        itens = [
            {
                texto: "Atualizar cadastro",
                link: "/perfil/atualizar-dados"
            },
            {
                texto: "Configurar funcionários",
                link: "/perfil/configurar-funcionarios"
            },
            {
                texto: "Cardápio",
                link: "/perfil/cardapio"
            },
            {
                texto: "Histórico de atendimentos",
                link: "/perfil/historico-atendimentos"
            },
            {
                texto: "Chamados",
                link: "/perfil/chamados"
            },
            {
                texto: "Pedidos",
                link: "/perfil/pedidos"
            }
        ]
    }else if(usuario.tipo == "atendente" && usuario.ativo){
        itens = [
            {
                texto: "Atualizar cadastro",
                link: "/perfil/atualizar-dados"
            },
            {
                texto: "Histórico de atendimentos",
                link: "/perfil/historico-atendimentos"
            },
            {
                texto: "Iniciar atendimento",
                link: "/perfil/iniciar-atendimento"
            },
            {
                texto: "Comandas em andamento",
                link: "/perfil/comandas-em-andamento"
            },
            {
                texto: "Gerar código",
                link: "/perfil/gerar-codigo"
            }
        ]
    }else if(usuario.tipo == "cliente"){//cliente
        itens = [
            {
                texto: "Atualizar cadastro",
                link: "/perfil/atualizar-dados"
            },
            {
                texto: "Histórico de atendimentos",
                link: "/perfil/historico-atendimentos"
            },
            {
                texto: "Restaurantes",
                link: "/perfil/restaurantes"
            },
            {
                texto: "Comanda digital",
                link: "/perfil/acesso-comanda-digital"
            },
        ]
    }
    return(
        <MenuLateral itensMenu={itens}>
            <Outlet/>
        </MenuLateral>
    )
}