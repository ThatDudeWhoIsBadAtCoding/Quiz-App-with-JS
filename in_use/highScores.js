const highScoresList = document.getElementById("highScoresList");
var dupe;
const update = async (source) => {
  const re = await fetch("/all");
  const res = await re.json();
  let counter = 0;
  res.docs.sort((a, b) => a.highscore - b.highscore);
  let arr = res.docs.reverse();
  dupe = arr.map(score => {
  if(counter >= 5) return
  counter += 1
  return `<li class = "high-scores">${score.user} - ${score.highscore}</li>`
}).join("")
  if(source){
      highScoresList.innerHTML = dupe
  }
}
