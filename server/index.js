const express = require('express');
let app = express();
var github = require('../helpers/github')
var bodyParser = require('body-parser')
var cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());

app.post('/repos', function (req, res) {
  console.log(req.body);
  github.getReposByUsername(req.body.username, (error, response) => {
    if(error) {
      throw error;
    } else {
      console.log(response.length);
      res.json(response.body.length);
    }
  })
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

