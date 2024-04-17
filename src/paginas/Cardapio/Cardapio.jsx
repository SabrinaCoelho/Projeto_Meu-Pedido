import { Container, Col, Row } from "react-grid-system"
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
}