var express = require('express');
var app  = express();
app.use(express.static(__dirname + '/static'));

app.listen(process.env.VMC_APP_PORT || 1337, function() {
   console.log("Server started");
});