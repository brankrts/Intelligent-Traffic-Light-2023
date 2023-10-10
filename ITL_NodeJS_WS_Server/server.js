const WebSocket = require("ws");
const http = require("http");
const cp = require("child_process")

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket server is running");
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});


server.listen(3000, () => {

  const result = cp.execSync("conda activate bitirme && python ../ITL_Python_Server/main.py -m web" )
  if (result.buffer.toString()) {
    console.log(result.toString())
    
  }
  console.log("Server is listening on port 3000");

});
