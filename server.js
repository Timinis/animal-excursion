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
  animalDetailSave();
  animalQuestionDisplay(response);
});

app.get('/score', highScoreSend);

app.get('/details', animalDetails);

app.get('/api-key', (req, res) => {
  res.send(process.env.GOOGLE_MAP_API);
});

app.post('/score-post', (req, res) => {
  saveScoreDB(req.body.name, req.body.score);
});
// Object Creators for detail page render

function animalDetails(request, response) {
  const SQL = `Select * from animals where name=$1;`;
  const value = [request.query.data];

  client
    .query(SQL, value)
    .then(results => response.send(results.rows[0]))
    .catch(console.error);
}

//function to store the questions in a object oritented format
const animalQuestionDisplay = response => {
  let sendList = [];
  let SQL = 'SELECT * FROM animals;';

  return client
    .query(SQL)
    .then(results => {
      if (results.rows[0].image_url === null) {
        results.rows.forEach(object => {
          let lowerName = object.name.toLowerCase();
          lowerName = lowerName.replace(/\s/g, '_');
          lowerName = lowerName.replace(`'`, '%27');
          let url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=pageimages&titles=${lowerName}`;
          return superagent
            .get(url)
            .then(res => {
              let image = Object.values(res.body.query.pages)[0];
              let image_url = image.thumbnail.source;
              image_url = image_url.replace(/\/\w+px/, '/200px');
              object.image_url = image_url;
              sendList.push(object);
              if (sendList.length === results.rows.length) {
                response.send(sendList);
                sendList.forEach(element => {
                  saveImage(element.image_url, element.id);
                });
              }
            })
            .catch(console.error);
        });
      } else {
        response.send(results.rows);
      }
    })
    .catch(console.error);
};

const saveImage = (url, id) => {
  let SQL = `UPDATE animals SET image_url=$1 WHERE id = $2;`;
  let values = [url, id];
  client.query(SQL, values);
};

function animalDetailSave() {
  let SQL = 'SELECT * FROM animals;';
  let emptyArray = [];
  return client.query(SQL).then(result => {
    if (result.rows[0].description === null) {
      result.rows.forEach(object => {
        let lowerName = object.name.toLowerCase();
        lowerName = lowerName.replace(/\s/g, '_');
        lowerName = lowerName.replace(`'`, '%27');
        let url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${lowerName}`;
        superagent
          .get(url)
          .then(res => {
            let description = Object.values(res.body.query.pages)[0].extract;
            object.description = description;
            emptyArray.push(object);
            if (emptyArray.length === result.rows.length) {
              emptyArray.forEach(element => {
                saveDetails(element.description, element.id);
              });
            }
          })
          .catch(console.error);
      });
    }
  });
}

const saveDetails = (description, id) => {
  let SQL = `UPDATE animals SET description=$1 WHERE id=$2;`;
  let values = [description, id];
  client.query(SQL, values);
};

const saveScoreDB = (name, scores) => {
  let SQL = `INSERT INTO highscore (name,score) VALUES ($1,$2)`;
  let values = [name, scores];
  return client.query(SQL, values);
};

function highScoreSend(request, response) {
  const SQL = 'Select * from highscore ORDER BY score DESC';
  return client.query(SQL).then(result => {
    let scoreList = result.rows;
    response.send(scoreList);
  });
}

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
