/* In this example, we use a cross-browser solution, because the keyCode property does not work on the onkeypress event in Firefox. However, the which property does.
Explanation of the first line in the function below: if the browser supports event.which, then use event.which, otherwise use event.keyCode */
let word_count = 0;
function myFunction(event) {
  var x = event.which || event.keyCode;
  var textProperty = 'textContent' in document ? 'textContent' : 'innerText';
  if (x == 32) {
    let next = word_count + 1;
    document.querySelector(`[word="${next}"]`).classList.add('highlight');
    document.querySelector(`[word="${word_count}"]`).classList.remove('highlight');

    if (document.getElementById('typer').value.trim() == document.querySelector(`[word="${word_count}"]`).innerText) {
        document.querySelector(`[word="${word_count}"]`).classList.add('correct_highlight');
    }
    else {
        document.querySelector(`[word="${word_count}"]`).classList.add('wrong_highlight');
    }
    word_count += 1;
    document.getElementById('typer').value = '';
  }
}