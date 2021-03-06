var word_count = 0;
var char_count = 0;
var correct_counter = 0;
var wrong_counter = 0;
var timer = false;
var cd = false;
var seconds = 60;
var y_coordinate;
var scroll_counter = 0;
var word_list = "";
var setval;
var tmp_val = "";

$(document).ready(function(){
    $.get("wordlist",function(data){
      /* Populate the <div class="word_box"> with all the words */
      /* word_list = JSON.parse(data); */
      for (const [key, value] of Object.entries(data)) {
        /* console.log(`${key} ${value}`); */
        $(".word_box").append("<span word="+key+">"+value+"</span>");
        if (key == "0"){
          document.querySelector(`[word="${key}"]`).classList.add('highlight');
        }
      }
    });
});

function myGame(value) {
  var last_char = value.slice(-1);
  if (last_char == " " && document.getElementById('typer').value.length > 1) {
    let next = word_count + 1;
    document.querySelector(`[word="${next}"]`).classList.add('highlight');
    document.querySelector(`[word="${word_count}"]`).classList.remove('highlight');
    /* Highlight previous word according if it's correctly spelled or not */
    if (document.getElementById('typer').value.trim() == document.querySelector(`[word="${word_count}"]`).innerText) {
        document.querySelector(`[word="${word_count}"]`).classList.add('correct_highlight');
        correct_counter ++;
    }
    else {
        document.querySelector(`[word="${word_count}"]`).classList.add('wrong_highlight');
        wrong_counter ++;
    }
    word_count ++;
    document.getElementById('typer').value = "";
    /* Keep track of Y coordinate and scroll text when we reach new line */
    if (getY() > y_coordinate) {
      Scroller(y_coordinate);
    }
    y_coordinate = getY();
    tmp_val = "";
  }
  /* if user makes a space without written any characters -> reset the input field */
  else if (last_char == " " && document.getElementById('typer').value.trim() == "") {
    document.getElementById('typer').value = "";
  }
  /* make a check for every character typed if it's correctly spelled and act accordingly */
  else {
    let str = document.querySelector(`[word="${word_count}"]`).innerText;
    str = str.slice(0, document.getElementById('typer').value.trim().length);
    if (str != document.getElementById('typer').value.trim()) {
      document.querySelector(`[word="${word_count}"]`).classList.add('wrong_highlight');
    }
    else {
      document.querySelector(`[word="${word_count}"]`).classList.remove('wrong_highlight');
    }
  }
  /* Start timer when first input is given */
  if (cd == false) {
    cd = true;
    startTimer();
  }
  if (tmp_val.length < value.length){
    char_count++;
  }
  tmp_val = value;
}

function startTimer() {
  if (timer == false) {
    setval = window.setInterval(Timer, 1000);
    timer = true;
  }
}

function Timer() {
  seconds--;

  if (seconds < 10) {
    seconds = '0'+seconds;
  }
  document.getElementById('timer').innerHTML = (seconds+"s");
  if (seconds == 0) {
    document.getElementById('timer').innerHTML = (seconds+"s");
    clearInterval(setval);
    win_screen()
  }
}

/* Find Y coordinate for the current word/row */
function getY() {
  var elem = document.querySelector(`[word="${word_count}"]`);
  var rect = elem.getBoundingClientRect();
  return rect["y"];
}

/* Take an Y coordinate and adds display: none to the elements matching */
function Scroller(value) {
  for (var i = scroll_counter; i < word_count; i++) {
    document.querySelector(`[word="${i}"]`).setAttribute("style", "display: none;");
    scroll_counter++;
  }
}

function win_screen() {
  document.getElementById('typer').setAttribute("style", "pointer-events: none; background-color: #dddddd; z-index: -1;");
  document.getElementById('game').setAttribute("style", "z-index: -1;");
  document.getElementById('typer').value = "";
  document.getElementById('typer').blur();
  let net_wpm = ((char_count/5)-wrong_counter);
  let acc = (correct_counter / word_count) * 100;
  $('#win_screen').html('<b>Your Net WPM is: </b></br>'+(net_wpm.toFixed(1))+'</br><b>Your Accuracy: </b></br>'+(acc.toFixed(1))+'%</br><button class="retry_button" onclick="reload()">Try Again</button>');
  document.getElementById('win_screen').style.display = "block";
}

function reload() {
  window.location.reload(true);
}