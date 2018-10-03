'use strict';
$(document).ready(function() {
  console.log('jquery working');
  displayDetail();
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
  $('.detail').on('click', function(event){
    let value=event.target.id;
    localStorage.setItem('name', value);
    window.location.href='/pages/details.html';
    $.ajax({
      url: '/details',
      method: 'GET'
    })
      .then(result => displayDetail(result));
  });
}

function displayDetail(animal) {
  let template = Handlebars.compile($('#animal-template').text());
  $('#detail-container').append(template(animal));
}

// function renderMap() {

//   var map = new google.maps.Map($('#map'), {zoom: 2, center:});
// }


// 'use strict';


// $('.add').on('click', function(){
//   $(this).next().removeClass('hidden');
// });
