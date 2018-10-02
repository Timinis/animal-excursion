'use strict';
//All the dependencies
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
require('dotenv').config();

const client = new pg.Client(process.env.DATABASE_URL);

client.connect();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

//routes
app.get('/', (request, response) => {
  response.sendFile('index.html', { root: './public' });
});

app.get('/start', (request, response) => {
  dataPull().then(list => {
    animalQuestionDisplay(list, response);
  });
});

app.get('/start', (request) => animalDetailDisplay(request));

// Object Creators for detail page render

let questionList;

function AnimalDetail(animalResult) {
  (this.name = animalResult.title), (this.description = animalResult.extract);
}

//function to store the questions in a object oritented format
const animalQuestionDisplay = (array, response) => {
  let sendList = [];
  array.forEach(object => {
    let lowerName = object.name.toLowerCase();
    lowerName = lowerName.replace(/\s/g, '_');
    lowerName = lowerName.replace(`'`, '%27');
    let url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=pageimages&titles=${lowerName}`;
    return superagent
      .get(url)
      .then(result => {
        let image = Object.values(result.body.query.pages)[0];
        let image_url = image.thumbnail.source;
        image_url = image_url.replace(/\/\w+px/, '/200px');
        object.image_url = image_url;
        sendList.push(object);
        if (sendList.length === array.length) {
          response.send(sendList);
        }
      })
      .catch(console.error);
  });
}

function animalDetailDisplay(search) {
  let lowerName = search.name.toLowerCase();
  lowerName = lowerName.replace(/\s/g, '_');
  lowerName = lowerName.replace(`'`, '%27');
  let url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${lowerName}`;
  superagent.get(url).then(result => {
    let description = new AnimalDetail(Object.values(result.body.query.pages)[0]);
    return description;
  });
}

function dataPull() {
  const SQL = 'Select * from animals';
  return client.query(SQL).then(result => {
    questionList = result.rows;
    return questionList;
  });
}

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
