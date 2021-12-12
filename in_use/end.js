const displayScore = document.getElementById("finalScore");
const url_str = window.location.href;
const url = new URL(url_str);
const diff = url.searchParams.get("diff");
const mostRecentScore = url.searchParams.get("mostRecentScore");


if (mostRecentScore == null || mostRecentScore <= 0){
    displayScore.innerText = "You Scored 0 points :C"
}
else {
    
    if(diff == null){
        displayScore.innerText = "Your final score was " + mostRecentScore + " points!\nLog in to save you score!";
    }
    else{
        displayScore.innerText = `Your final score was ${mostRecentScore} points! \n You beat your highscore by 
        ${diff} points!`;
        update(false);
    }
}
