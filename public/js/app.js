'use strict';
$(document).ready(function() {
  console.log('jquery working');
});

$('#start-game').on('click', startGame);

function startGame(event) {
  event.preventDefault();
  console.log('start game');
  $.ajax({
    url: `/start`,
    method: 'GET'
  }).then(result => compileQuestion(result));
}

function compileQuestion(questions) {
  let template = Handlebars.compile($(`#question-list`).text());
  questions.forEach(element => {
    $(`.question-area`).append(template(element));
  });
}

function renderMap() {
  var map = new google.maps.Map($('#map'));
}
