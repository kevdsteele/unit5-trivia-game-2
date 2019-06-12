$(document).ready(function() {




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

var answers = [];

var correct=0;
var incorrect =0;
var unanswered =0;

var timer=10;
var timerId;
var i=0;

var numQuestions=questions.length;

var beep = document.createElement("audio");
beep.setAttribute("src", "https://www.soundjay.com/button/sounds/beep-02.mp3");

var buzzer = document.createElement("audio");
buzzer.setAttribute("src", "https://www.soundjay.com/misc/sounds/fail-buzzer-04.mp3");
console.log("Number of questions is "+ numQuestions);



$("#play").on("click", playGame);



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
   
    
    console.log(questions[i].Question);
    for (j=0; j < questions[i].choices.length; j++) {
  
      var questionInput = $('<input type ="radio" name ="' + 'q'+ i + '" value="' + questions[i].choices[j] + '">' + questions[i].choices[j] + '</input><br/>');
    questionInput.addClass("radio");

    
    $("#question-choices"+i).append(questionInput);
    console.log(questions[i].choices[j]);}

}


function playGame () {

  
$("#again").css("display", "none");
$("#timer").css("display", "inline-block");
$("#timer").text("10");



$("#questionForm").empty();  

createQuestion(i) ;


 $(".radio").on("click", function() {
  clearInterval(timerId);
var userAnswer=$(this).val();
$("#question-choices"+i).empty();
if (userAnswer === questions[i].Answer) {
 $("#question-choices"+i).text("Correct!");
 correct++;

}else {
  $("#question-choices"+i).text("What??!! The correct answer was " + questions[i].Answer);
incorrect++;
}
var gifImg = $("<img>");
gifImg.attr("src", questions[i].GIFY);
gifImg.addClass("gify");
$("#question"+i).append(gifImg);
i++;
timer=10;
console.log("i is " + i);
console.log("num ques is " + numQuestions);
if (i >= numQuestions) {
setTimeout(endGame, 4000);

} else {
setTimeout(playGame, 4000,i );}






 });
  

clearInterval(timerId);
timerId = setInterval(countdown, 1000);

function countdown () {
  timer--;

  $("#timer").text(timer);

  if (timer < 5 && timer >= 1) {
    beep.play();
  }

  if (timer === 0) {
    buzzer.play();

    
 
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

  
 console.log("Correct " + correct);
 console.log("Incorrect " + incorrect);
 console.log("Unaswered "+ unanswered);

 $("#timer").css("display", "none");
 $("#again").css("display", "inline-block");

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




