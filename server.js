const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const errorhandler = require("errorhandler")
const mongoose = require("mongoose")


const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/accounts", (req, res) => {

})