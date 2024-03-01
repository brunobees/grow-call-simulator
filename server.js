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

  // Notifica todos os clientes sobre a conexão
  notifyClients("Connected");

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
      // console.log("Formato de mensagem não esperado:", message);
    }
  });

  ws.on("close", () => {
    clients.delete(ws); // Remove o cliente do Set

    // Notifica todos os clientes sobre a desconexão
    notifyClients("Disconnected");
  });

  // Envia uma mensagem inicial ao cliente no formato JSON
  ws.send(
    JSON.stringify({
      evento: "Welcome to the WebSocket server!",
      eventoType: "Initialization",
    })
  );
});

function notifyClients(connectionType) {
  const connectedClientsIds = Array.from(clients.values()); // Extrai os IDs dos clientes conectados

  connectedClientsIds.forEach((clientId) => {
    // Envia uma mensagem para cada cliente com a lista de IDs conectados
    const message = JSON.stringify({
      eventoType: `Client ${connectionType}`,
      evento: clientId,
    });

    clients.forEach((id, client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
}

console.log(`Servidor WebSocket rodando na porta ${PORT}`);
