const mostRecentScore = localStorage.getItem("mostRecentScore");
const displayScore = document.getElementById("finalScore");


if (mostRecentScore == null || mostRecentScore <= 0){
    displayScore.innerText = "You Scored 0 points :C"
}
else {
    let url_str = window.location.href;
    const url = new URL(url_str);
    const diff = url.searchParams.get("diff");
    if(diff == null){
        displayScore.innerText = "Your final score was " + mostRecentScore + " points!\nLog in to save you score!";
    }
    else{
        displayScore.innerText = `Your final score was ${mostRecentScore} points! \n You beat your highscore by 
        ${diff} points!`;
        update(false);
    }
}
