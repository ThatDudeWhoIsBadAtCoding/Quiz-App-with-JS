const express = require("express");
const { createTransport } = require("nodemailer");
const app = express();
app.use(express.json())
app.use(express.static("in_use"))
const Datastore = require("nedb")
const db = new Datastore("database.db");
db.loadDatabase();
app.listen(3000, () => {return})

app.post("/update", (req, res) => {
    const { score } = req.body;
    const { name } = req.body;
    
    db.findOne({user: name}, (err, doc) => {
        console.log(doc);
        if(doc.highscore >= score){
            res.status(200).send({changed: false})
        }
        else{
            let curr = doc.highscore;
            db.update(doc, {$set: {highscore: score}}, {}, (err, num) => {})
            res.status(200).send({changed: true, diff: score - curr})
        }
    })
})

app.post('/login', (req, res) => {
    const user = req.body.name;
    const pass = req.body.pass;
    db.find({user: user}, (err, doc) => {
        if(!doc.length){
            res.status(200).send({found: false})
        }
        else{
            if(pass == doc[0].pass){
            console.log(doc[0].highscore);
            res.status(200).send({found: true, pass_correct: true, highscore: doc[0].highscore});
            }
            else{
                res.status(200).send({found: true, pass_correct: false})
            }
        }
    })
    
})

app.post('/signup', (req, res) => {
    const { email } = req.body;
    const user = req.body.name;
    const { pass } = req.body;
    console.log(email, user, pass);
    db.find({$or : [{email: email}, {user: user}]}, (err, doc) => {
        console.log(doc);
        if(!doc.length){
            if(!req.body.verified){
            let code = Math.floor(Math.random() * (9999 - 1111 + 1) + 1111)
            send(email, code);
            res.status(200).send({found: false, code: code})
            }
        else{
          db.insert({user, email, pass, highscore: 0})
          res.status(200).send({msg: "Verified"})
        }
        }
        else{
            res.status(200).send({found: true})
        }   
            
    })    
})


async function send(mail, code) {
    // create reusable transporter object using the default SMTP transport
    let transporter = createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth: {
        user: /*Your email here*/,
        pass: /*Your password here*/,
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Verification" Your email here', // TODO
      to: mail, // list of receivers
      subject: "Verification mail", // Subject line
      text: "Hello There User!", // plain text body
      html: "Your code is " + code, // html body
    });
  }
  
