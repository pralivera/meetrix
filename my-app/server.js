const express = require('express');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  
  res.send({ express: 'Hello From Express' });
});

app.post('/api/validatetoken', (req, res) => {
    console.log(req.body);
    var decoded = jwt.verify(req.body.token, 'f!sJ4T9W~LL%4Jt#');
    res.send(
      { username : decoded.username}
    );
  });


app.listen(port, () => console.log(`Listening on port ${port}`));