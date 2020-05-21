var word_count = 0;
var correct_counter = 0;
var timer = false;
var cd = false;
var countdown = 60;

function myGame(value) {
  var x = value.slice(-1);
  if (x == " " && document.getElementById('typer').value.length > 1) {
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
  }
  /* if user makes a space without written any characters -> reset the input field */
  else if (x == " " && document.getElementById('typer').value.trim() == "") {
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
    start_time = get_current_time();
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