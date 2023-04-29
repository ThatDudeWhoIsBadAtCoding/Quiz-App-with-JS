const fin = document.getElementById("acc");
let account = JSON.parse(localStorage.getItem("account"));
if(!account){
    localStorage.setItem("account", JSON.stringify({type: false}))
}


async function check(){
    account = JSON.parse(localStorage.getItem("account"));
    let highscore = JSON.parse(localStorage.getItem("highscore"));
    console.log(account);
    if(account.type){
        fin.innerHTML = `You have logged in as ${account.name}`
        document.getElementById("high").innerHTML = `Highscore: ${highscore}`
    }
    else{
        fin.innerHTML == "You are logged in as a guest"
        document.getElementById("high").innerHTML = 'Sign up / Login to save you highscores'
    }
}
