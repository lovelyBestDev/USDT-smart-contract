var express = require('express');
var app = express();
app.use(express.static(__dirname));
app.listen('3001');
console.log('Running at\nhttp://192.168.116.157:3001');