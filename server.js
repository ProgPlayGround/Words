var express = require('express');

var app = express();

var PORT = process.env.PORT || 8000

app.use(express.static('app'));

app.listen(PORT, function () {
  console.log('Express server is up on port ', PORT);
});
