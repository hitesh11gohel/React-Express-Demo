//init code
const chalk = require('chalk');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 4004;
require('./db/db');
const router = require('./router/router');

//middleware use
app.use(express.json());
app.use(cors());
app.use(router);

//defulat route 
app.get("/",(req,res)=>{
    res.send("error");
})

//create a server
app.listen(PORT, ()=>{
    console.log(chalk.yellowBright.inverse(`Listening at Port : ${PORT}`));
    
});