import WebSocket, { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";

const PORT = 8088;
const wss = new WebSocketServer({ port: PORT });
const clients = new Map();

wss.broadcast = function broadcast(msg) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(msg));
    }
  });
};

wss.on("connection", function connection(ws) {
  const clientId = uuidv4();
  clients.set(ws, clientId);

  console.log(`Cliente ${clientId} conectado`);

  ws.send(
    JSON.stringify({
      evento: "Welcome to the WebSocket server!",
      eventoType: "Initialization",
      clientId: clientId,
    })
  );

  const connectMessage = JSON.stringify({
    eventoType: "Client CONNECTED",
    evento: clientId,
  });

  clients.forEach((id, client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(connectMessage);
    }
  });

  ws.on("message", function incoming(data, isBinary) {
    const message = isBinary ? data.toString() : data;

    try {
      const parsedMessage = JSON.parse(message);
      wss.broadcast(parsedMessage);
    } catch (error) {
      console.error("Erro ao fazer parse da mensagem:", error);
      console.log("Formato de mensagem não esperado:", message);
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log(`Cliente ${clientId} desconectado`);

    const disconnectMessage = JSON.stringify({
      eventoType: "Client DISCONNECTED",
      evento: clientId,
    });

    const parsedMessage = JSON.parse(disconnectMessage);
    
    wss.broadcast(parsedMessage);
  });
});

console.log(`Servidor WebSocket rodando na porta ${PORT}`);
