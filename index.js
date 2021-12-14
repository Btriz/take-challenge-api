const cors = require('cors');
const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extend: true }));

const githubURL = 'https://api.github.com/orgs/takenet/repos?sort=created&direction=asc&per_page=100';

app.get('/', (req, res) => {
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

app.listen(3000, () => {
  console.log('Aplicação ouvindo na porta 3000');
});
