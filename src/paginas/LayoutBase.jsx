import { Outlet } from "react-router-dom";
import { Cabecalho } from '../componentes/Cabecalho/Cabecalho';
import { Rodape } from "../componentes/Rodape/Rodape";
import { Container } from "@mui/material";

export const LayoutBase = () => {
  return (
    <>
      <Cabecalho/>
        <Container>
          <Outlet/>
        </Container>
      <Rodape/>
    </>
  );
}