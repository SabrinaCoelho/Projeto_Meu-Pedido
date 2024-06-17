import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from "react"
import { useCadastroUsuarioContext } from '../../contexto/CadastroUsuario';
import axios from 'axios';
import { Button, Switch, Typography } from '@mui/material';
import { CadastroUsuario } from '../CadastroUsuario/CadastroUsuario';
import { Col, Row } from 'react-grid-system';
import { useCadastroAtendenteContext } from '../../contexto/CadastroAtendente';

function createData(name, status) {
  return { name, status };
}

const rows = [
  createData('Marina Carvalho', "true"),
  createData('James Washington', "true")
];

export default function () {

  const usuarioEmail = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");
    
  const [ funcionarios, setFuncionarios ] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [novoAtendente, setNovoAtendente] = useState(false);
  const [atualizaSwitches, setAtualizaSwitches] = useState(null);
  const {usuario} = useCadastroUsuarioContext();
  const { atendente, setSubmetido } = useCadastroAtendenteContext();
  
  useEffect(
    () => {
      axios.get("http://localhost:3001/api/funcionarios_restaurante/"+usuario.id,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )
        .then(
            res => {
                if(res.data && res.data){
                  let {funcionarios} = res.data;
                  let teste = funcionarios.map(e => e.ativo)
                  setAtualizaSwitches(teste)
                  setFuncionarios(funcionarios);
                  
                }
            }
        )
        .catch(err => {//TODO
            console.log(err)
            setCarregando(false)
        }) 
    }, [carregando, atendente.submetido]
  );
  const handleSwitchChange = ({target}, funcionario) => {
    console.log(target.checked)
    //atualiza no banco
    axios.put("http://localhost:3001/api/status_funcionario/"+usuario.id, {
      funcionarioId: funcionario.id,
      status: target.checked
    },
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(
          res => {
            console.log(res)
            if(res && res.data){
              setCarregando(true);
            }
          }
      )
      .catch(err => {//TODO
          console.log(err)
          setCarregando(false)
      }) 
  }
  return (
    <>
      <Typography component="h1" variant="h3">
        Funcionários cadastrados
      </Typography>
      <TableContainer >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {atualizaSwitches && funcionarios ? funcionarios.map((funcionario, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {funcionario.nome}
                </TableCell>
                <TableCell align="right">{funcionario.email}</TableCell>
                <TableCell align="right">
                  <Switch
                    checked={atualizaSwitches[i]}
                    onChange={(event) => handleSwitchChange(event, funcionario)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </TableCell>
              </TableRow>
            )): null}
          </TableBody>
        </Table>
      </TableContainer>
      {
        novoAtendente && !atendente.submetido? 
        (
        <Row style={{marginTop: "20px", marginBottom: "20px"}}>
          <Col>
            <Button variant="contained" onClick={() => {setNovoAtendente(false); setSubmetido(false)}}>
              Cancelar
            </Button>
          </Col>
        </Row>)
        :(
        <Row style={{marginTop: "20px", marginBottom: "20px"}}>
          <Col>
            <Button variant="contained" onClick={() => {setNovoAtendente(true); setSubmetido(false)}}>
              Adicionar atendente
            </Button>
          </Col>
        </Row>)
      }
      { novoAtendente && !atendente.submetido? <CadastroUsuario addAtendente={novoAtendente}/> : <></>}
      
    </>
  );
}
