const { connections } = require('../websocket')

module.exports = {
  async teste(req, res) {
    req.io.emit('TESTE', 'ola')
    for (const key in req.io.sockets) {
      req.io.sockets[key].emit('TESTE', key)
    }
    const targets = connections['5f8f15aafdc23200162c7ee6']
    if (targets) {
      targets.forEach((target) => target.emit("TESTE", "SOMENTE VOCE RECEBE 0!"))
    }
    const receiver = Object.values(req.io.sockets).find((item) => item.decoded_token.id == '5f8f15aafdc23200162c7ee6')
    // receiver.emit('TESTE', "somente voce recebe!")
    res.send({ clients: Object.keys(connections) })
  },
};
