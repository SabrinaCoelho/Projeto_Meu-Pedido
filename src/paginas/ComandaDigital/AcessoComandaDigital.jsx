import { Container, Col, Row } from "react-grid-system"
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useComandaContext } from "../../contexto/Comanda"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useCadastroUsuarioContext } from "../../contexto/CadastroUsuario"
import { useEffect, useState } from "react";
import { ComandaDigital } from "./ComandaDigital";

export const AcessoComandaDigital = () => {

    const usuarioEmail = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");
    
    const {
        comanda,
        setComandaId,
        setAtendenteId,
        setCodigo,
        setAtendenteNome,
        setCliente,
        setInicio,
        setMesa,
        setPedidos,
        setRestauranteId,
        setTermino,
        setTotal,
        setStatus
    } = useComandaContext()

    const { 
        usuario
    } = useCadastroUsuarioContext()

    const navegar = useNavigate()
    const [carregando, setCarregando] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [pesquisa, setPesquisa] = useState([]);
    const [ comandaDaVez, setComandaDaVez ] = useState(null);
    useEffect(
        () => {
            axios.get("http://localhost:3001/api/comandas-abertas-cliente/"+usuario.id,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
                .then(
                    res => {
                        if(res && res.data){
                            console.log(res.data)
                            setPesquisa(res.data.comandas)
                        }
                        setCarregando(false)
                    }
                )
                .catch(err => {//TODO
                    setCarregando(false)
                    console.log("NAO deu certo")
                }

            )
        }, [carregando]
    );
    //Busca comanda selecionada
    useEffect(
        () => {
            if(inputValue){
                console.log(inputValue)
                axios.get("http://localhost:3001/api/comandas/"+inputValue,
                    {//Revisar
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                    .then(
                        res => {
                            const { comandaId, atendenteNome, codigo, atendenteId, cliente, mesa, inicio,termino, restauranteId, pedidos, total, status } = res.data.comanda;
                            setAtendenteId(atendenteId);
                            setAtendenteNome(atendenteNome);
                            setCliente(cliente);
                            setMesa(mesa);
                            setComandaId(comandaId);
                            setInicio(inicio);
                            setTermino(termino);
                            setRestauranteId(restauranteId);
                            setPedidos(pedidos);
                            setStatus(status);
                            setCodigo(codigo);
                            setTotal(total);
                            setComandaDaVez(comanda);
                            setCarregando(false)
                        }
                    )
                    .catch(err => {//TODO
                        setCarregando(false)
                        console.log(err)
                    }

                )
            }
        },[inputValue]
    )
    const acessar = (event) => {
        event.preventDefault();
        if(usuario.id){
            console.log("tem usuario")
            axios.get("http://localhost:3001/api/comandas/"+comanda.comandaId,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )//TODO NO BACK
                .then(
                    res => {
                        console.log("OK, CHAOS!")
                        if(res && res.data){
                            let { comandaId, atendenteId, atendenteNome, cliente, inicio, mesa, restauranteId, termino, total, pedidos} = res.data.comanda;
                            console.log(res.data.comanda);
                            setComandaId(comandaId)
                            setAtendenteId(atendenteId)
                            setAtendenteNome(atendenteNome)
                            setCliente(cliente)
                            setInicio(inicio)
                            setMesa(mesa)
                            //setPedidos(pedidos)
                            setRestauranteId(restauranteId)
                            setTermino(termino)
                            setTotal(total)
                            console.log(restauranteId)
                            console.log({
                                comandaId: comandaId,
                                usuarioId: usuario.id,
                                restauranteId: restauranteId
                            })
                            
                            navegar("/perfil/comanda-digital")
                        }
                    }
                )
                .catch(err => {//TODO
                    console.log("NAO deu certo")
                }

            )
        }else if(!usuario.id && comanda.comandaId && comanda.codigo){
            const {comandaId, codigo} = comanda;
            axios.post("http://localhost:3001/api/comandas/cliente-sem-cadastro", {comandaId, codigo})
                .then(
                    res => {
                        if(res && res.data){
                            if(res && res.data){
                                let { comandaId, atendenteId, atendenteNome, cliente, inicio, mesa, restauranteId, termino, total, pedidos} = res.data.comanda;
                                // console.log(res.data.comanda);
                                setComandaId(comandaId)
                                setAtendenteId(atendenteId)
                                setAtendenteNome(atendenteNome)
                                setCliente(cliente)
                                setInicio(inicio)
                                setMesa(mesa)
                                setPedidos(pedidos)
                                setRestauranteId(restauranteId)
                                setTermino(termino)
                                setTotal(total)
                                /* console.log(restauranteId)
                                console.log({
                                    comandaId: comandaId,
                                    usuarioId: usuario.id,
                                    restauranteId: restauranteId
                                }) */
                                
                                navegar("/comanda-digital")
                            }
                        }
                    }
                )
                .catch(err => {//TODO
                    console.log("NAO deu certo")
                }

            )
        }
    }
    const handleChange = ({target}) => {
        setInputValue(target.value);
    };
    return (
        <Container>
            <form onSubmit={acessar}>
                {
                    !usuario.id?
                    <Row justify="center" >
                        <Col xxxl={6} xxl={6} xl={6} lg={6} md={8} sm={12}>
                            <Row>
                                <Col>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="Digite o n° da comanda"
                                        onChange={({target}) => setComandaId(target.value)}
                                        type="text"
                                        size="small"
                                        margin="dense"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <TextField
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="Código"
                                        onChange={({target}) => setCodigo(target.value)}
                                        onBlur={({target}) => setCodigo(target.value)}
                                        type="text"
                                        size="small"
                                        margin="dense"
                                    />
                                </Col>
                            </Row>
                            <Row justify="center">
                                <Button variant="contained" type="submit">
                                    Acessar comanda
                                </Button>
                            </Row>
                        </Col>
                    </Row>:
                    <div>{/* {`inputValue: '${inputValue}'`} */}
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Pesquisar</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={inputValue}
                                    label="Comandas"
                                    onChange={handleChange}
                                    >
                                        {
                                            pesquisa.map((e, i) => (
                                                <MenuItem key={i} value={e.comandaId}>{e.label}</MenuItem>
                                            ))
                                        }
                                </Select>
                            </FormControl>
                            </Box>
                        {
                            comandaDaVez ? 
                            (<ComandaDigital/>):
                            (<></>)
                        }
                    </div>
                }
                
            </form>
        </Container>
    )
}