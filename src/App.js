import { Estilos } from "./componentes/EstilosGlobais/Estilos"
import { ProvedorTema } from "./componentes/ProvedorTema/ProvedorTema"
import { RouterProvider } from "react-router-dom/dist";
import { router } from "./router/router";

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
