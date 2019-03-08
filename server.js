const express = require('express');
const bodyParser = require('body-parser');
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({port: 40510});
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

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

app.get('/send', (req, res) => {
  wss.clients.forEach(client => client.send({}));
  res.send(200);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});
