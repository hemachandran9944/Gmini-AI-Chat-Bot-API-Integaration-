const express = require('express');
const routes = express.Router();
const ChatController = require('../Controller/chatController');

routes.post('/ChatCreat', ChatController.ChatWithGenAI);
routes.post('/send/:id', ChatController.SendMessage);


routes.delete('/deleteAll', ChatController.DeleteAllChat);

module.exports = routes;