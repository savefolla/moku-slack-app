const port = process.env.PORT || 3000;

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

app.get('/app', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/read', (req, res) => {
  wss.clients.forEach(client => client.send(JSON.stringify({
    type: 'read',
    data: req.body.text
  })));
  res.send(`Reading ${req.body.text} :book:`);
});

app.post('/play', (req, res) => {
  wss.clients.forEach(client => client.send(JSON.stringify({
    type: 'play',
    data: req.body.text
  })));
  res.send(`Playing ${req.body.text} :sound:`);
});

const server = http.createServer(app);
const wss = new WebSocket.Server({server});
server.listen(port);
