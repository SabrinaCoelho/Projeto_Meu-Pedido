import { createContext, useContext, useEffect, useState } from 'react';
//import { socket } from '../socket';

import { io } from 'socket.io-client';
import { useCadastroUsuarioContext } from './CadastroUsuario';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3001';
console.log("INICIADO")
const socket = io(
    URL,
    {
        autoConnect: false
    }
);


export const SocketContext = createContext()

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);
    const { usuario } = useCadastroUsuarioContext();
    useEffect(() => {
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
    
        
        if(usuario && usuario.tipo === "cliente"){
            socket.on('server_comanda_atualizada', (msg)=> alert(msg));
        }else if(usuario && usuario.tipo === "restaurante"){
            socket.on("server_pedido_cancelado", (msg)=> alert(msg));
            socket.on("server_novo_pedido", (msg)=> alert(msg));
            socket.on('server_chama_atendente', (msg)=> alert(msg))
        }else if(usuario && usuario.tipo === "atendente"){
            socket.on('server_chama_atendente', (msg)=> alert(msg))
        }else if(!usuario.id){
            socket.on("server_pedido_cancelado", (msg)=> alert(msg));
            socket.on('server_comanda_atualizada', (msg)=> alert(msg));
        }
        
        //
        /* socket.io.on("reconnect_failed", () => {
            console.log("reconections")
            console.log(`${socket.id} falhou ao tentar reconectar novamente.`);
        });
        
        socket.io.on("reconnect_error", (error) => {
            console.log("reconections")
            console.log(`${socket.id} tentando reconectar novamente, mas deu erro.`)
            console.log(error);
        });
        
        socket.io.on("reconnect_attempt", (attempt) => {
            console.log("reconections")
            console.log(`${socket.id} tentando reconectar novamente.`)
            console.log(attempt);
        });
        
        socket.io.on("reconnect", (attempt) => {
            console.log("reconections")
            console.log(`${socket.id} conseguiu reconectar novamente.`)
            console.log(attempt);
        }); */
        //
    
        return () => {
          socket.off('connect', onConnect);
          socket.off('disconnect', onDisconnect);
          socket.off('foo', onFooEvent);
        };
    }, []);

    const connect = () => {
        socket.connect();
    }

    const disconnect = () => {
        socket.disconnect();
    }
    const contexto = {
        socket,
        connect,
        disconnect,
        isConnected
    }

    return (<SocketContext.Provider value={contexto}>
        {children}
    </SocketContext.Provider>)
}