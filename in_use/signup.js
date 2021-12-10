async function signup() {
    const name = document.getElementById("name").value;
    const pass = document.getElementById("password").value;
    const email = document.getElementById("email").value
    const stats = document.getElementById("status");
    const ip = localStorage.getItem("IP");
    const data = {name, pass, email, ip};
    const opt = {
        method: 'POST', 
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      }
    const resp = await fetch("/signup", opt );
    const res = await resp.json();
    stats.innerHTML = res.found ? "Account Already Exists" : "Check Your E-mail for verification Code"
    if(res.found) return
    let entry = document.getElementById("code");
    entry.classList.remove("hidden")
    let bt = document.getElementById("ss");
    bt.classList.remove("hidden")
    bt.addEventListener("click", (e) => {sign(entry.value, stats, res, name, pass, email, ip)})
}
async function sign(entry, stats, res, name, pass, email, ip){
  console.log(entry, res.code);
  if(entry == res.code){
    const r = await fetch("/signup", {
      method: 'POST', 
      body: JSON.stringify({name, pass, email, ip, verified: true}),
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    })
    const re = await r.json();
    stats.innerHTML = re.msg;
    return setTimeout(() => window.location.assign("/index.html"), 100) 
  }
  else{
    stats.innerHTML = "Incorrect Code"
  }
}
