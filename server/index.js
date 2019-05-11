const express = require('express');
let app = express();
var github = require('../helpers/github')
var bodyParser = require('body-parser')
var cors = require('cors')
var db = require('../database/index')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());

app.post('/repos', function (req, res) {
  // console.log(req.body);
  github.getReposByUsername(req.body.username, (error, response) => {
    if(error) {
      throw error;
    } else {
      // console.log(response.body);
      var repoData = JSON.parse(response.body);
      db.save(repoData, (err) => {
        if(err) {
          throw err;
        }
        res.json('success');
      })
    }
  })
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  res.json('get success');
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

