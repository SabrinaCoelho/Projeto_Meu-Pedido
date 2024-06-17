import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from "react"
import axios from 'axios';
import { useCadastroUsuarioContext } from '../../contexto/CadastroUsuario';


export default function ControlePedidos() {

    const usuarioEmail = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");
    
    const [carregando, setCarregando] = useState(true);
    const [comandas, setComandas] = useState([]);
    const {usuario} = useCadastroUsuarioContext();

    useEffect(
        () => {
            axios.get("http://localhost:3001/api/pedidos-abertos/"+usuario.id,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
                .then(
                    res => {
                        if(res && res.data){
                            console.log(res)
                            const { pedidos } = res.data;
                            setComandas(pedidos);
                        }
                        setCarregando(false)
                    }
                )
                .catch(err => {//TODO
                    alert(err.response.data.message)
                    setCarregando(false)
                })
        }, [carregando]
    );

    const atualizaEntregaPedido = (pedido, comanda) => {
        const { comandaId, restauranteId } = comanda;
        axios.put("http://localhost:3001/api/entrega-pedido/"+pedido.id, { comandaId, restauranteId, status: !pedido.entregue },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(
                res => {
                    if(res && res.data){
                        console.log(res)
                        alert(res.data.message)
                        setCarregando(true)
                    }
                }
            )
            .catch(err => {//TODO
                alert(err.response.data.message)
                setCarregando(false)
            })
    }
    return (
    <>
        <Typography component="h1" variant='h3'>
            Pedidos não entregues
        </Typography>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Pedido</TableCell>
                <TableCell align="right">Mesa</TableCell>
                <TableCell align="right">Comanda</TableCell>
                <TableCell align="right">Ação</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {comandas.map((comanda, i) => 
                    comanda.pedidos.map(
                        (pedido, j) => 
                            <TableRow
                                key={pedido.nome}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {pedido.nome}
                                </TableCell>
                                <TableCell align="right">{comanda.mesa}</TableCell>
                                <TableCell align="right">{comanda.comandaId}</TableCell>
                                <TableCell align="right">
                                    {
                                        pedido.entregue ?
                                        (<Button variant="outlined" onClick={()=> atualizaEntregaPedido(pedido, comanda)} size='small'>
                                            Cancelar entrega
                                        </Button>)
                                        :(<Button variant="contained" onClick={()=> atualizaEntregaPedido(pedido, comanda)}>
                                            Entregar
                                        </Button>)
                                    }
                                </TableCell>
                            </TableRow>
                    )
                )}
            </TableBody>
        </Table>
        </TableContainer>
    </>
  );
}