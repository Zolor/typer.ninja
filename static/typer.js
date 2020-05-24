var word_count = 0;
var correct_counter = 0;
var timer = false;
var cd = false;
var countdown = 60;
var y_coordinate;
var scroll_counter = 0;
var word_list = "";

$(document).ready(function(){
  /* $("button").click(function(){  <- This is for when we implement reload button*/
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
  /* }); */
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
    }
    word_count ++;
    document.getElementById('typer').value = "";
    /* Keep track of Y coordinate and scroll text when we reach new line */
    if (getY() > y_coordinate) {
      Scroller(y_coordinate);
    }
    y_coordinate = getY();
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
}

function startTimer() {
  if (timer == false) {
    setval = window.setInterval(Timer, 1000);
    timer = true;
  }
}

function Timer() {
  countdown--;
  var minute;
  var seconds;
  minute = Math.floor(countdown / 60);
  seconds = countdown % 60;

  if(seconds < 10) {
    seconds = '0'+seconds;
  }
  document.getElementById('timer').innerHTML = (minute+":"+seconds);

  if(countdown > 9) {
    document.getElementById('timer').innerHTML = ("0:"+countdown);
  }

  else if(countdown > 0){
    document.getElementById('timer').innerHTML = ("0:0"+countdown);
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
