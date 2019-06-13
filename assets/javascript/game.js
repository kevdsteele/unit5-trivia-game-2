$(document).ready(function() {



/* array of object for trivia questions, choices, answers and giphys */
var questions = [ {Question: "Which MCU movie featured Spider-Man’s first appearance?", choices: ["Spider-Man: Homecoming","Avengers: Age of Ultron", "Iron Man 3", "Captain America: Civil War"], Answer: "Captain America: Civil War", GIFY:"https://media.giphy.com/media/mBqeXY7DJThAc/giphy.gif"} , 
                 {Question: "Who played the Hulk before Mark Ruffalo?", choices: ["Liam Hemsworth","Gary Oldman", "Edward Norton", "Will Smith"], Answer: "Edward Norton", GIFY: "https://media.giphy.com/media/aS8ypUweGOXMA/giphy.gif"},
                 {Question: "What is the name of Thor’s hammer?", choices: ["Balder","Vanir", "Aesir", "Mjolnir"], Answer: "Mjolnir", GIFY: "https://media.giphy.com/media/xUPGGdn5TaL8Mfpwwo/giphy.gif"},
                 {Question: "Where did Scott Lang work before becoming Ant-Man?", choices: ["Jamba Juice","Chipotle", "McDonald’s", "Baskin Robbins"], Answer: "Baskin Robbins", GIFY:"https://media.giphy.com/media/VIybTqiAz8E5W/giphy.gif"},
                {Question: "What does Stark Industries manufacture in Iron Man 1?", choices: ["Weapons","Buildings", "Pharmaceuticals", "Chemicals"], Answer: "Weapons", GIFY:"https://media.giphy.com/media/103liSxCY1NpLO/giphy.gif"},
                {Question: "Which war did Captain America fight in?", choices: ["World War I","World War II", "Iraq War", "Vietnam War"], Answer: "World War II", GIFY:"https://media.giphy.com/media/5hbbUWcuvtoJGx5fQ4/giphy.gif"},
                {Question: "What is Peter Quill’s alter ego?", choices: ["Star-Lord","Star-Dude", "Star-Man", "Star-Killer"], Answer: "Star-Lord", GIFY:"https://media.giphy.com/media/wv34jEfv17OmI/giphy.gif"},
                {Question: "What legislation requires superhumans to be governed by law?", choices: ["Paris accord","Crimea accord", "Latveria accord", "Sokovia accord"], Answer: "Sokovia accord", GIFY:"https://media.giphy.com/media/thefKPKHCMrBu/giphy.gif"},
                {Question: "What Nazi organization infiltrated SHIELD?", choices: ["EMPUSA","HYDRA", "CHIMERA", "SPHINX"], Answer: "HYDRA", GIFY:"https://media.giphy.com/media/3osxYnD09WU6e3xdZu/giphy.gif"},
                {Question: "Who is Thor’s father?", choices: ["Loki","Hela", "Korg", "Odin"], Answer: "Odin", GIFY:"https://media.giphy.com/media/e7c7ZcImEAp8c/giphy.gif"},
                {Question: "Who is the main villain in Spider-Man: Homecoming?", choices: ["Venom","Mysterio", "Vulture", "Kraven"], Answer: "Vulture", GIFY:"https://media.giphy.com/media/3o7aD2KGnaCorRQrSM/giphy.gif"},
                {Question: "Which of these movies came first?", choices: ["Captain America: Civil War","Ant-Man", "Guardians of the Galaxy Vol. 2", "Doctor Strange"], Answer: "Ant-Man", GIFY:"https://media.giphy.com/media/saXRgb0GoO1wc/giphy.gif"},
                {Question: "Who has the Infinity Gauntlet?", choices: ["Helmut Zemo","The Mandarin", "Thanos", "Ulysses Klaw"], Answer: "Thanos", GIFY:"https://media.giphy.com/media/3oxHQjRHcp4w9oi24M/giphy.gif"},
                {Question: "Where is Black Panther from?", choices: ["Nakia","T'Chaka", "Wakanda", "T'Challa"], Answer: "Wakanda", GIFY:"https://media.giphy.com/media/SJCUEMsOm03EV3a7nn/giphy.gif"},
                {Question: "Who plays Nick Fury?", choices: ["Morgan Freeman","Samuel L. Jackson", "Laurence Fishburne", "Denzel Washington"], Answer: "Samuel L. Jackson", GIFY:"https://media.giphy.com/media/PnwcgZJZ8jdbq/giphy.gif"}]


/* variables to track score*/
var correct=0;
var incorrect =0;
var unanswered =0;

/*timer variables*/
var timer=10;
var timerId;

/* Variables to control manual loop through questions */
var i=0;
var numQuestions=questions.length;

/* Variables for sound on time countdown*/
var beep = document.createElement("audio");
beep.setAttribute("src", "https://www.soundjay.com/button/sounds/beep-02.mp3");

var buzzer = document.createElement("audio");
buzzer.setAttribute("src", "https://www.soundjay.com/misc/sounds/fail-buzzer-04.mp3");
console.log("Number of questions is "+ numQuestions);




/*Listen for clicl to begin game  */
$("#play").on("click", playGame);


/*Create question */
function createQuestion (i) {
 $("#questionForm").empty();
  var questionDiv =$("<div>");
  questionDiv.attr("id", "question"+i);
  var questionText = $("<div>");
    questionText.attr("id", "question-text"+i);
    questionDiv.addClass("question");
    questionText.text(questions[i].Question);
    $("#questionForm").append(questionDiv);
    $("#question"+i).append(questionText);
    var choicesDiv=$("<div>");
    choicesDiv.addClass("choices");
    choicesDiv.attr("id", "question-choices"+i);
    $("#question"+i).append(choicesDiv);
   
    
    /*Loop through creating choices */
    for (j=0; j < questions[i].choices.length; j++) {
  
    /*Create radio buttons */
    var questionInput = $('<input type ="radio" name ="' + 'q'+ i + '" value="' + questions[i].choices[j] + '">' + questions[i].choices[j] + '</input><br/>');
    questionInput.addClass("radio");
    $("#question-choices"+i).append(questionInput);
    }

}

/*Function to begin game play */
function playGame () {

/*Hide play again button and show timer */  
$("#again").css("display", "none");
$("#timer").css("display", "inline-block");
$("#timer").text("10");


/*Make sure question ares is clered each pass */
$("#questionForm").empty();  

/*Call question function with for question array  with current i value */
createQuestion(i) ;


/*Capture the choice and compare to answer */
 $(".radio").on("click", function() {
  /*Stop timer */
  clearInterval(timerId);
var userAnswer=$(this).val();
$("#question-choices"+i).empty();
if (userAnswer === questions[i].Answer) {
  
 $("#question-choices"+i).text("Good job! The correct answer was " + questions[i].Answer);
 /*Increase correct count */
 correct++;

}else {
  $("#question-choices"+i).text("What??!! The correct answer was " + questions[i].Answer);
/* Increase incorrect count*/
  incorrect++;
}

/*Create giphy placeholder and get image from array */
var gifImg = $("<img>");
gifImg.attr("src", questions[i].GIFY);
gifImg.addClass("gify");
$("#question"+i).append(gifImg);

/*Increase i for next questions */
i++;

/*Reset timer for next question */
timer=10;

/*Check for end of Game and call function else continue playing sending i for next question */
if (i >= numQuestions) {
setTimeout(endGame, 3000);

} else {
setTimeout(playGame, 3000,i );}






 });
  

 /* Time functionality */
clearInterval(timerId);
timerId = setInterval(countdown, 1000);

function countdown () {
  timer--;

  $("#timer").text(timer);

  /*Play beep when below 5 seconds */
  if (timer < 5 && timer >= 1) {
    beep.play();
  }

  /*Play buzzer if timer reaches 0 */
  if (timer === 0) {
    buzzer.play();

    /*Process unaswered question*/
 
    clearInterval(timerId);
    $("#question-choices"+i).empty();
    $("#question-choices"+i).text("Times up! The annswer was " + questions[i].Answer) ;
    var gifImg = $("<img>");
    gifImg.attr("src", questions[i].GIFY);
    gifImg.addClass("gify");
    $("#question"+i).append(gifImg);
    i++;
    unanswered++;
    timer=10;

if (i >= numQuestions) {
  setTimeout(endGame, 4000);
  
  } else {
  setTimeout(playGame, 4000,i );}
    
  }

}
}
  
  
  

/*function to process end of game */
function endGame() {

clearInterval(timerId);
  
  

var resultDiv=$("<div>");
resultDiv.attr("id", "results")

var correctDiv =$("<div>");
correctDiv.addClass("center-results");
var incorrectDiv=$("<div>");
incorrectDiv.addClass("center-results");
var unansweredDiv=$("<div>");
unansweredDiv.addClass("center-results");
var gifImg = $("<img>");
gifImg.attr("src", "https://media.giphy.com/media/d3yvDeQ9fES0JTfG/giphy.gif");
gifImg.addClass("gify");


correctDiv.text("You answered " + correct+ " correct");
incorrectDiv.text("You answered " + incorrect+ " incorrect");
unansweredDiv.text("You did not answer " + unanswered + " questions");
$("#questionForm").empty();
$("#questionForm").append(resultDiv);
$("#results").append(correctDiv, incorrectDiv, unansweredDiv,gifImg);

  
 /* Process for play again by hiding timer and showing button*/

 $("#timer").css("display", "none");
 $("#again").css("display", "inline-block");

 /*reset variables to play again without refreshing page */
 $("#again").on("click",function() {
timer=10;
i=0;
correct=0;
incorrect=0;
unanswered=0;
playGame(i);


 });
  
  
};
  





});




