var express = require('express');
var app  = express();
app.use(express.static(__dirname + '/static'));

app.listen(1228, function() {
   console.log("Server started");
});