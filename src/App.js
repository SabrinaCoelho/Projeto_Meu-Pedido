/* import { ConnectionState } from "./componentes/ConnectionState/ConnectionState"
import { ConnectionManager } from "./componentes/ConnectionManager/ConnectionManager"
import { Events } from "./componentes/Events/Events" */
import { RouterProvider } from "react-router-dom/dist";
import { router } from "./router/router";
import { socket } from './socket';
import { useEffect, useState } from "react";

function App() {
  /* const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]); */

  /* useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    socket.on('server_comanda_atualizada', (msg)=> alert(msg))

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []); */
  return (
    <>
      {/* <ConnectionState isConnected={ isConnected } />
      <Events events={ fooEvents } />
      <ConnectionManager /> */}
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
