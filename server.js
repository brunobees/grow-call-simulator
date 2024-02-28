import WebSocket, { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8088 });

wss.on("connection", function connection(ws) {
  console.log("Cliente conectado");

  ws.on("message", function incoming(data, isBinary) {
    console.log("Mensagem recebida:", data);

    // Broadcast para todos os clientes
    const message = isBinary ? data : data.toString();
    // Continue as before.
    console.log(message + "\n\n");
    wss.broadcast = function broadcast(msg){
      wss.clients.forEach(function each(client){
        client.send(msg);
      });
    };
  });

  ws.send("Conexão estabelecida");
});

console.log(`Servidor WebSocket rodando na porta 8088`);
