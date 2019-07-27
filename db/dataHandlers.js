const { Client } = require('pg');

const dbOptions = require('../dbConfiguration.js');

const client = new Client(dbOptions);

client.connect()
  .then(() => { console.log('server connected to db'); })
  .catch((e) => { console.log('error connecting server to db', e); });


function getFriendList(user_id, cb) {
  client.query(`SELECT friends_list FROM users WHERE user_id = ${user_id}`)
    .then((data) => { cb(data); })
    .catch((e) => { console.log('error getting friend list', e); });
}

function getFriendDataFromList(list, cb) {
  const listString = list.join(', ');
  client.query(`SELECT user_id, name, gift_count, gifts, url FROM users WHERE user_id IN (
         ${listString}
         );`)
    .then((data) => { cb(data); })
    .catch((e) => { console.log(e); });

}

function getGiftList (user_id, cb) {
  client.query(`SELECT gifts FROM users WHERE user_id = ${user_id};`)
    .then((data)=>{ cb(data); })
    .catch((e)=>{ console.log(e); });
}

function getGiftDataFromList(list, cb) {
  let listString = list.join(', ');
  client.query(`SELECT * FROM gifts WHERE gift_id IN (${listString});`)
    .then((data)=>{ cb(data); })
    .catch((e)=>{ console.log(e); });
}

function addGift(user_id, newGift, cb) {
  // adds row to gifts
  // insert into gifts
  // (gift_id, gift_name, type, purchased, archived)
  // VALUES ((select MAX(gift_id) from gifts)+1, 'red pants', 'birthday', false, false);
  // updates the gift count in users
  // UPDATE users SET gift_count =
  // (SELECT gift_count FROM users WHERE user_id = 1)+1 where user_id=1;
  // updates the gift array in users
  // UPDATE users SET gifts[6] = 44 where user_id=1;

  // currently broken at the second then statement, need to fix
  client.query(`INSERT INTO gifts (gift_id, gift_name, type, purchased, archived) VALUES ((SELECT MAX(gift_id) FROM gifts)+1, '${newGift.gift_name}', '${newGift.type}', false, false);`)
    .then(() => {
      return client
        .query(
          `UPDATE users SET gift_count = (SELECT gift_count FROM users WHERE user_id = ${user_id})+1 where user_id=${user_id};`
        )
        .then(() => {
          return client.query(
            `UPDATE users SET gifts[(SELECT gift_count FROM users WHERE user_id=${user_id})] = (SELECT MAX(gift_id) FROM gifts) where user_id=${user_id};`
          )
            .then((response)=>{ cb(response); })
            .catch(e => console.log('error with updating user gift list', e));
        })
        .catch(e => console.log('error with updating gift count', e));
    })
    .catch(e=>(console.log('error with insert into gifts', e)));
}

function getComments(gift_id, cb) {
  client.query(`SELECT * FROM comments WHERE gift_id = ${gift_id}`)
    .then((data) => { cb(data); })
    .catch((e) => { console.log(e); });
}

function postComment(gift_id, newcomment, cb) {
    console.log(newcomment);
  client.query(`INSERT INTO comments (name, comment, timestamp, gift_id) VALUES ('${newcomment.name}', '${newcomment.comment}', ${newcomment.timestamp}, ${newcomment.gift_id});`)
    .then((res) => { cb(res); })
    .catch(e => console.log(e));
}

module.exports = {
  getFriendList,
  getFriendDataFromList,
  getGiftList,
  getGiftDataFromList,
  getComments,
  postComment,
  addGift,
};
