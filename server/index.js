const express = require('express');
// const { Client } = require('pg');
const db = require('../db/dataHandlers');
const path = require('path');

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
app.get('/api/friends/:user_id', (req, res) => {
    db.getFriendList(req.params.user_id, (data) => {
        //console.log(data.rows[0].friends_list);
        db.getFriendDataFromList(data.rows[0].friends_list, (friendData) => {
            res.send(friendData.rows);
        })
       
       
    })
      
})



app.listen(port,  ()=>{console.log('Server serving on port ' + port)});