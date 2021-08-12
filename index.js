const axios = require("axios");

const express = require("express");

const app = express();

 
app.get('/app.js', function(req, res) {
    res.set('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/app.js');
  });
 
app.use('/style',express.static(__dirname +'/style'));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function () {
    console.log("Server is running on localhost3000");
});

