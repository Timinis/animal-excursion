'use strict';

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
require('dotenv').config();

const client = new pg.Client(process.env.DATABASE_URL);

client.connect();
let questionList;

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

// Object Creators for detail page render
function AnimalDetail(animalResult) {
  (this.name = animalResult.title), (this.description = animalResult.extract);
}

//function to store the questions in a object oritented format
const animalQuestionDisplay = (array, response) => {
  let sendList = [];
  array.forEach(object => {
    let url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=pageimages&titles=${
      object.name
    }`;
    return superagent.get(url).then(result => {
      let image = Object.values(result.body.query.pages)[0];
      let image_url = image.thumbnail.source;
      image_url = image_url.replace(/\/\w+px/, '/200px');
      object.image_url = image_url;
      sendList.push(object);
      if (sendList.length === array.length) {
        response.send(sendList);
      }
    });
  });
};

function animalDetailDisplay(search) {
  let url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${search}`;
  superagent.get(url).then(result => {
    let description = new AnimalDetail(
      Object.values(result.body.query.pages)[0]
    );
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
