function login(){
const name = document.getElementById("name").value;
const pass = document.getElementById("password").value;
const stats = document.getElementById("status");
const data = {name, pass};
const success = `You have logged in as ${name}`
const wrong = 'Your password was wrong'
const fail = `${name} doesn't exist, please sign-up`

const headers = {
    method: 'POST', 
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
  }
fetch("/login", headers).then(res =>{
    return res.json()
}).then(async data => {
  console.log(data);
  stats.innerHTML = !data.found ? fail : !data.pass_correct ? wrong : success
  if(!data.found || !data.pass_correct) return
  return data
}).then((data) => {
  setTimeout(function() {
    localStorage.clear();
    console.log(data.highscore)
    window.location.assign(`/index.html?acc=${name}&highscore=${data.highscore}`)
  }, 1)
})
}


