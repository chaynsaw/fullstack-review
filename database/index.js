const mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id:  { type: Number, unique: true },
  owner: String,
  name:  String,
  url: String,
  date: { type: Date, default: Date.now },
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoData, callback) => {
  repoData.forEach((repo) => {
    // console.log(repo.owner.login);
    var newRepo = new Repo();
    newRepo.owner = repo.owner.login;
    newRepo.id = repo.id;
    newRepo.url = repo.html_url;
    newRepo.name = repo.name;
    newRepo.forks = repo.forks;
    newRepo.save((err) => {
      callback(err, repoData);
    })
  })
}

// let find = (top25, callback) => {

// }

  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB  

module.exports.save = save;