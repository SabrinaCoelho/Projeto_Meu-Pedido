import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Card, CardContent } from '@mui/material';
import { Row, Container, Col } from 'react-grid-system';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "70%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ComandaFechadaModal({comandaDados}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return comandaDados ? 
      (<div>
        <Button onClick={handleOpen}>Ver comanda</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h1">
              {comandaDados.comandaId}
            </Typography>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
            {
              comandaDados.pedidos.map(
                (item, i) => 
                  <Card variant="outlined" sx={{ minWidth: "100%" }} key={i}>
                    <CardContent>
                        <Container>
                            <Row justify="between">
                              <div>
                                <Typography variant="h6" component="h6">{item.nome}</Typography>
                              </div>
                              <div>
                                <Typography variant="h6" component="h6">{item.un} X R$ {item.preco}</Typography>
                              </div>
                            </Row>
                            <Row justify="between">
                              <div>
                                <Typography variant="body" component="body">{item.descricao}</Typography>
                              </div>
                              <div>
                                <Typography variant="body" component="body">{item.data}</Typography>
                              </div>
                            </Row>
                            <Row justify="between">
                              <div>
                                <Typography variant="body" component="body">{item.un} Un.</Typography>
                              </div>
                              <div>
                                <Typography variant="body" component="body">Efetuado por {item.atendente}</Typography>
                              </div>
                            </Row>
                        </Container>
                    </CardContent>
                  </Card>
              )
            }
            <Row justify="between">
              <Col>
                <Typography variant="h5" component="h1">
                  Total
                </Typography>
              </Col>
              <Col>
                <Typography variant="h5" component="h1" style={{textAlign: "end"}}>
                  {comandaDados.total}
                </Typography>
              </Col>
          </Row>
          </Box>
        </Modal>
      </div>) 
      :<></>
}