const faker = require("faker");
const { Client } = require("pg");

const dbOptions = require("../dbConfiguration.js");

const client = new Client(dbOptions);




client.connect()
    .then(()=>{
        console.log("connected to db")
    })
    .catch((e) => {console.log(e)})