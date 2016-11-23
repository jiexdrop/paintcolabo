var express = require('express'),
    app = express(),
    http = require('http'),
    socketIo = require('socket.io');

var PORT = process.env.PORT || 8080;

//launchServer
var server =  http.createServer(app);
var io = socketIo.listen(server);
server.listen(PORT);

//express dir
app.use(express.static(__dirname + '/public'));

console.log("Server running on PORT :" + PORT);

//on connection
io.on('connection', function (socket) {

   // update_pos
   socket.on('update_position', function (pos) {
     io.emit('update_position', { point: pos.point });
   });
});
