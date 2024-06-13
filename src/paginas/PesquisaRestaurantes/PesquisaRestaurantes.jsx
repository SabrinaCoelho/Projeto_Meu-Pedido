import axios from 'axios';
import { useEffect, useState } from 'react';
import { PerfilPublico } from '../../componentes/PerfilPublico/PerfilPublico';
import { useLocation, useParams } from 'react-router-dom';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const PesquisarRestaurantes = () => {
    const [pesquisa, setPesquisa] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [inputValue, setInputValue] = useState('');
    const [restauranteDados, setRestauranteDados] = useState(null);
    
    const { restauranteId } = useParams();
    const {pathname} = useLocation()

    //Busca todos os restaurantes
    useEffect(
        () => {
            // console.log(pathname)
            // console.log(restauranteId)
            axios.get("http://localhost:3001/api/restaurantes", {})
                .then(
                    res => {
                        console.log("OK, CHAOS!")
                        console.log(res.data.restaurantes);
                        setCarregando(false)
                        setPesquisa(res.data.restaurantes)
                    }
                )
                .catch(err => {//TODO
                    setCarregando(false)
                    console.log("NAO deu certo")
                }

            )
        },[carregando]
    )
    //Busca restaurante selecionado
    useEffect(
        () => {
            console.log(inputValue)
            if(restauranteId){
                console.log(restauranteId)
                axios.get("http://localhost:3001/api/restaurantes/"+restauranteId, {})
                    .then(
                        res => {
                            console.log("OK, CHAOS!")
                            console.log(res.data);
                            setRestauranteDados(res.data)
                        }
                    )
                    .catch(err => {//TODO
                        setCarregando(false)
                        console.log("NAO deu certo")
                    }

                )
            }else if(inputValue){
                axios.get("http://localhost:3001/api/restaurantes/"+inputValue, {})
                    .then(
                        res => {
                            if(res && res.data){
                                const {restaurante} = res.data;
                                setRestauranteDados(restaurante)
                                console.log(restaurante)
                            }
                            setCarregando(false)
                        }
                    )
                    .catch(err => {//TODO
                        alert(err.message)
                        setCarregando(false)
                    }

                )
            }
            
        },[inputValue]
    )

    const handleChange = ({target}) => {
        setInputValue(target.value);
    };
    return !restauranteId ? (
        <>
            <div>{`inputValue: '${inputValue}'`}
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Restaurante</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={inputValue}
                            label="Restaurante"
                            size="small"
                            onChange={handleChange}
                            >
                            {
                                pesquisa.map((e,i) => (
                                    <MenuItem key={i} value={e.id}>{e.label}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Box>
                {
                    restauranteDados && inputValue ? 
                    (<PerfilPublico restauranteDados={restauranteDados}/>):
                    (<></>)
                }
            </div>
        </>): 
        (
            <>
                <PerfilPublico restauranteDados={restauranteDados}/> 
            </>
        )
        ;
}
