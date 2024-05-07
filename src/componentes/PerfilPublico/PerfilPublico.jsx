import { Container, Row, Col } from "react-grid-system"
import { useCadastroUsuarioContext } from "../../contexto/CadastroUsuario"
import { Typography } from "@mui/material"
import { Cardapio } from "../../paginas/Cardapio/Cardapio"

export const PerfilPublico = ({restauranteDados}) => {

    const { 
        usuario, 
        setNome, 
        setTelefone,
        setRestauranteId,
        setEmail, 
        setSenha, 
        setCnpj, 
        setSenhaConfirmada, 
        setEndereco,
        setInformacoes,
        submeterUsuario
    } = useCadastroUsuarioContext()
    
    

    return (
        <Container>
            <Row>
                <Col>
                    <Typography variant="h4" component="h1">
                        {restauranteDados.nome}
                    </Typography>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Typography variant="body" component="body">
                        {restauranteDados.nome}
                    </Typography>
                    <Typography variant="body" component="body">
                        {restauranteDados.email}
                    </Typography>
                    <Typography variant="body" component="body">
                        {restauranteDados.cpf}
                    </Typography>
                    <Typography variant="body" component="body">
                        {restauranteDados.endereco}
                    </Typography>
                </Col>
            </Row>
            <Cardapio restauranteId={restauranteDados._id}/>
        </Container>
    )
}