import { Tipografia } from "../../componentes/Tipografia/Tipografia"
import { CampoTexto } from "../../componentes/CampoTexto/CampoTexto"
import { Col, Row } from "react-grid-system"
import { Botao } from "../../componentes/Botao/Botao"
import { Link } from "react-router-dom"
import { useCadastroUsuarioContext } from "../../contexto/CadastroUsuario"

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

    const finalizarCadastro = (evento) => {
        evento.preventDefault();
        submeterUsuario()
    }

    return (
        <form onSubmit={finalizarCadastro}>
            {usuario.tipo == 1 ? 
                (
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <CampoTexto 
                                    titulo="Nome" 
                                    valor={usuario.nome}
                                    onChange={setNome}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <CampoTexto 
                                    titulo="CNPJ" 
                                    valor={usuario.cnpj}
                                    onChange={setCnpj}  
                                    tipo="number"  
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <CampoTexto 
                                    titulo="E-mail" 
                                    valor={usuario.email}
                                    onChange={setEmail}
                                    tipo='email'    
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <CampoTexto 
                                    titulo="Endereço" 
                                    valor={usuario.endereco}
                                    onChange={setEndereco}   
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <CampoTexto 
                                    titulo="Telefone" 
                                    valor={usuario.telefone}
                                    onChange={setTelefone}   
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <CampoTexto 
                                    titulo="Texto informativo" 
                                    valor={usuario.informacoes}
                                    onChange={setInformacoes}   
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <CampoTexto titulo="Senha"
                                    valor={usuario.senha}
                                    onChange={setSenha}    
                                    tipo='password'    
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <CampoTexto titulo="Repita a Senha"
                                    valor={usuario.senhaConfirmada}
                                    onChange={setSenhaConfirmada}    
                                    tipo='password'    
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <CampoTexto titulo="Texto informativo"
                                    valor=""
                                    onChange={null}    
                                    tipo='text'    
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>) : null
            }
            {usuario.tipo == 2 ? 
                (
                <>
                    <Row>
                        <Col>
                            <CampoTexto 
                                titulo="Nome Completo" 
                                valor={usuario.nome}
                                onChange={setNome}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CampoTexto 
                                titulo="Funcionário do restaurante:" 
                                valor={usuario.restauranteId}
                                onChange={setRestauranteId}    
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CampoTexto 
                                titulo="Senha" 
                                valor={usuario.senha}
                                onChange={setSenha}   
                                tipo="password" 
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <CampoTexto 
                                titulo="Repita a Senha" 
                                valor={usuario.senhaConfirmada}
                                onChange={setSenhaConfirmada}
                                tipo="password" 
                            />
                        </Col>
                    </Row>
                    
                </>) : null
            }
            {usuario.tipo == 3 ? 
                (
                <>
                    <Row>
                        <Col>
                            <CampoTexto 
                                titulo="Nome Completo" 
                                valor={usuario.nome}
                                onChange={setNome}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CampoTexto 
                                titulo="Email" 
                                valor={usuario.email}
                                onChange={setEmail}    
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <CampoTexto 
                                titulo="Senha" 
                                valor={usuario.senha}
                                onChange={setSenha}  
                                tipo="password"   
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <CampoTexto 
                                titulo="Repita a Senha" 
                                valor={usuario.senhaConfirmada}
                                onChange={setSenhaConfirmada}    
                                tipo="password" 
                            />
                        </Col>
                    </Row>
                    
                </>) : null
            }
            <Row>
                <Col lg={6} md={6} sm={6}>
                    <Link to="..">
                        <Botao variante="secundaria">
                            Anterior
                        </Botao>
                    </Link>
                </Col>
                <Col lg={6} md={6} sm={6}>
                    <div style={{ textAlign: 'right' }}>
                        {/* <Link to='/cadastro/concluido'> */}
                        <Botao>
                            Próxima
                        </Botao>
                        {/* </Link> */}
                    </div>
                </Col>
            </Row>
        </form>
    )
}