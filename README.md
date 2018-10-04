** Introduction **
This site is called Animal Excursion and was built by Jessica Lovell, Timothy Li, and Erin Eckerman.  

** Overview **
This project is an educational game intended for use by students in K-12.  The user is given the picture and name of an endangered animal and must click on the map marker that they think corresponds with the animal's home region. 

** Problem Domain **
This project is intended to address a general lack of awareness of what animals are currently endangered in a fun and interactive manner.

** Version **
This project is currently in version 1.0.0

** Libraries, Frameworks, and Packages **
Developers wishing to work on this further will need to install the following dependencies: pg, dotenv, express, and superagent.  The following libraries are also currently referenced: JQuery and Handlebars.

** Database Set-up **
Developers will also need to create a database in their SQL shell with the name of animalex.  Once created, run the following command line to create the tables within the database and seed the table with the names of endangered animals: psql -d animalex -f schema.sql

** APIs **
Animal Excursion relies on two APIs with a total of three API calls.  AE uses a Google Maps API to render the map on the landing page - developers should request their own API key from Google and include that key as "GOOGLE_MAP_API" in their .env file.  AE also uses two Wikipedia API calls to populate the image_url and description fields in the database (please see the server.js file for details on the url used for the calls).
