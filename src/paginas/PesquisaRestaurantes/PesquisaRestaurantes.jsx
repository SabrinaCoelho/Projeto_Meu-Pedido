/* import { Container, Col, Row } from "react-grid-system"
import { CampoTexto } from "../../componentes/CampoTexto/CampoTexto"
import { useAtendimentoContext } from "../../contexto/Atendimento"
import { Botao } from "../../componentes/Botao/Botao"
import { useEffect, useState } from "react"
import { TextField, Button } from "@mui/material"
import axios from "axios"

export const PesquisarRestaurantes = () => {
    const [pesquisa, setPesquisa] = useState("")

    const pesquisar = (event) => {
        event.preventDefault();
        console.log(pesquisa)
        axios.get("http://localhost:3001/restaurantes/"+pesquisa, {})
            .then(
                res => {
                    console.log("OK, CHAOS!")
                    console.log(res);
                    
                }
            )
            .catch(err => {//TODO
                console.log("NAO deu certo")
            }

        )
    }
    // useEffect(
    //     () => {
    //         axios.get("http://localhost:3001/restaurantes", {pesquisa})
    //             .then(
    //                 res => {
    //                     console.log("OK, CHAOS!")
    //                     console.log(res);
                        
    //                 }
    //             )
    //             .catch(err => {//TODO
    //                 console.log("NAO deu certo")
    //             }

    //         )
    //     },[pesquisa]
    // )
    
    return (
        <Container style={{margin: "80px"}}>
            <form onSubmit={pesquisar}>
                <Row justify="center" align="center">
                    <Col xxl={8} xl={8} lg={8} md={8} sm={12}>
                        <TextField
                            fullWidth
                            required
                            id="outlined-required"
                            label="Nome do restaurante ou ID"
                            defaultValue=""
                            onChange={({target}) => setPesquisa(target.value)}
                            size="small"
                            margin="dense"
                        />
                    </Col>
                    <Col justify="right" xxl={2} xl={2} lg={2} md={2} sm={12}>
                        <Button variant="contained" type="submit">
                            Pesquisar
                        </Button>
                    </Col>
                </Row>
            </form>
        </Container>
    )
} */

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PerfilPublico } from '../../componentes/PerfilPublico/PerfilPublico';

export const PesquisarRestaurantes = () => {
    const [pesquisa, setPesquisa] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [inputValue, setInputValue] = useState('');
    const [restauranteDados, setRestauranteDados] = useState({});

    useEffect(
        () => {
            axios.get("http://localhost:3001/restaurantes", {})
                .then(
                    res => {
                        console.log("OK, CHAOS!")
                        console.log(res.data);
                        setCarregando(false)
                        setPesquisa(res.data)
                    }
                )
                .catch(err => {//TODO
                    setCarregando(false)
                    console.log("NAO deu certo")
                }

            )
        },[carregando]
    )
    useEffect(
        () => {
            axios.get("http://localhost:3001/restaurantes/"+inputValue, {})
                .then(
                    res => {
                        console.log("OK, CHAOS!")
                        console.log(res.data._id);
                        setRestauranteDados(res.data)
                    }
                )
                .catch(err => {//TODO
                    setCarregando(false)
                    console.log("NAO deu certo")
                }

            )
        },[inputValue]
    )
    
  return (
    <>
        <div>{`inputValue: '${inputValue}'`}</div>
        <Autocomplete
            size="small"
            margin="dense"
            disablePortal
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            id="combo-box-demo"
            options={pesquisa}
            renderInput={(params) => <TextField {...params} label="Restaurante"
            />}
        />
        {
            Object.keys(restauranteDados).length ? (<PerfilPublico restauranteDados={restauranteDados}/>) : (<></>)
        }
    </>
  );
}
