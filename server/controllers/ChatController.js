const Chat = require('../models/Chat');
const { Message } = require('../models/Message');
const { findSockets } = require('../utils/findSocket');

module.exports = {
  async getChat(req, res) {
    const { user } = req;
    let chats = [];

    try {
      if (user.userType === 'Mentor') {
        chats = await Chat.find({ users: { $in: [...user.learners] } });
      } else {
        chats = await Chat.find({ users: { $all: [user._id, user.mentor] } });
      }
      res.send(chats);
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
      res.send({ error: error.message });
    }
  },

  async createChat(ids) {
    try {
      let chat = await Chat.findOne({ users: { $all: [...ids] } });
      if (chat) return;
      chat = new Chat({ users: ids });
      await chat.save();
      const targets = findSockets(ids);
      targets.forEach((target) => {
        target.join(chat._id);
        target.emit('NEW_CHAT_EVENT', chat);
      });
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  },

  async sendMessage(req, res) {
    const { toChat, content } = req.body;
    try {
      const chat = await Chat.findById(toChat);
      if (!chat) throw new Error('Chat not found');
      const newMessage = await new Message({
        sender: req.user._id,
        content,
        chat: chat._id,
      });

      chat.messages = chat.messages.concat(newMessage);

      await newMessage.save();
      await chat.save();

      const socket = findSockets([req.user._id]);
      if (socket.length) {
        socket[0].to(chat._id)
          .emit('NEW_MESSAGE_EVENT', { newMessage, from: req.user.name });
      }
      res.send(newMessage);
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
      res.status(400).send({ error: error.message });
    }
  },
};
