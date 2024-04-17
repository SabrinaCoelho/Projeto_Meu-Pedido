import { Container, Col, Row } from "react-grid-system"
import { CampoTexto } from "../../componentes/CampoTexto/CampoTexto"
import { useLoginContext } from "../../contexto/Login"
import { Botao } from "../../componentes/Botao/Botao"
import { WrapperConteudo } from "../../componentes/WrapperConteudo/WrapperConteudo"
import { useComandaContext } from "../../contexto/Comanda"
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';

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
        setComandaID,
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
    return(
        <Typography variant="h1" component="h1">
            Em construção
        </Typography>
    )
}