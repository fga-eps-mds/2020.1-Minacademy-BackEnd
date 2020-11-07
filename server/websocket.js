const socketio = require('socket.io')();
const socketioJwt = require('socketio-jwt');
const Chat = require('./models/Chat');
const User = require('./models/User');

const connections = {};

socketio.origins('*:*');
socketio.of('/api').use(socketioJwt.authorize({
  secret: 'efb7e5eddfdd6ac729b741a2946a89a58dee7569bd4962d4bc', // TIRA DO REPOSITORIO!!!
  handshake: true,
}));

socketio.of('/api').on('connection', async (socket) => {
  try {
    if (connections[socket.decoded_token.id]) {
      connections[socket.decoded_token.id].push(socket);
    } else {
      connections[socket.decoded_token.id] = [socket];
    }

    const user = await User.findById(socket.decoded_token.id);
    const chats = await Chat.find({ users: user._id });
    chats.forEach((chat) => socket.join(chat._id));
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }

  socket.on('disconnect', () => {
    connections[socket.decoded_token.id] = connections[socket.decoded_token.id]
      .filter((connection) => connection.id !== socket.id);
  });
});

module.exports = {
  io: socketio,
  connections,
};
