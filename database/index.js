const mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/fetcher', {useMongoClient: true});

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
  var arrRepos = [];
  repoData.forEach((repo) => {
    // console.log(repo.owner.login);
    var newRepo = new Repo();
    newRepo.owner = repo.owner.login;
    newRepo.id = repo.id;
    newRepo.url = repo.html_url;
    newRepo.name = repo.name;
    newRepo.forks = repo.forks;
    arrRepos.push(newRepo)
  })
  Repo.insertMany(arrRepos, (err, results) => {
    callback(err, results);
  })
}

let getTop25 = (callback) => {
  Repo.find((err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results)
    }
  }).lean().sort({ name: -1 })
}
// let getCount = (callback) => {
//   Repo.count((err, results) => {
//     if (err) {
//       callback(err);
//     } else {
//       callback(null, results)
//     }
//   })
// }
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB  

module.exports.save = save;
module.exports.getTop25 = getTop25;
// module.exports.getCount = getCount;