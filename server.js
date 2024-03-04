import WebSocket, { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";

const PORT = 8088;
const wss = new WebSocketServer({ port: PORT });
const clients = new Map();

// Define a função de broadcast fora do manipulador de conexão
wss.broadcast = function broadcast(msg) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      // Garante que a mensagem seja enviada como uma string JSON
      client.send(JSON.stringify(msg));
    }
  });
};

wss.on("connection", function connection(ws) {
  const clientId = uuidv4(); // Gera um ID único para o cliente
  clients.set(ws, clientId); // Associa o WebSocket ao ID

  console.log(`Cliente ${clientId} conectado`);

  ws.send(
    JSON.stringify({
      evento: "Welcome to the WebSocket server!",
      eventoType: "Initialization",
      clientId: clientId, // Envia o ID do cliente de volta para ele
    })
  );

  // Notifica todos os clientes, exceto o que acabou de se conectar, sobre a nova conexão
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
    // Converte a mensagem para uma string se for binária
    const message = isBinary ? data.toString() : data;

    try {
      // Tenta fazer o parse da mensagem como JSON
      const parsedMessage = JSON.parse(message);
      // Realiza o broadcast do objeto JSON para todos os clientes
      wss.broadcast(parsedMessage);
    } catch (error) {
      console.error("Erro ao fazer parse da mensagem:", error);
      console.log("Formato de mensagem não esperado:", message);
    }
  });

  ws.on("close", () => {
    clients.delete(ws); // Remove o cliente do Set ao se desconectar
    console.log(`Cliente ${clientId} desconectado`);

    // Notifica todos os clientes sobre a desconexão
    const disconnectMessage = JSON.stringify({
      eventoType: "Client DISCONNECTED",
      evento: clientId,
    });

    const parsedMessage = JSON.parse(disconnectMessage);
    
    wss.broadcast(parsedMessage);
  });
});

console.log(`Servidor WebSocket rodando na porta ${PORT}`);
