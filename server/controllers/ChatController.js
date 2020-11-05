const Chat = require('../models/Chat');
const { Message } = require('../models/Message');
const { connections } = require('../websocket')
const { findSockets } = require('../utils/findSocket')

module.exports = {
  async getChat(req, res) {
    const { user } = req

    try {
     const chats = await user.execPopulate('chat').then(doc => doc.chat)
     console.log(chats)
     res.send(chats)
    } catch (error) {
      console.error(error)
    }
  },

  async createChat(ids) {
    try {
      let chat = await Chat.findOne({ users: ids })
      if (chat) return
      chat = new Chat({ users: ids })
      await chat.save()
      const targets = findSockets(ids)
      targets.forEach((target) => target.emit('assigned', chat))
    } catch (error) {
      console.error(error)
    }
  },

  async sendMessage(req, res) {
    const { toChat, content } = req.body
    try {
      const chat = await Chat.findById(toChat)
      const newMessage = await new Message({ sender: req.user._id, content });

      chat.messages = chat.messages.concat(newMessage)

      await newMessage.save();
      await chat.save();

      // const targets = findSockets([...chat.users])
      // targets.forEach((target) => target.emit('assigned', newMessage))
      const socket = findSockets([req.user._id])
      socket[0].to(chat._id).emit('NEW_MESSAGE_EVENT', { newMessage, from: req.user.name })
      // req.io.to(chat._id).broadcast("assigned", newMessage)

      res.send(newMessage)
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: error.message });
    }
  },
  async teste(req, res) {
    // console.log(connections[req.user._id][0].adapter.rooms)
    Object.keys(connections).forEach((item) => {
      connections[item].forEach((x) => x.emit('assigned', 'teste'))
    })
    req.io.emit('assigned', "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    res.send("OK")
  }
};
