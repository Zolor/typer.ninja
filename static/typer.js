/* In this example, we use a cross-browser solution, because the keyCode property does not work on the onkeypress event in Firefox. However, the which property does.
Explanation of the first line in the function below: if the browser supports event.which, then use event.which, otherwise use event.keyCode */
let word_count = 0;
function myFunction(event) {
  var x = event.which || event.keyCode;
  var textProperty = 'textContent' in document ? 'textContent' : 'innerText';
  console.log(document.getElementById('typer').value.length)
  if (x == 32 && document.getElementById('typer').value.length > 0) {
    let next = word_count + 1;
    document.querySelector(`[word="${next}"]`).classList.add('highlight');
    document.querySelector(`[word="${word_count}"]`).classList.remove('highlight');
    /* Highlight previous word according if it's correctly spelled or not */
    if (document.getElementById('typer').value.trim() == document.querySelector(`[word="${word_count}"]`).innerText) {
        document.querySelector(`[word="${word_count}"]`).classList.add('correct_highlight');
    }
    else {
        document.querySelector(`[word="${word_count}"]`).classList.add('wrong_highlight');
    }
    word_count += 1;
    document.getElementById('typer').value = "";
  }
  /* if user makes a space without written any characters -> reset the input field */
  else if (x == 32 && document.getElementById('typer').value.trim() === "") {
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
}

/* Need to figure out why clearing the field leaves an empty space */