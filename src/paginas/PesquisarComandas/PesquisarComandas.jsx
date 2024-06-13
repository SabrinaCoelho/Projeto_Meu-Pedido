import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useCadastroUsuarioContext } from '../../contexto/CadastroUsuario';
import { useComandaContext } from '../../contexto/Comanda';
import { ComandaDigital } from '../ComandaDigital/ComandaDigital';

export const PesquisarComandas = () => {
    const [pesquisa, setPesquisa] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [inputValue, setInputValue] = useState('');
    const [ comandaDaVez, setComandaDaVez ] = useState(null);
    
    //const [restauranteDados, setRestauranteDados] = useState({});
    
    //const { restauranteId } = useParams();//TODO ???? OU VEM DO USUARIO?
    const { 
        usuario
    } = useCadastroUsuarioContext();

    const {
        comanda,
        setAtendenteId,
        setAtendenteNome,
        setCliente,
        setMesa,
        setComandaId,
        setInicio,
        setTermino,
        setRestauranteId,
        setPedidos,
        setStatus,
        setTotal
    } = useComandaContext()

    const {pathname} = useLocation();

    //Busca todos as comandas abertas
    useEffect(
        () => {
            axios.get("http://localhost:3001/api/comandas-abertas/"+usuario.restauranteId, {})
                .then(
                    res => {
                        if(res && res.data){
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
        },[carregando]
    )
    //Busca comanda selecionada
    useEffect(
        () => {
            if(inputValue){
                console.log(inputValue)
                axios.get("http://localhost:3001/api/comandas/"+inputValue, {})
                    .then(
                        res => {
                            console.log("OK, CHAOS!")
                            const { comandaId, atendenteNome, atendenteId, cliente, mesa, inicio,termino, restauranteId, pedidos, total, status } = res.data.comanda;
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

    const handleChange = ({target}) => {
        setInputValue(target.value);
    };
    return <>
        <div>{/* {`inputValue: '${inputValue}'`} */}
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Comandas abertas</InputLabel>
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
    </>
}
