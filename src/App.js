import { Estilos } from "./componentes/EstilosGlobais/Estilos"
import { ProvedorTema } from "./componentes/ProvedorTema/ProvedorTema"
import { RouterProvider } from "react-router-dom/dist";
import { router } from "./router/router";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <ProvedorTema>
      <Estilos/>
      <RouterProvider router={router}/>
    </ProvedorTema>
  );
}

export default App;
