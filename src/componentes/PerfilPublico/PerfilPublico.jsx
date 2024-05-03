import { Container } from "react-grid-system"
import { useCadastroUsuarioContext } from "../../contexto/CadastroUsuario"
import { Typography } from "@mui/material"

export const CadastroUsuario = () => {

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
                    {usuario.nome}
                </Typography>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Typography variant="body" component="body">
                        {usuario.endereco}
                    </Typography>
                    <Typography variant="body" component="body">
                        {usuario.email}
                    </Typography>
                    <Typography variant="body" component="body">
                        {usuario.cnpj}
                    </Typography>
                    <Typography variant="body" component="body">
                        {usuario.telefone}
                    </Typography>
                </Col>
            </Row>
        </Container>
    )
}