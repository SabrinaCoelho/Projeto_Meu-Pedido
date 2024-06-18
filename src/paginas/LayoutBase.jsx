import { Outlet } from "react-router-dom";
import { Cabecalho } from '../componentes/Cabecalho/Cabecalho';
import { Rodape } from "../componentes/Rodape/Rodape";
import { Container } from "@mui/material";
import { ConnectionState } from "../componentes/ConnectionState/ConnectionState";
import { ConnectionManager } from "../componentes/ConnectionManager/ConnectionManager";
import { useSocketContext } from "../contexto/Socket";

export const LayoutBase = () => {
  const { isConnected } = useSocketContext();
  return (
    <>
      <Cabecalho/>
        <Container>
          <Outlet/>
          <ConnectionState isConnected={ isConnected } />
          <ConnectionManager />
        </Container>
      <Rodape/>
    </>
  );
}