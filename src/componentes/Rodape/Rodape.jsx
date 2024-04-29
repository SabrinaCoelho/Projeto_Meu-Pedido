/* import styled from '@emotion/styled'

export const Rodape = styled.footer`
    background: ${props => props.theme.cores.neutras.a};
    padding: ${props => props.theme.espacamentos.xl};
    color: ${props => props.theme.cores.branco};
` */

import { Typography, Box } from "@mui/material"
import { Container, Row, Col } from "react-grid-system"

export const Rodape = () => {
    return(
        <Box
            sx={{
                width: "100%",
                minHeight: "100px",
                bgcolor: 'primary.main',
            }}
        >
            <Container>
                <Row justify="center">
                    <Typography variant="subtitle1" component="subtitle1">
                        2024
                    </Typography>
                </Row>
            </Container>
        </Box>
    )
}