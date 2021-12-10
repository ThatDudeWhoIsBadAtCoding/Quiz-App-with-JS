let buttons = Array.from(document.getElementsByClassName("home"));
const fin = document.getElementById("acc");

buttons.forEach((btn) => {
    btn.addEventListener('click', e => {
        if(fin.innerHTML == "You aren't signed into an account yet") return e.preventDefault()
    })
})
async function check(){
let url_string = window.location.href;
let url = new URL(url_string);
let name = url.searchParams.get("acc");
let highscore = url.searchParams.get("highscore");
if(highscore != null){
    localStorage.removeItem("highscore")
    localStorage.setItem("highscore", highscore);
}
name =  name == null ? localStorage.getItem("name"): name
highscore =  highscore == null ? localStorage.getItem("highscore"): localStorage.getItem("highscore") == null ? null: localStorage.getItem("highscore")
console.log(highscore, name);
if(name != null){
    localStorage.removeItem("name")
    localStorage.setItem("name", name)
    fin.innerHTML = `You have logged in as ${name}`
    document.getElementById("high").innerHTML = `Highscore: ${highscore}`
}
else{
    fin.innerHTML == "You aren't signed into an account yet"
    document.getElementById("high").innerHTML = ''
}
}