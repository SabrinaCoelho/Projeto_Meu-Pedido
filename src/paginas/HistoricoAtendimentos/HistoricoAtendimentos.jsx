import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Typography } from '@mui/material';
import { useEffect, useState } from "react";
import axios from "axios";
import { useCadastroUsuarioContext } from "../../contexto/CadastroUsuario";
import ComandaFechadaModal from '../../componentes/ComandaFechadaModal/ComandaFechadaModal';

export const HistoricoAtendimentos = () => {
    /* const atendimentos = [
        {
            id: "",
            comanda: "1524",
            atendente: "Rohan",
            hora: "10:06:10",
            data: "10/05/2024",
            total: "30,00",
            itens: [
                {
                    nome: "Bolo de laranja",
                    descricao: "Bolo de laranja. Contém glútem, derivados de leite, ovos, e laranja.",
                    un: "1",
                    preco: "25,00",
                    ativo: "true"
                },
                {
                    nome: "Suco de laranja 400ml",
                    descricao: "Contém laranja.",
                    un: "1",
                    preco: "5,00",
                    ativo: "true"
                }
            ]
        },
        {
            id: "",
            comanda: "1894",
            atendente: "Jonas",
            hora: "22:30:10",
            data: "14/05/2024",
            total: "50,00",
            itens: [
                {
                    nome: "Bolo de laranja",
                    descricao: "Bolo de laranja. Contém glútem, derivados de leite, ovos, e laranja.",
                    un: "1",
                    preco: "25,00",
                    ativo: "true"
                },
                {
                    nome: "Suco de laranja 400ml",
                    descricao: "Contém laranja.",
                    un: "1",
                    preco: "5,00",
                    ativo: "true"
                }
            ]
        }
    ]
    const {
        comanda,
        setErros,
        setAtendente,
        setCliente,
        setMesa,
        setComandaId,
        setInicio,
        setTermino,
        submeterComanda
    } = useComandaContext()

    const iniciar = (event) => {
        event.preventDefault();
        console.log(comanda)
    }
    
    return (
        <Container style={{paddingBottom: "100px"}}>
            <Typography variant="h5" component="h1">
                Historico de atendimentos
            </Typography>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Comanda</TableCell>
                        <TableCell align="right">Atendente</TableCell>
                        <TableCell align="right">Cliente</TableCell>
                        <TableCell align="right">Mesa</TableCell>
                        <TableCell align="right">Inicio</TableCell>
                        <TableCell align="right">Término</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {atendimentos.map((atendimento) => (
                        <Row key={row.name} row={row} />
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    ) */
    
    const [carregando, setCarregando] = useState(true)
    const [comandas, setComandas] = useState(null)
    const usuarioEmail = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");
    
    const { 
        usuario
    } = useCadastroUsuarioContext()
    //Busca todos os atendimentos
    useEffect(
        () => {
            if(usuario.tipo === "cliente"){
                //axios.get("http://localhost:3001/api/atendimentos/"+usuario.email, {})//TODO - Mudar pro ID do cliente
                axios.get("http://localhost:3001/api/comandas-fechadas-cliente/"+usuario.id,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )//TODO - Mudar pro ID do cliente
                    .then(
                        res => {
                            // console.log(res.data);
                            const {comandas} = res.data;
                            setComandas(comandas);
                            setCarregando(false);
                        }
                    )
                    .catch(err => {//TODO
                        setCarregando(false)
                        console.log(err)
                    }

                )
            }else if(usuario.tipo === "atendente"){
                axios.get(`http://localhost:3001/api/comandas-fechadas-atendente/${usuario.id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                    .then(
                        res => {
                            // console.log(res.data);
                            const {comandas} = res.data;
                            setComandas(comandas);
                            setCarregando(false);
                        }
                    )
                    .catch(err => {//TODO
                        setCarregando(false)
                        console.log(err)
                    }

                )
            }else if(usuario.tipo === "restaurante"){
                axios.get(`http://localhost:3001/api/comandas-fechadas-restaurante/${usuario.id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                    .then(
                        res => {
                            console.log(res.data);
                            const {comandas} = res.data;
                            setComandas(comandas);
                            setCarregando(false);
                        }
                    )
                    .catch(err => {//TODO
                        setCarregando(false)
                        console.log(err)
                    }

                )
            }
            
        },[carregando]
    )
    return(
        <>
            {   comandas ? 
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>N°</TableCell>
                            <TableCell align="right">Cliente</TableCell>
                            <TableCell align="right">Ação</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {comandas.map((comanda) => (
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {comanda.comandaId}
                                </TableCell>
                                <TableCell align="right">{comanda.cliente}</TableCell>
                                <TableCell align="right">
                                    <ComandaFechadaModal comandaDados={comanda}/>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                : 
                <>
                    <Typography component="body">
                        Você ainda não possui comandas!
                    </Typography>
                </>
            }
        </>
    )
}