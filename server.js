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

<<<<<<< HEAD
=======
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

let questionList;

>>>>>>> a74b75e5bbdc1d903a0400ed88577ffb5c9845d7
function AnimalDetail(animalResult) {
  (this.name = animalResult.title), (this.description = animalResult.extract);
}

<<<<<<< HEAD
function animalQuestionDisplay(object) {
  let url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=pageimages&titles=${object}`;
  superagent.get(url).then(result => {
    let image = Object.values(result.body.query.pages)[0];
    let image_url = image.thumbnail.source;
    image_url = image_url.replace(/\/\w+px/, '/200px');
    console.log({ name: object, image_ur: image_url });
=======
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
>>>>>>> a74b75e5bbdc1d903a0400ed88577ffb5c9845d7
  });
}

function animalDetailDisplay(search) {
  let url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${search}`;
  superagent.get(url).then(result => {
    let description = new Animal(Object.values(result.body.query.pages)[0]);
    return description;
  });
}

<<<<<<< HEAD
animalQuestionDisplay(`monkey`);
=======
function dataPull() {
  const SQL = 'Select * from animals';
  return client.query(SQL).then(result => {
    questionList = result.rows;
    return questionList;
  });
}

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
>>>>>>> a74b75e5bbdc1d903a0400ed88577ffb5c9845d7
