const mostRecentScore = localStorage.getItem("mostRecentScore");
const displayScore = document.getElementById("finalScore");


if (mostRecentScore == null || mostRecentScore <= 0){
    displayScore.innerText = "You Scored 0 points :C"
}
else {
displayScore.innerText = "Your final score was " + mostRecentScore + " points!";
}