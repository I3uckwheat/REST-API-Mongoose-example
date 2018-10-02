const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const errorhandler = require("errorhandler")
const mongoose = require("mongoose")
const PORT = 3333 || process.env.PORT;

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(errorhandler())

mongoose.connect("mongodb://localhost/finalTest", { useMongoClient: true })
mongoose.Promise = global.Promise

const Account = mongoose.model("Account", {
  name: String,
  balance: Number
})

app.get("/accounts", (req, res) => {
  Account.find({}, (err, docs)=>{
    if(err) {
      console.error(err)
      res.send("ERROR")
    } else {
      res.send(docs);
    }
  })
})

app.post("/accounts", (req, res) => {
  const newAccount = new Account (req.body);
  newAccount.save((err, result) => {
    if(err) console.error(err)
    res.send(`\nPost saved! \n ${result} \n`)
  })
})

app.put("/accounts/:id", (req, res) => {
  const accountId = req.params.id;
  Account.findById(accountId, (err, doc) => {
    if(err) console.error(err)
    for(let key in req.body) {
      doc[key] = req.body[key]
    }
    doc.save()
  })
  res.send("Updated");
})

app.delete("/accounts/:id", (req, res) => {
  Account.findById(req.params.id, (err, doc) => {
    doc.remove((err, product)=> {
      if(err) console.error(err)
    })
  }) 
  res.send("Removed")
})

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
