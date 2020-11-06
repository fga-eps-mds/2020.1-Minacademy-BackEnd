const { connections } = require('../websocket');

module.exports = {
  findSockets(ids) {
    const sockets = [];
    ids.forEach((id) => {
      if (connections[id]) sockets.push(...connections[id]);
    });

    return sockets;
  },
};
