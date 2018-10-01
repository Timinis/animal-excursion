'use strict';

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

function AnimalDetail(animalResult) {
  (this.name = animalResult.title), (this.description = animalResult.extract);
}

function animalQuestionDisplay(object) {
  let url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=pageimages&titles=${object}`;
  superagent.get(url).then(result => {
    let image = Object.values(result.body.query.pages)[0];
    let image_url = image.thumbnail.source;
    console.log({ name: object, image_ur: image_url });
  });
}

function animalDetailDisplay(search) {
  let url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${search}`;
  superagent.get(url).then(result => {
    let description = new Animal(Object.values(result.body.query.pages)[0]);
    return description;
  });
}

animalQuestionDisplay(`monkey`);
