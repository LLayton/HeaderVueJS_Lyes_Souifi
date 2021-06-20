const http = require('http');
const express = require('express');
var history = require('connect-history-api-fallback');
const mysql = require('mysql');
var app = express();
app.use(history());
app.use(express.json())
app.use(express.static(__dirname+'/dist'))

app.listen(8080,function(){
    console.log('listening on : 8080');
});


