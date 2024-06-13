// import { socket } from '../../socket';

import { useSocketContext } from "../../contexto/Socket";

export function ConnectionManager() {
  const { socket } = useSocketContext();

  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <button onClick={ connect }>Connect</button>
      <button onClick={ disconnect }>Disconnect</button>
      <button onClick={ () => {
        console.log(socket.connected)
      } }>Status</button>
      <button onClick={ () => {
        console.log("emitindo")
        socket.emit("teste",  {query: {"usuarioId": "teste"}})
      }}
      >restaurante_logado</button>
      <button onClick={ () => {
        socket.emit("salas",  {})
      }}
      >salas</button>
    </>
  );
}