import { TriggerEventParams, WebSocketStatus, WebsocketEventData } from '@/type/websocket';
import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from "uuid";

export const useWebSocket = (url: string) => {
  const [status, setStatus] = useState<WebSocketStatus>(WebSocketStatus.IDLE);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [logs, setLogs] = useState<Array<WebsocketEventData>>([]);
  const [clientsConnected, setClientsConnected] = useState<number>(0);

  const onMessage = useCallback((event: MessageEvent) => {
    const data = JSON.parse(event.data);
    const logId = uuidv4();

    if (data.eventoType === 'Client Connected') {
      setClientsConnected(prev => prev + 1);
    } else if (data.eventoType === 'Client Disconnected') {
      setClientsConnected(prev => prev - 1);
    }

    setLogs((prevLogs) => [
      ...prevLogs,
      {
        id: logId,
        evento: data.evento,
        eventoType: data.eventoType || 'Avaya Event',
        date: new Date().toISOString(),
        ...data,
      },
    ]);

    console.log('Mensagem recebida:', event.data);
  }, []);

  const connect = useCallback(() => {
    if (status === WebSocketStatus.OPEN || status === WebSocketStatus.CONNECTING) {
      console.log('WebSocket já está conectado ou conectando');
      return;
    }

    setStatus(WebSocketStatus.CONNECTING);
    const ws = new WebSocket(url);

    // Aqui, definimos o status para AWAITING_CONNECTION logo após iniciar a instância WebSocket
    setStatus(WebSocketStatus.AWAITING_CONNECTION);

    ws.onopen = () => {
      console.log('Conexão WebSocket aberta');
      setStatus(WebSocketStatus.OPEN);
    };

    ws.onmessage = onMessage;

    ws.onerror = (error) => {
      console.error('Erro na conexão WebSocket:', error);
    };

    ws.onclose = () => {
      console.log('Conexão WebSocket fechada');
      setStatus(WebSocketStatus.CLOSED);
    };

    setSocket(ws);
  }, [url, onMessage, status]);

  const close = useCallback(() => {
    if (status === WebSocketStatus.CLOSED || status === WebSocketStatus.CLOSING) {
      console.log('WebSocket já está fechado ou fechando');
      return;
    }

    setStatus(WebSocketStatus.CLOSING);
    if (socket) {
      socket.close();
      setLogs([]);
    }
  }, [socket, status]);

  const sendMessage = useCallback((message: TriggerEventParams) => {
    if (socket && status === WebSocketStatus.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.log('WebSocket não está aberto.');
    }
  }, [socket, status]);

  useEffect(() => {
    return () => {
      if (socket) {
        close();
      }
    };
  }, [socket]);

  return { status, clientsConnected, logs, connect, close, sendMessage };
};
