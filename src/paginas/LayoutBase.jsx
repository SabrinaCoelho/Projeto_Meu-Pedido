import { Outlet } from "react-router-dom";
import { Cabecalho } from '../componentes/Cabecalho/Cabecalho';
import { Rodape } from "../componentes/Rodape/Rodape";

export const LayoutBase = () => {
  return (
    <>
      <Cabecalho/>
      <Outlet/>
      <Rodape/>
    </>
  );
}