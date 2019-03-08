# moku-slack-app
Moku srl internal slack app

## Architecture
The server starts a websocket server in which it broadcasts a message every time one of its
REST endpoints are called by Slack (or every other thing that can make a REST request 🤗). The 
exposed endpoints are `/read` and `/play/`.

The web app (bold of me to call it this way) listens on the websocket server. If 
it receives a `play` type message it plays the sound with that url from `myinstants.com`.
If it receives a `read` type message it reads the text provided.
