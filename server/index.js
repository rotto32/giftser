const express = require('express');
// const { Client } = require('pg');
const db = require('../db/dataHandlers');
const path = require('path');
const cors = require('cors');
const bodyParse = require('body-parser');

const app = express();
// const dbConfig = 'dbConfiguration.js';
const port = 8901;

// const client = new Client(dbConfig);


/*******STATIC SERVE **********/
app.use(express.static(path.join(__dirname, '../public/dist')));
app.use(bodyParse.json());

/********************************/
/****API CALLS FOR DATA *******/
/*******************************/


/******USER TABLE ************/
app.get('/api/friends/:user_id', cors(), (req, res) => {
  db.getFriendList(req.params.user_id, (data) => {
    //console.log(data.rows[0].friends_list);
    db.getFriendDataFromList(data.rows[0].friends_list, (friendData) => {
      res.send(friendData.rows);
    });
  });
});

/***********GIFT TABLE**********/
app.get('/api/gifts/:user_id', cors(), (req, res) => {
  db.getGiftList(req.params.user_id, (data) => {
    db.getGiftDataFromList(data.rows[0].gifts, (giftData) => {
      res.send(giftData.rows);
    });
  });
});

app.post('/api/gifts/:user_id', cors(), (req, res) => {
  db.addGift(req.params.user_id, req.body, (response) => {
    response.user_id = req.params.user_id;
    res.status(201).send(response);
  });
});

/*************COMMENTs TABLE ************/
app.get('/api/comments/:gift_id', cors(), (req, res) => {
  db.getComments(req.params.gift_id, (data) => {
    res.send(data.rows);
  });
});

app.post('/api/comments/:gift_id', cors(), (req, res) => {
  db.postComment(req.params.gift_id, req.body, (response) => {
    res.status(201).send(response);
  });
});

app.listen(port, () => { console.log('Server serving on port ' + port); });
