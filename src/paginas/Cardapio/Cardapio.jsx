import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, TextField, ListItem, List, ListItemText, Divider, Button } from '@mui/material';
import { Col, Row } from "react-grid-system"
import { useProdutoContext } from "../../contexto/Produto"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { GrupoRadio } from '../../componentes/Radio/GrupoRadio';
import { useCadastroUsuarioContext } from '../../contexto/CadastroUsuario';
import { useComandaContext } from '../../contexto/Comanda';
import { useSocketContext } from '../../contexto/Socket';
import { useNavigate } from 'react-router-dom';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export const Cardapio = ({restauranteId}) => {
    const {socket} = useSocketContext();

    const {
        produto,
        setRestauranteId,
        setNome,
        setDescricao,
        setPreco,
        setCategoria,
        submeterProduto
    } = useProdutoContext();

    const { 
        comanda
     } = useComandaContext();

    const { 
        usuario, 
    } = useCadastroUsuarioContext()

    const [expanded, setExpanded] = useState('panel1');
    const [carregando, setCarregando] = useState(true)
    const [cardapio, setCardapio] = useState(null)
    const [ pedidos, setPedidos ] = useState([]);
    const [ totalPedidos, setTotalPedidos ] = useState(comanda.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    const navegar = useNavigate();

    useEffect(
        () => {
            if(restauranteId){
                axios.get("http://localhost:3001/api/produtos/"+restauranteId, {})
                .then(
                    res => {
                        // console.log(res.data.produtos)
                        if(res.data && res.data.produtos){//TO DO URG
                            setCardapio(res.data.produtos);
                        }
                        setCarregando(false)
                    }
                )
                .catch(err => {//TODO
                    console.log("NAO deu certo")
                    setCarregando(false)
                }) 
            }else if(usuario.tipo === "restaurante"){
                setRestauranteId(usuario.id)
                axios.get("http://localhost:3001/api/produtos/"+usuario.id, {})
                .then(
                    res => {
                        console.log(res.data.produtos)
                        if(res.data && res.data.produtos){//TO DO URG
                            setCardapio(res.data.produtos);
                        }
                        setCarregando(false)
                    }
                )
                .catch(err => {//TODO
                    console.log("NAO deu certo")
                    setCarregando(false)
                }) 
            }
        }, [carregando, restauranteId]
    )

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const opcoes = [
        {
            valor: "doce",
            label: 'Doce',
        },
        {
            valor: "salgado",
            label: 'Salgado',
        },
        {
            valor: "bebida",
            label: 'Bebida',
        }
    ]
    
    const submeterPedido = (event) => {
        pedidos.map(
            e => {
                delete e.selecionado
                delete e.id
                delete e._id
                delete e.restauranteId
                delete e.avaliacao
                e.data = new Date()
                e.atendente = usuario.tipo === "cliente" ? "autoatendimento": usuario.nome
                return e
            }
        )
        const pedido = {
            comandaId: comanda.comandaId,
            pedidos,
            total: totalPedidos
        }

        let {comandaId, restauranteId} = comanda;
        console.log(pedido)
        if(comanda && comandaId && restauranteId){
            axios.post("http://localhost:3001/api/pedidos", {pedido})
                .then(
                    res => {
                        if(res && res.data){
                            console.log(res);
                            if(usuario.tipo === "atendente"){
                                socket.emit('comanda_atualizada', {//Cliente escuta
                                    comandaId: comanda.comandaId,
                                    restauranteId: comanda.restauranteId
                                });
                                socket.emit('novo_pedido', {//Restaurante escuta
                                    comandaId: comanda.comandaId,
                                    restauranteId: comanda.restauranteId
                                });
                            }else{//Feito pelo cliente -> restaurante escuta
                                socket.emit('novo_pedido', {
                                    comandaId: comanda.comandaId,
                                    restauranteId: comanda.restauranteId
                                });
                            }
                            navegar("/perfil/comanda-digital");
                        }
                    }
                )
                .catch(err => {//TODO
                    console.log("NAO deu certo")
                }

            )
        }else{
            alert("Erro ao enviar seu pedido.")
        }
    }
    const chamaAtendente = () => {
        socket.emit("chama_atendente", {restauranteId: comanda.restauranteId, mesa: comanda.mesa});
    }
    const pedir = (item) => {
        let [,total] = totalPedidos.split(/\s/);
        total = parseFloat(total.replace(/,/, '.'));
        setPedidos([...pedidos, item])
        for(let j = 0; j < cardapio.length; j++){
            //Encontra index do prod a alterar
            if(cardapio[j]._id === item._id){
                let produtoSelecionado = cardapio[j];
                produtoSelecionado.selecionado = true;
                //Fortamata o preco do produto e multiplica pela unidade
                let preco = parseFloat(produtoSelecionado.preco.replace(/,/, '.')) * parseInt(produtoSelecionado.un);
                //Adiciona ao valor total atual
                total += preco;
                //Formata para R$
                let totalFormatado = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                //Plota
                setTotalPedidos(totalFormatado)
                break;
            }
        }
        setCardapio(cardapio);
    }
    const cancelar = (item) => {
        //encontra o INDICE do objeto
        let encontrado;
        for(let i = 0; i < pedidos.length; i++){
            if(pedidos[i]._id === item._id){
                encontrado = i;
                console.log(cardapio[i])
                break;
            }
        }
        //remove
        pedidos.splice(encontrado, 1)
        //Pega o valor
        let [,total] = totalPedidos.split(/\s/);
        //Formata
        total = parseFloat(total.replace(/,/, '.'));
        for(let j = 0; j < cardapio.length; j++){
            //Encontra index do prod a alterar
            if(cardapio[j]._id === item._id){
                let produtoSelecionado = cardapio[j];
                produtoSelecionado.selecionado = false;
                //Fortamata o preco do produto e multiplica pela unidade
                let preco = parseFloat(produtoSelecionado.preco.replace(/,/, '.')) * parseInt(produtoSelecionado.un);
                //Subtrai do valor total atual
                total -= preco;
                let totalFormatado = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                produtoSelecionado.un = 0;
                setTotalPedidos(totalFormatado)
                
                break;
            }
        }
        setCardapio([...cardapio]);
        setPedidos([...pedidos])
    }
    const submeter = (event) => {//Cadastro de produtos
        event.preventDefault()
        event.target.reset();
        console.log(produto)
        setDescricao("")//TODO - qnd reseto o form, aqui nao ta refletindo. pra grupo radio tbm nao esta
        //submeterProduto(produto)
        axios.post("http://localhost:3001/api/produtos", {produto})
            .then(
                res => {
                    alert(res.data.message)
                }
            )
            .catch(err => {//TODO
                console.log(err);
                console.log("NAO deu certo")
            })
            .finally(
                () => {
                    axios.get("http://localhost:3001/api/produtos/"+usuario.id, {})
                        .then(
                            res => {
                                if(res && res.data){
                                    setCardapio(res.data.produtos);
                                }
                                setCarregando(false)
                            }
                        )
                        .catch(err => {//TODO
                            console.log("NAO deu certo")
                            setCarregando(false)
                        }
                    )
                }
            )
        
    }

  return (
    <>
        <Typography component="h1" variant="h3">
            Cardápio
        </Typography>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Salgados</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <List>
                {
                    cardapio ? cardapio.map(
                        (item, i) => 
                            item.categoria === "salgado"?
                            (<>
                                <ListItem disablePadding key={i}>
                                    <ListItemText 
                                        primary={item.nome}
                                        secondary={
                                            <div>
                                                <Row>
                                                    <Col xxxl={8} xxl={8} xl={8} lg={8} md={12} sm={12}>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body"
                                                            color="text.primary"
                                                        >
                                                            {item.descricao}
                                                        </Typography>
                                                    </Col>
                                                    <Col xxxl={4} xxl={4} xl={4} lg={4} md={12} sm={12} textAlign="right">
                                                        <Typography
                                                            sx={{ textAlign: "end" }}
                                                            component="p"
                                                            variant="body"
                                                            color="text.primary"
                                                        >
                                                            R${item.preco}
                                                        </Typography>
                                                    </Col>
                                                </Row>
                                                {
                                                    usuario.tipo !== "restaurante" && comanda.comandaId && comanda.restauranteId === restauranteId? (
                                                        <Box component="div" sx={{ my: 2, display: "flex", justifyContent: "right" }}>
                                                            <TextField
                                                                fullWidth
                                                                required
                                                                id="outlined-required"
                                                                label="Un"
                                                                defaultValue={item.un}
                                                                onChange={({target}) => {
                                                                    console.log(target.value)
                                                                    for(let j = 0; j < cardapio.length; j++){
                                                                        //Encontra index do prod a alterar
                                                                        if(cardapio[j]._id === item._id){
                                                                            //add prop
                                                                            cardapio[j].un = target.value
                                                                            break;
                                                                        }
                                                                    }
                                                                    setCardapio(cardapio);
                                                                }}
                                                                type="number"
                                                                size="small"
                                                                margin="dense"
                                                            />
                                                            {
                                                                item && item?.selecionado ? 
                                                                (<Button variant="outlined" size="small" onClick={() => cancelar(item)}>
                                                                    Cancelar
                                                                </Button>):
                                                                (
                                                                    <Button variant="outlined" size="small" onClick={() => pedir(item)}>
                                                                        Pedir
                                                                    </Button>
                                                                )
                                                            }
                                                        </Box>
                                                    ): usuario.id && usuario.tipo === "restaurante"? (
                                                        <Box component="div" sx={{ my: 2, display: "flex", justifyContent: "right" }}>
                                                            <Button variant="outlined" size="small" sx={{mx: 1}} onClick={
                                                                () => {
                                                                    console.log(item)
                                                                    if(window.confirm(`Tem certeza que deseja apagar ${item.nome}?`)){
                                                                        axios.delete("http://localhost:3001/api/produtos/"+item._id)
                                                                            .then(
                                                                                res => {
                                                                                    console.log(res)
                                                                                }
                                                                            )
                                                                            .catch(
                                                                                err => console.log(err)
                                                                            )
                                                                            .finally(
                                                                                () => {
                                                                                    axios.get("http://localhost:3001/api/produtos/"+usuario.id, {})
                                                                                        .then(
                                                                                            res => {
                                                                                                if(res && res.data){
                                                                                                    setCardapio(res.data.produtos);
                                                                                                }
                                                                                                setCarregando(false)
                                                                                            }
                                                                                        )
                                                                                        .catch(err => {//TODO
                                                                                            console.log("NAO deu certo")
                                                                                            setCarregando(false)
                                                                                        }
                                                                                    )
                                                                                }
                                                                            )
                                                                    }
                                                                }
                                                                }>
                                                                Apagar
                                                            </Button>
                                                            <Button variant="outlined" size="small" sx={{mx: 1}} onClick={
                                                                () => {//SEM SUPORTE NA API
                                                                    console.log(item)
                                                                    axios.put("http://localhost:3001/api/produtos/"+item._id)
                                                                        .then(
                                                                            res => {
                                                                                console.log(res)
                                                                            }
                                                                        )
                                                                        .catch(
                                                                            err => console.log(err)
                                                                        )
                                                                        .finally(
                                                                            () => {
                                                                                axios.get("http://localhost:3001/api/produtos/"+usuario.id, {})
                                                                                    .then(
                                                                                        res => {
                                                                                            if(res && res.data){
                                                                                                setCardapio(res.data.produtos);
                                                                                            }
                                                                                            setCarregando(false)
                                                                                        }
                                                                                    )
                                                                                    .catch(err => {//TODO
                                                                                        console.log("NAO deu certo")
                                                                                        setCarregando(false)
                                                                                    }
                                                                                )
                                                                            }
                                                                        )
                                                                }
                                                                }>
                                                                Desativar
                                                            </Button>
                                                            <Button variant="contained" size="small" sx={{mx: 1}} onClick={
                                                                    () => {//SEM SUPORTE NA API
                                                                        axios.put("http://localhost:3001/api/produtos/editar"+item._id)
                                                                            .then(
                                                                                res => {
                                                                                    console.log(res)
                                                                                }
                                                                            )
                                                                            .catch(
                                                                                err => console.log(err)
                                                                            )
                                                                            .finally(
                                                                                () => {
                                                                                    axios.get("http://localhost:3001/api/produtos/"+usuario.id, {})
                                                                                        .then(
                                                                                            res => {
                                                                                                if(res && res.data){
                                                                                                    setCardapio(res.data.produtos);
                                                                                                }
                                                                                                setCarregando(false)
                                                                                            }
                                                                                        )
                                                                                        .catch(err => {//TODO
                                                                                            console.log("NAO deu certo")
                                                                                            setCarregando(false)
                                                                                        }
                                                                                    )
                                                                                }
                                                                            )
                                                                    }
                                                                }>
                                                                Editar
                                                            </Button>
                                                        </Box>
                                                    ): null
                                                }
                                            </div>
                                        }
                                        />
                                    </ListItem>
                                <Divider/>
                            </>)
                            :<></>
                    ): null
                }
            </List>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Doces</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <List>
                {
                    cardapio ? cardapio.map(
                        (item, i) => 
                            item.categoria === "doce"?
                            (<>
                                <ListItem disablePadding key={i}>
                                    <ListItemText 
                                        primary={item.nome}
                                        secondary={
                                            <div>
                                                <Row>
                                                    <Col xxxl={8} xxl={8} xl={8} lg={8} md={12} sm={12}>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body"
                                                            color="text.primary"
                                                        >
                                                            {item.descricao}
                                                        </Typography>
                                                    </Col>
                                                    <Col xxxl={4} xxl={4} xl={4} lg={4} md={12} sm={12} textAlign="right">
                                                        <Typography
                                                            sx={{ textAlign: "end" }}
                                                            component="p"
                                                            variant="body"
                                                            color="text.primary"
                                                        >
                                                            R${item.preco}
                                                        </Typography>
                                                    </Col>
                                                </Row>
                                                {
                                                    usuario.tipo !== "restaurante" && comanda.comandaId && comanda.restauranteId === restauranteId ? (
                                                        <Box component="div" sx={{ my: 2, display: "flex", justifyContent: "right" }}>
                                                            <TextField
                                                                fullWidth
                                                                required
                                                                id="outlined-required"
                                                                label="Un"
                                                                defaultValue={0}
                                                                onChange={({target}) => {
                                                                    for(let j = 0; j < cardapio.length; j++){
                                                                        //Encontra index do prod a alterar
                                                                        if(cardapio[j]._id === item._id){
                                                                            //add prop
                                                                            cardapio[j].un = target.value
                                                                            break;
                                                                        }
                                                                    }
                                                                    setCardapio(cardapio);
                                                                }}
                                                                type="number"
                                                                size="small"
                                                                margin="dense"
                                                            />
                                                            {
                                                                item && item?.selecionado ? 
                                                                (<Button variant="outlined" size="small" onClick={
                                                                    () => {
                                                                        //encontra o INDICE do objeto
                                                                        let encontrado;
                                                                        for(let i = 0; i < pedidos.length; i++){
                                                                            if(pedidos[i]._id === item._id){
                                                                                encontrado = i;
                                                                                console.log(cardapio[i])
                                                                                break;
                                                                            }
                                                                        }
                                                                        console.log(encontrado)
                                                                        //remove
                                                                        pedidos.splice(encontrado, 1)
                                                                        //atualiza
                                                                        for(let j = 0; j < cardapio.length; j++){
                                                                            //Encontra index do prod a alterar
                                                                            if(cardapio[j]._id === item._id){
                                                                                cardapio[j].selecionado = false
                                                                                break;
                                                                            }
                                                                        }
                                                                        setCardapio(cardapio);
                                                                        setPedidos([...pedidos])
                                                                    }
                                                                    }>
                                                                    Cancelar
                                                                </Button>):
                                                                (
                                                                    <Button variant="outlined" size="small" onClick={() => pedir(item)}>
                                                                        Pedir
                                                                    </Button>
                                                                )
                                                            }
                                                        </Box>
                                                    ): usuario.id && usuario.tipo === "restaurante" ? (
                                                        <Box component="div" sx={{ my: 2, display: "flex", justifyContent: "right" }}>
                                                            <Button variant="outlined" size="small" sx={{mx: 1}} onClick={() => cancelar(item)}>
                                                                Apagar
                                                            </Button>
                                                            <Button variant="outlined" size="small" sx={{mx: 1}} onClick={
                                                                () => {
                                                                    console.log(`Desativa ${item.nome}`)
                                                                }
                                                                }>
                                                                Desativar
                                                            </Button>
                                                            <Button variant="contained" size="small" sx={{mx: 1}} onClick={
                                                                () => {
                                                                    console.log(`Edita ${item.nome}`)
                                                                    //abre modal e carrega produto?
                                                                }
                                                                }>
                                                                Editar
                                                            </Button>
                                                        </Box>
                                                    ):null
                                                }
                                            </div>
                                        }
                                        />
                                    </ListItem>
                                <Divider/>
                            </>)
                            :<></>
                    ): null
                }
            </List>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Bebidas</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <List>
                {
                    cardapio ? cardapio.map(
                        (item, i) => 
                            item.categoria === "bebida"?
                            (<>
                                <ListItem disablePadding key={i}>
                                    <ListItemText 
                                        primary={item.nome}
                                        secondary={
                                            <div>
                                                <Row>
                                                    <Col xxxl={8} xxl={8} xl={8} lg={8} md={12} sm={12}>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body"
                                                            color="text.primary"
                                                        >
                                                            {item.descricao}
                                                        </Typography>
                                                    </Col>
                                                    <Col xxxl={4} xxl={4} xl={4} lg={4} md={12} sm={12} textAlign="right">
                                                        <Typography
                                                            sx={{ textAlign: "end" }}
                                                            component="p"
                                                            variant="body"
                                                            color="text.primary"
                                                        >
                                                            R${item.preco}
                                                        </Typography>
                                                    </Col>
                                                </Row>
                                                {
                                                    usuario.tipo !== "restaurante" && comanda.comandaId && comanda.restauranteId === restauranteId ? (
                                                        <Box component="div" sx={{ my: 2, display: "flex", justifyContent: "right" }}>
                                                            <TextField
                                                                fullWidth
                                                                required
                                                                id="outlined-required"
                                                                label="Un"
                                                                defaultValue={0}
                                                                onChange={({target}) => {
                                                                    for(let j = 0; j < cardapio.length; j++){
                                                                        //Encontra index do prod a alterar
                                                                        if(cardapio[j]._id === item._id){
                                                                            //add prop
                                                                            cardapio[j].un = target.value
                                                                            break;
                                                                        }
                                                                    }
                                                                    setCardapio(cardapio);
                                                                }}
                                                                type="number"
                                                                size="small"
                                                                margin="dense"
                                                            />
                                                            {
                                                                item && item?.selecionado ? 
                                                                (<Button variant="outlined" size="small" onClick={() => cancelar(item)}>
                                                                    Cancelar
                                                                </Button>):
                                                                (
                                                                    <Button variant="outlined" size="small" onClick={() => pedir(item)}>
                                                                        Pedir
                                                                    </Button>
                                                                )
                                                            }
                                                        </Box>
                                                    ): usuario.id && usuario.tipo === "restaurante" ? (
                                                        <Box component="div" sx={{ my: 2, display: "flex", justifyContent: "right" }}>
                                                            <Button variant="outlined" size="small" sx={{mx: 1}} onClick={
                                                                () => {
                                                                    console.log(item)
                                                                    if(window.confirm(`Tem certeza que deseja apagar ${item.nome}?`)){
                                                                        axios.delete("http://localhost:3001/api/produtos/"+item._id)
                                                                            .then(
                                                                                res => {
                                                                                    console.log(res)
                                                                                }
                                                                            )
                                                                            .catch(
                                                                                err => console.log(err)
                                                                            )
                                                                    }
                                                                }
                                                                }>
                                                                Apagar
                                                            </Button>
                                                            <Button variant="outlined" size="small" sx={{mx: 1}} onClick={
                                                                () => {
                                                                    console.log(`Desativa ${item.nome}`)
                                                                }
                                                                }>
                                                                Desativar
                                                            </Button>
                                                            <Button variant="contained" size="small" sx={{mx: 1}} onClick={
                                                                () => {
                                                                    console.log(`Edita ${item.nome}`)
                                                                    //abre modal e carrega produto?
                                                                }
                                                                }>
                                                                Editar
                                                            </Button>
                                                        </Box>
                                                    ) : null
                                                }
                                            </div>
                                        }
                                        />
                                    </ListItem>
                                <Divider/>
                            </>)
                            :<></>
                    ): null
                }
            </List>
        </AccordionDetails>
        </Accordion>
        <div>
            {
                pedidos.map(
                    e => (
                        <Typography variant="body" component="body">
                            {e.nome}
                        </Typography>
                    )
                )
            }
        </div>
        {
            usuario.tipo === "restaurante" ? (
                <form style={{margin: "1.2rem 0"}} onSubmit={submeter}>
                    <Typography variant='h3' component="h1">
                        Adicionar
                    </Typography>
                    <Row>
                        <Col>
                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="Nome"
                                defaultValue={produto.nome}
                                onChange={({target}) => setNome(target.value)}
                                onBlur={({target}) => setNome(target.value)}
                                size="small"
                                margin="dense"
                            />
                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="Descrição"
                                defaultValue={produto.descricao}
                                onChange={({target}) => setDescricao(target.value)}
                                onBlur={({target}) => setDescricao(target.value)}
                                size="small"
                                multiline
                                rows={4}
                                margin="dense"
                            />
                        </Col>
                        <Col>
                            <TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="Preço"
                                defaultValue={produto.preco}
                                onChange={({target}) => setPreco(target.value)}
                                onBlur={({target}) => setPreco(target.value)}
                                size="small"
                                margin="dense"
                            />
                            <GrupoRadio 
                                opcoes={opcoes}  
                                onChange={setCategoria} 
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="contained" type='submit'>
                                Adicionar produto
                            </Button>
                        </Col>
                    </Row>
                </form>
            ):(
                <></>
            )
        }
        {
            usuario.tipo !== "restaurante" && comanda.comandaId && comanda.restauranteId === restauranteId ? (
                <>
                    <div>
                        <Typography variant="h3" component="h1">
                            Revisar pedido
                        </Typography>
                        {
                            pedidos.map(
                                e => (
                                    <Row>
                                        <Col>
                                            <Typography>
                                                {e.nome}
                                            </Typography>
                                        </Col>
                                        <Col>
                                            <Typography>
                                                {e.preco}
                                            </Typography>
                                        </Col>
                                        <Col>
                                            <Typography>
                                                {e.un}
                                            </Typography>
                                        </Col>
                                    </Row>
                                )
                            )
                        }
                    </div>
                    <div>
                        <Typography component="body">
                            Total: {totalPedidos}
                        </Typography>
                    </div>
                    <div>
                        <Button variant='contained' onClick={submeterPedido}>
                            Enviar pedido
                        </Button>
                    </div>
                    { usuario && usuario.tipo === "cliente" ?
                        (<div>
                            <Button variant='outlined' onClick={chamaAtendente}>
                                Chamar um atendente
                            </Button>
                        </div>): null
                    }
                </>
            ):(
                <></>
            )
        }
    </>
  );
}
