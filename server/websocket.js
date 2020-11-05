const socketio = require('socket.io')();
const socketioJwt = require('socketio-jwt');
const User = require('./models/User');

const connections = {};

socketio.origins('*:*')
socketio.of('/api').use(socketioJwt.authorize({
  secret: 'efb7e5eddfdd6ac729b741a2946a89a58dee7569bd4962d4bc', // TIRA DO REPOSITORIO!!!
  handshake: true
}));

socketio.of('/api').on('connection', async (socket) => {
  console.log('New WebSocket connection!  New WebSocket connection!');
  console.log("socket: ", socket.id);
  console.log("user ID: ", socket.decoded_token.id);
  console.log("------------------------");

  try {
    if (connections[socket.decoded_token.id]) {
      console.log("JA EXISTE")
      connections[socket.decoded_token.id].push(socket);
    } else {
      connections[socket.decoded_token.id] = [socket];
    }

    const user = await User.findById(socket.decoded_token.id)
    const chats = await user.execPopulate('chat').then(doc => doc.chat)
    console.log('CHATS: ', chats)
    chats.forEach((chat) => socket.join(chat._id))
  } catch (error) {
    console.error(error)
  }

  socket.on('disconnect', (reason) => {
    console.log('disconnect', reason);
    // delete connections[socket.decoded_token.id]
    connections[socket.decoded_token.id] = connections[socket.decoded_token.id]
      .filter((connection) => connection.id !== socket.id)
  });
});

module.exports = {
  io: socketio,
  connections,
};
