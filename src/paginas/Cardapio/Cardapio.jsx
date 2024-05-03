/* import { Container, Col, Row } from "react-grid-system"
import { CampoTexto } from "../../componentes/CampoTexto/CampoTexto"
import { useLoginContext } from "../../contexto/Login"
import { Botao } from "../../componentes/Botao/Botao"
import { WrapperConteudo } from "../../componentes/WrapperConteudo/WrapperConteudo"
import { useComandaContext } from "../../contexto/Comanda"
import { TextField, Card, CardContent, CardActions, Typography, Button } from '@mui/material';

export const Cardapio = () => {
    const cardapio = [
        {
            nome: "Bolo de laranja",
            descricao: "Bolo de laranja. Contém glútem, derivados de leite, ovos, e laranja.",
            preco: "25,00",
            ativo: "true"
        },
        {
            nome: "Suco de laranja 400ml",
            descricao: "Contém laranja.",
            preco: "5,00",
            ativo: "true"
        }
    ]
    
    return (
        <Container style={{paddingBottom: "100px"}}>
            <Typography variant="h5" component="h1">
                Cardápio
            </Typography>
            <div style={{margin: "1.2rem 0"}}>
                {
                    cardapio.flatMap(
                        (item, i) => (
                            <Card variant="outlined" sx={{ minWidth: "100%" }} key={i}>
                                <CardContent>
                                    <Container>
                                        <Row justify="between">
                                            <div>
                                                <Typography variant="h6" component="h6">{item.nome}</Typography>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div>
                                                <Typography variant="h6" component="h6">{item.descricao}</Typography>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div>
                                                <Typography variant="h6" component="h6">R$ {item.preco}</Typography>
                                            </div>
                                        </Row>
                                    </Container>
                                </CardContent>
                                <CardActions>
                                    <Container>
                                        <Row style={{justifyContent: "right"}}>
                                            <Button variant="contained">
                                                Desativar
                                            </Button>
                                            <Button variant="contained">
                                                Editar
                                            </Button>
                                        </Row>
                                    </Container>
                                </CardActions>
                            </Card>
                        )
                    )
                }
            </div>
            <Row>
                <Typography variant="h5" component="h1">
                    Adicionar produtos
                </Typography>
            </Row>
            <div style={{margin: "1.2rem 0"}}>
                <Row>
                    <Col>
                        <TextField
                            fullWidth
                            required
                            id="outlined-required"
                            label="Nome"
                            defaultValue=""
                            onChange={null}
                            size="small"
                            margin="dense"
                        />
                        <TextField
                            fullWidth
                            required
                            id="outlined-required"
                            label="Descrição"
                            defaultValue=""
                            onChange={null}
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
                            defaultValue=""
                            onChange={null}
                            size="small"
                            margin="dense"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="contained">
                            Adicionar
                        </Button>
                    </Col>
                </Row>
            </div>
        </Container>
    )
} */
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, TextField, ListItem, List, ListItemText, ListDivider, Divider, Button } from '@mui/material';
import ListItemIcon from '@mui/icons-material/Inbox';
import ListItemButton from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Container, Col, Row } from "react-grid-system"
import { useProdutoContext } from "../../contexto/Produto"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { GrupoRadio } from '../../componentes/Radio/GrupoRadio';

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

export const Cardapio = () => {
    const {
        produto,
        setNome,
        setDescricao,
        setPreco,
        setCategoria,
        submeterProduto
    } = useProdutoContext();
    const [expanded, setExpanded] = useState('panel1');
    const [carregando, setCarregando] = useState(true)
    const [cardapio, setCardapio] = useState([])

    useEffect(
        () => {
            axios.get("http://localhost:3001/produtos")
            .then(
                res => {
                    console.log("OK, CHAOS!")
                    console.log(res.data);
                    setCardapio(res.data);
                    setCarregando(false)
                }
            )
            .catch(err => {//TODO
                console.log("NAO deu certo")
                setCarregando(false)
            }

            ) 
        }, [carregando]
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

    const submeter = (event) => {
        event.preventDefault()
        console.log(produto)
        submeterProduto(produto)
        axios.post("http://localhost:3001/produtos", {produto})
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

  return (
    <Container>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Salgados</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <List>
                {
                    cardapio.map(
                        (item, i) => {
                            if(item.categoria == "salgado"){
                                return(<>
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
                                                            <Box component="div" sx={{ my: 2, display: "flex", justifyContent: "right" }}>
                                                                <Button variant="outlined" size="small">
                                                                    Pedir
                                                                </Button>
                                                            </Box>
                                                        </div>
                                                    }
                                                    />
                                                </ListItem>
                                            <Divider/>
                                        </>
                                )
                            }
                        }
                    )
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
                    cardapio.map(
                        (item, i) => item.categoria == "doce" ?
                                (   <>
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
                                                        <Box component="div" sx={{ my: 2, display: "flex", justifyContent: "right" }}>
                                                            <Button variant="outlined" size="small">
                                                                Pedir
                                                            </Button>
                                                        </Box>
                                                    </div>
                                                }
                                                />
                                            </ListItem>
                                        <Divider/>
                                    </>
                            ): null
                        
                    )
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
                    cardapio.map(
                        (item, i) => {
                            if(item.categoria == "bebida"){
                                return(<>
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
                                                            <Box component="div" sx={{ my: 2, display: "flex", justifyContent: "right" }}>
                                                                <Button variant="outlined" size="small">
                                                                    Pedir
                                                                </Button>
                                                            </Box>
                                                        </div>
                                                    }
                                                    />
                                                </ListItem>
                                            <Divider/>
                                        </>
                                )
                            }else{
                                return(
                                    <Typography variant="h5" component="h1">
                                        Nenhum registro encontrado.
                                    </Typography>
                                )
                            }
                        }
                    )
                }
            </List>
        </AccordionDetails>
        </Accordion>
        <form style={{margin: "1.2rem 0"}} onSubmit={submeter}>
            <Row>
                <Typography variant='h3' component="h1">
                    Adicionar
                </Typography>
            </Row>
            <Row>
                <Col>
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Nome"
                        defaultValue={produto.nome}
                        onChange={({target}) => setNome(target.value)}
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
                        Adicionar
                    </Button>
                </Col>
            </Row>
        </form>
    </Container>
  );
}
