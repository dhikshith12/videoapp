const http = require('http');
const WebSocketServer = require('websocket').server;
var connection = null;

const httpServer = http.createServer((req,res)=>{

    console.log("we have received a request")
})
const websocket = new WebSocketServer({
    "httpServer": httpServer
})
function sendever5Second(){
    connection.send(`Message ${Math.random()}`);
    setTimeout(sendever5Second, 500);
}

websocket.on("request", request=>{
    connection = request.accept(null, request.origin)
    connection.on("open", ()=> console.log("Opened Websocket!!"))
    connection.on("close", ()=> console.log("Websocket CLOSED!!"))
    connection.on("message", message => {
        console.log(`Received message ${message.utf8Data}`)
    })
    sendever5Second()

})

httpServer.listen(3021, ()=> console.log("server listening on port 3021"))