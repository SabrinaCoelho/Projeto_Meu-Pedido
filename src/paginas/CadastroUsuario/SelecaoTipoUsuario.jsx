import { Tipografia } from "../../componentes/Tipografia/Tipografia"
import {GrupoRadio} from "../../componentes/Radio/GrupoRadio"
import { useCadastroUsuarioContext } from "../../contexto/CadastroUsuario"
import { Col, Row } from "react-grid-system"
import { Botao } from "../../componentes/Botao/Botao"
import { Link } from "../../componentes/Link/Link"
import { Link as RouterLink } from "react-router-dom"
import { Typography } from "@mui/material"

const opcoes = [
    {
        valor: 1,
        label: 'Restaurante',
    },
    {
        valor: 2,
        label: 'Atendente',
    },
    {
        valor: 3,
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
                            <Botao variante="secundaria">
                                Anterior
                            </Botao>
                        </RouterLink>
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                        <div style={{ textAlign: 'right' }}>
                            <RouterLink to='/cadastro/dados-usuario'>
                                <Botao>
                                    Próxima
                                </Botao>
                            </RouterLink>
                            <RouterLink to='/perfil/atualizar-dados'>
                                <Botao>
                                    a
                                </Botao>
                            </RouterLink>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}