var PORT = process.ENV.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname+'/public'));

http.listen(function () {
    console.log('Server started');
});
