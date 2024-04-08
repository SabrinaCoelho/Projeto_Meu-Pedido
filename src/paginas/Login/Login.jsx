import { Col, Row } from "react-grid-system"
import { CampoTexto } from "../../componentes/CampoTexto/CampoTexto"
import { useLoginContext } from "../../contexto/Login"
import { Botao } from "../../componentes/Botao/Botao"


export const Login = () => {

    const {
        login,
        setEmail,
        setSenha
    } = useLoginContext()

    const entrar = (event) => {
        event.preventDefault();
        console.log(login)
    }
    
    return (
        <form onSubmit={entrar}>
            <Row justify="center" >
                <Col xxxl={6} xxl={6} xl={6} lg={6} md={8} sm={12}>
                    <Row>
                        <Col>
                            <CampoTexto 
                                titulo="Usuário" 
                                valor={login.email}
                                onChange={setEmail}
                                tipo="text"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <CampoTexto 
                                titulo="Senha" 
                                valor={login.senha}
                                onChange={setSenha}
                                tipo="password"
                            />
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Botao variante="primaria" >
                            Entrar
                        </Botao>
                    </Row>
                </Col>
            </Row>
        </form>
        
    )
}