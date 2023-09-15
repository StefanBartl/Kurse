// Function for change the image in hobbys.html
function changeImg(e){
      
  // Get the image element and the corespondend figcaption 
  let image = document.querySelector('#hobbys_img');
  let figcaption = document.querySelector('figcaption');
  // Get the value of the user choice
  let choice = e.value
  // Check the user choice against the Strings and respond with matching image and text
  switch(choice){
      case 'Bass':
          image.src = '../graphics/bass.jpg';
          figcaption.innerHTML = "Bass";
          break;
      case 'E-Guitar':
          image.src = '../graphics/eguitar.jpg';
          figcaption.innerHTML = "E-Guitar";
          break;
      case 'Western':
          image.src = '../graphics/western.jpeg';
          figcaption.innerHTML = "Western";
          break;
      case 'Ukelele':
          image.src = '../graphics/ukelele.jpg';
          figcaption.innerHTML = "Ukelele";
          break;
  }
}


// Function for the quiz in work.html

function changeColor(e)
{
    // First set back the colors of the buttons from clicking before, so grap all related buttons
    const quiz_buttons = document.querySelectorAll('.quiz_button');
    // Go to the returned node-list and set the elements back
    quiz_buttons.forEach((el) => {
         el.style.color = 'white';
        });

    
    // Grap the heading element for altering answer
    let answer1 = document.querySelector('#quiz_answer1');
    let answer2 = document.querySelector('#quiz_answer2');
    let answer3 = document.querySelector('#quiz_answer3');

    // Question 1
    // Check if answer is correct
    if(e.classList.contains("q1_button")){
        if(e.classList.contains("q1_button") && e.value != '25')
        {
            // If not, change color and the text in answer
            e.style.color = 'red';
            answer1.innerHTML = "Incorrect";
        }
        else if(e.classList.contains("q1_button") && e.value == '25')
        {
            // If correct, also change color and the text in answer
            e.style.color = 'green';
            answer1.innerHTML = "Correct: 25";
        }
    }


    // Question 2
    if(e.classList.contains("q2_button")){
        if(e.classList.contains("q2_button") && e.value != '40')
        {
            // If not, change color and the text in answer
            e.style.color = 'red';
            answer2.innerHTML = "Incorrect";
        }
        else if(e.classList.contains("q2_button") && e.value == '40')
        {
            // If correct, also change color and the text in answer
            e.style.color = 'green';
            answer2.innerHTML = "Correct: 40";
        }
    }

    // Question 3
    if(e.classList.contains("q3_button")){
        if(e.classList.contains("q3_button") && e.value != '150')
        {
            // If not, change color and the text in answer
            e.style.color = 'red';
            answer3.innerHTML = "Incorrect";
        }
        else if(e.classList.contains("q3_button") && e.value == '150')
        {
            // If correct, also change color and the text in answer
            e.style.color = 'green';
            answer3.innerHTML = "Correct: 150";
        }
    }

    // Check for all answers correct
    if(answer1.innerHTML == "Correct: 25" && answer2.innerHTML == "Correct: 40" && answer3.innerHTML == "Correct: 150") {
        document.querySelector("#quiz_con").innerHTML = "Congratulations, all answers are correct!";
        document.querySelector("#quiz_con").classList.add('quiz_correct');
    }



}


// Function for Part 2
function confirmFree()
{
    // Get the text field and the answers elements of this section
    let text_field = document.querySelector('#free_text');
    let free_answer = document.querySelector('#free_answer');
    // Check if user provided correct answer
    if(text_field.value != "Red")
    {
    // If not, alter text and answer field
    text_field.style.color = "Red";
    free_answer.innerHTML = "Incorrect";
    }
    else
    {
    // if correct, also alter it
    text_field.style.color = "Green";
    free_answer.innerHTML = "Correct";
    }
}