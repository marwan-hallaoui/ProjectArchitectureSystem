//server.js
var app = require('express')();
var http = require('http');
var wrap = http.Server(app);
var io = require('socket.io')(wrap);
var async = require('async');
var broker;
var data = undefined;

var options = {
    host: "localhost",
    port: 8080,
    path: '/rest/',
    method: 'GET'
};

var path = '/rest/';

Refresh = function (render, idSte, socket) {

    if (idSte != null) {
        options.path = path + "societe/" + idSte + '/ordres/';

    } else {
        options.path = path + 'ordre';
    }

    console.log('WS request path ' + options.path);

    var req = http.request(options, function (res) {
        res.setEncoding('utf-8');
        res.on('data', function (ter) {
            data = ter;
            console.log(ter);
        });
        res.on('end', function () {


            if (render != null) {
                render.setHeader('Content-Type', 'application/json');
                render.end(data);
            }

            if (socket != null) {
                socket.emit('update', data);
            }

            if (socket == null && idSte == null) {
                io.sockets.emit('update', data);
            }
        });
    });
    req.end();
};



app.get('/refresh', function (req, res) {

    console.log('[Notification  From WebServiceLayer] Refresh All orders');

    Refresh(res, null, null);

});


io.sockets.on('connection', function (socket) {
    console.log('connection');

    socket.emit('update', data);

    socket.on('update_specific', function (msg) {
        console.log('ID Ste get it ' + msg);
        Refresh(null, msg, socket);
        // Send specific orders
    });


    socket.on('update_all', function () {
        console.log('Update ALL ');
        Refresh(null, null, socket);
        // Send specific orders
    });

});



wrap.listen(3000, function () {
    Refresh(null, null, null);
    console.log('listening on *:3000');
});