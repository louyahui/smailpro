var net = require('net');

// 创建TCP服务器
var server = net.createServer();
// 存储所有客户端socket
var sockets = [];
//接收客户端连接请求
server.on('connection', function(socket) {
    console.log('Got a new connection');

    sockets.push(socket);
    //接收客户端连接请求
    socket.on('data', function(data) {
        console.log('Got data: ', data);
       //把来自客户端的数据转发送给其他所有客户端
        sockets.forEach(function(otherSocket) {
            if (otherSocket !== socket) {
                otherSocket.write(data);
            }
        });
    });

    // 把来自客户端的数据转发送给其他所有客户端
    socket.on('close', function() {
        console.log('A client connection closed');
        var index = sockets.indexOf(socket);
        sockets.splice(index, 1);
    });
});

server.on('error', function(err) {
    console.log('Server error: ', err.message);
});

server.on('close', function() {
    console.log('Server closed');
});

server.listen(8080);