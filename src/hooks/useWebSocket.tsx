import {
  TriggerEventParams,
  WebSocketStatus,
  WebsocketEventData,
} from "@/type/websocket";
import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

export const useWebSocket = (url: string) => {
  const [status, setStatus] = useState<WebSocketStatus>(WebSocketStatus.IDLE);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [logs, setLogs] = useState<Array<WebsocketEventData>>([]);
  const [clientsConnected, setClientsConnected] = useState<number>(0);

  const onMessage = useCallback((event: MessageEvent) => {
    console.log(event)
    const data = JSON.parse(event.data);
  
    if (data.eventoType === "Client DISCONNECTED") {
      const alreadyLogged = logs.some(log => log.evento === data.evento && log.eventoType === data.eventoType);
      if (alreadyLogged) {
        console.log("Evento de desconexão já registrado:", data.evento);
        return;
      }
    }
  
    setLogs(prevLogs => [...prevLogs, {
      id: uuidv4(),
      evento: data.evento,
      eventoType: data.eventoType || "Avaya Event",
      date: new Date().toISOString(),
      ...data,
    }]);
  
    if (data.eventoType === "Client CONNECTED") {
      setClientsConnected(prev => prev + 1);
    } else if (data.eventoType === "Client DISCONNECTED") {
      setClientsConnected(prev => Math.max(0, prev - 1));
    }
  }, [logs]);

  const connect = useCallback(() => {
    if (
      status === WebSocketStatus.OPEN ||
      status === WebSocketStatus.CONNECTING
    ) {
      console.log("WebSocket já está conectado ou conectando");
      return;
    }

    setStatus(WebSocketStatus.CONNECTING);
    const ws = new WebSocket(url);

    setStatus(WebSocketStatus.AWAITING_CONNECTION);

    ws.onopen = () => {
      console.log("Conexão WebSocket aberta");
      setStatus(WebSocketStatus.OPEN);
    };

    ws.onmessage = onMessage;

    ws.onerror = (error) => {
      console.error("Erro na conexão WebSocket:", error);
    };

    ws.onclose = () => {
      console.log("Conexão WebSocket fechada");
      setStatus(WebSocketStatus.CLOSED);
      setLogs([]);
      setClientsConnected(0);
    };

    setSocket(ws);
  }, [url, onMessage, status]);

  const close = useCallback(() => {
    if (
      status === WebSocketStatus.CLOSED ||
      status === WebSocketStatus.CLOSING
    ) {
      console.log("WebSocket já está fechado ou fechando");
      return;
    }

    setStatus(WebSocketStatus.CLOSING);
    if (socket) {
      socket.close();
      setLogs([]);
      setClientsConnected(0);
    }
  }, [socket, status]);

  const sendMessage = useCallback(
    (message: TriggerEventParams) => {
      if (socket && status === WebSocketStatus.OPEN) {
        socket.send(JSON.stringify(message));
      } else {
        console.log("WebSocket não está aberto.");
      }
    },
    [socket, status]
  );

  useEffect(() => {
    return () => {
      if (socket) {
        close();
      }
    };
  }, [socket]);

  return { status, clientsConnected, logs, connect, close, sendMessage };
};
