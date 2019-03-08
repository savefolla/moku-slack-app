const port = process.env.PORT || 3000;
const websocketPort = process.env.WEBSOCKET_PORT || 40510;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({port: websocketPort});

app.get('/', (req, res) => {
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

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});
