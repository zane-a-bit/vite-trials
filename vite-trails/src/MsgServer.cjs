const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8081 });
const clients = [];

// Registering the client
server.on('connection', (socket) => {
  clients.push(socket);
  
  // Listening for messages from clients
  server.on('message', (message) => {
    // Broadcasting the message to all clients
    clients.forEach((c) => {
      if (c.readyState === WebSocket.OPEN) {
        c.send(message);
      }
    });
  });

  // Handling client disconnection
  socket.on('close', () => {
    const index = clients.indexOf(socket);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

console.log('WebSocket is running on ws://localhost:8081');
