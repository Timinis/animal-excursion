# Animal Excursion
## Introduction
This site is called Animal Excursion and was built by Jessica Lovell ([see contribution](https://gist.github.com/JessLovell/e15a91ba2d876eb07780e53a9e6772cd)), Timothy Li, and Erin Eckerman. It is deployed on heroku: [here](https://animal-excursion.herokuapp.com/)

## Problem Domain
This project is intended to address a general lack of awareness of what animals are currently endangered in a fun and interactive manner.

## Overview
This project is an educational game intended for use by students in K-12.  The user is given the picture and name of an endangered animal and must click on the map marker that they think corresponds with the animal's home region.

### How to Play
- You are given 5 lives until you're extinct!  
- Click the `Excursion` button on the main page to start playing.
- An image of an animal is presented (you can choose to learn more about that animal or not). Click on the marker on the map that corresponds to the native country of the animal. 
  - For each animal you match to the correct country, you get 100 points. 
  - For every wrong answer, you lose a life.  

## Libraries, Frameworks, and Packages
Developers wishing to work on this further will need to install the following Node dependencies: pg, dotenv, express, and superagent.  The following libraries are also currently referenced: JQuery and Handlebars.

## Database Set-up 
Developers will also need to create a database in their SQL shell with the name of `animalex`.  Once created, run the following command line to create the tables within the database and seed the table with the names of endangered animals: `psql -d animalex -f schema.sql`

## APIs
Animal Excursion relies on two APIs with a total of three API calls.  AE uses a Google Maps API to render the map on the landing page - developers should request their own API key from Google and include that key as `GOOGLE_MAP_API` in their .env file.  AE also uses two Wikipedia API calls to populate the `image_url` and `description` fields in the database (please see the server.js file for details on the url used for the calls).

## Version
This project is currently in version 1.0.0

### Stretch Goals
1. Fix UX/UI for intuitive game flow and indication of correct/incorrect guess.  
2. Scoreboard to show Top 5 players. 
3. If detail view is clicked before guessing the location, give 1/2 points. 
4. More Endangered Animals to game. 
