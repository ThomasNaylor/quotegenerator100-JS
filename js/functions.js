/*
*   QuoteGeneratorJS v1.0
*   Thomas Naylor
*
*   Demonstration of an API call and updating the DOM using Ajax in plain JavaScript
*   API: https://talaikis.com/api/quotes/random/
*/

var quotes = [];
var count = 0;

// ajax call to api to get a random quote
// the api will return one quote at a time.
function getRandomQuote() {
  var apiCall = 'https://talaikis.com/api/quotes/'

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     var request = JSON.parse(this.response);
     quotes.push(request);
     update();
    }
  };

  xhttp.open("GET", apiCall, true);
  xhttp.send();
}

// handles the DOM updates
function update() {
  // get the DOM elements
  var quoteText = document.getElementById('quote__text');
  var authorText = document.getElementById('author__text');
  var twitterShare = document.getElementById('twitter');

  // update the DOM elements with quote text from API response
  quoteText.innerHTML = quotes[0][count].quote;
  authorText.innerHTML = quotes[0][count].author;

  // twitter link update
  var twitterQuote = quoteText.innerHTML
  var twitterAuthor = authorText.innerHTML
  var twitterLink = 'http://www.twitter.com/share?&text='

  twitterLink = twitterLink + twitterQuote.split(' ').join('+');
  twitterShare.href = twitterLink;
}

function forward() {
  if(count === 99) {
    count = 1;
  } else {
    count++;
  }
  update();
}

function back() {
  if(count === 0) {
    count = 99;
  } else {
    count--;
  }
  update();
}

// click event listener to update text
function createEventListener() {
  var nextQuote = document.getElementById('next__button');
  var backQuote = document.getElementById('back__button');

  if(nextQuote.addEventListener) {
    nextQuote.addEventListener('click', forward, false);
  }

  if(backQuote.addEventListener) {
    backQuote.addEventListener('click', back, false);
  }
}

// initialize the DOM with relevant functions
function init() {
  getRandomQuote();
}

// create event listeners when document loads
if(window.addEventListener) {
  window.addEventListener('load', createEventListener, false);
}

init();

/* game-over :) */
