const express = require('express');
// const { Client } = require('pg');
const db = require('../db/dataHandlers');
const path = require('path');
const cors = require("cors");

const app = express();
// const dbConfig = 'dbConfiguration.js';
const port = 8901;

// const client = new Client(dbConfig);


/*******STATIC SERVE **********/
app.use(express.static(path.join(__dirname, "../public/dist")));



/********************************/
/****API CALLS FOR DATA *******/
/*******************************/


/******USER TABLE ************/
app.get('/api/friends/:user_id', cors(), (req, res) => {
    db.getFriendList(req.params.user_id, (data) => {
        //console.log(data.rows[0].friends_list);
        db.getFriendDataFromList(data.rows[0].friends_list, (friendData) => {
            res.send(friendData.rows);
        })
    })
});

/***********GIFT TABLE**********/
app.get('/api/gifts/:user_id', cors(), (req, res) => {
    db.getGiftList(req.params.user_id, (data) => {
        db.getGiftDataFromList(data.rows[0].gifts, (giftData) => {
            res.send(giftData.rows);
        })
    })
})




app.listen(port,  ()=>{console.log('Server serving on port ' + port)});