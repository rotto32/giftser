const { Client } = require('pg');

const dbOptions = require('../dbConfiguration.js');

const client = new Client(dbOptions);

client.connect()
    .then(() => {console.log('server connected to db')})
    .catch((e) => {console.log('error connecting server to db', e)})


function getFriendList (user_id, cb) {
    client.query(`SELECT friends_list FROM users WHERE user_id = ${user_id}`)
        .then((data) => {cb(data)})
        .catch((e)=> {console.log('error getting friend list', e)})
}

function getFriendDataFromList (list, cb) {
    let listString = list.join(', ');  
     client.query(`SELECT user_id, name, gift_count, gifts FROM users WHERE user_id IN (
         ${listString}
         );`)
        .then((data) => {cb(data)})
        .catch((e)=>{console.log(e)})

}

function getGiftList (user_id, cb) {
    client.query(`SELECT gifts FROM users WHERE user_id = ${user_id};`)
        .then((data)=>{cb(data)})
        .catch((e)=>{console.log(e)})
}

function getGiftDataFromList (list, cb) {
    let listString = list.join(', ');
    client.query(`SELECT * FROM gifts WHERE gift_id IN (${listString});`)
        .then((data)=>{cb(data)})
        .catch((e)=>{console.log(e)})
}

module.exports = { getFriendList, getFriendDataFromList, getGiftList, getGiftDataFromList };