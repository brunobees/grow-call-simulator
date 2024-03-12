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

  console.log(`Client ${clientId} connected`);

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
      console.error("Error when parsing the message:", error);
      console.log("Unexpected message format:", message);
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log(`Client ${clientId} disconnected`);

    const disconnectMessage = JSON.stringify({
      eventoType: "Client DISCONNECTED",
      evento: clientId,
    });

    const parsedMessage = JSON.parse(disconnectMessage);
    
    wss.broadcast(parsedMessage);
  });
});

console.log(`WebSocket server running on the port${PORT}`);
