const routes = require('express').Router();
const fetch = require('node-fetch');

const githubURL = 'https://api.github.com/orgs/takenet/repos?sort=created&direction=asc&per_page=100';

routes.get('/', (req, res) => {
  fetch(githubURL)
  .then((response) => {
    if (response.ok) {
      return response;
    } else {
      throw new Error (`The HTTP status of the reponse: ${res.status}`)
    }
  })
  .then((response) => response.json())
  .then((json) => json.filter((repo) => repo.language === 'C#'))
  .then((repos) => res.status(200).send(repos
    .slice(0, 5)
    .map((repo) => (
      {
        'image': repo.owner.avatar_url,
        'name': repo.name,
        'description': repo.description
      }
    ))
  ));
});

module.exports = routes;
