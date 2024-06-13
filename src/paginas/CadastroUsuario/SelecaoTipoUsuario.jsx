import {GrupoRadio} from "../../componentes/Radio/GrupoRadio"
import { useCadastroUsuarioContext } from "../../contexto/CadastroUsuario"
import { Col, Row } from "react-grid-system"
import { Link as RouterLink } from "react-router-dom"
import { Typography, Button } from "@mui/material"

const opcoes = [
    {
        valor: "restaurante",
        label: 'Restaurante',
    },
    {
        valor: "atendente",
        label: 'Atendente',
    },
    {
        valor: "cliente",
        label: 'Cliente',
    }
]

export const SelecaoTipoUsuario = () => {
    const { usuario, setTipo } = useCadastroUsuarioContext()

    return (
        <Row justify="center" >
            <Col xxxl={6} xxl={6} xl={6} lg={6} md={8} sm={12}>
                <div style={{ textAlign: 'center' }}>
                    <Typography variant="h3" component="h1">
                        Crie seu cadastro
                    </Typography>
                    <Typography variant="h4" component="h2">
                    O que você é?
                    </Typography>
                </div>
                <GrupoRadio 
                    opcoes={opcoes} 
                    valor={usuario.tipo} 
                    onChange={setTipo} 
                />
                <Row>
                    <Col lg={6} md={6} sm={6}>
                        <RouterLink to="/cadastro/tipo-usuario">
                            <Button >
                                Anterior
                            </Button>
                        </RouterLink>
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                        <div style={{ textAlign: 'right' }}>
                            <RouterLink to='/cadastro/dados-usuario'>
                                <Button>
                                    Próxima
                                </Button>
                            </RouterLink>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}