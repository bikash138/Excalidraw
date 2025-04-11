import { WebSocketServer } from "ws";

const ws = new WebSocketServer({port:8080})

ws.on('connection', function connection(ws){
    ws.on('message', function message(data){
        ws.send('pong')
    })
})