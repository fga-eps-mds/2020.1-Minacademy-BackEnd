const socketio = require('socket.io')();
const socketioJwt = require('socketio-jwt');

const connections = {};

socketio.of('/api').use(socketioJwt.authorize({
  secret: 'efb7e5eddfdd6ac729b741a2946a89a58dee7569bd4962d4bc', // TIRA DO REPOSITORIO!!!
  handshake: true
}));

socketio.of('/api').on('connection', (socket) => {
  console.log('New WebSocket connection!  New WebSocket connection!');
  console.log("socket: ", socket.id);
  console.log("user ID: ", socket.decoded_token.id);
  console.log("------------------------");

  if (connections[socket.decoded_token.id]) {
    console.log("JA EXISTE")
    connections[socket.decoded_token.id].push(socket);
  } else {
    connections[socket.decoded_token.id] = [socket];
  }

  socket.on('disconnect', (reason) => {
    console.log('disconnect', reason);
    delete connections[socket.decoded_token.id]
  });
});

module.exports = {
  io: socketio,
  connections,
};
