const faker = require("faker");
const { Client } = require("pg");

const dbOptions = require("../dbConfiguration.js");

const client = new Client(dbOptions);

client.connect();



function createUser (i) {
    let user = {
        user_id: i,
        name: "'"+ faker.name.findName() + "'",
        url: "'" + faker.image.avatar() + "'",
        gift_count: faker.random.number(20),
        friend_count: faker.random.number(50)
    };

    let giftArr = [];
    let friendArr = [];
    function recurse(arr) {
        let tempNum = faker.random.number(1000);
        if (arr.includes(tempNum)) {
            recurse(arr);
        } else {
            arr.push(tempNum);
            return;
        }
    }

    for (var i = 0; i < user.gift_count; i++) {
        recurse(giftArr);
    }

    for (var i = 0; i < user.friend_count; i++) {
        recurse(friendArr);
    }
    user.gifts = "ARRAY[" + giftArr + "]";
    user.friends_list = "ARRAY[" + friendArr + "]";
    return user;
}

function createGift (j) {
    function createType () {
        let types= [
            'birthday', 
            'christmas', 
            'anniversary', 
            'valentines', 
            'date', 
            'get better',
            'baptism',
            'new years',
            'graduation',
            'white elephant',
            'quinceanera',
            'chinese new year',
            'just because',
            'wedding',
            'funeral'
        ]
        let rando = faker.random.number(types.length) - 1;
        return types[rando];
    }
    let gift = {
        gift_id: j,
        gift_name: "'" + faker.commerce.productName() + "'",
        links: "ARRAY[" + "'"+faker.image.cats() + "','" + faker.image.cats() + "']",
        type: "'" + createType() + "'",
        purchased: false,
        archived: false
    };
    console.log(gift);

    return gift;
}

function createComment (q) {
    let comment = {
        comment_id: q,
        name: "'" + faker.name.findName() + "'",
        comment: "'" + faker.lorem.paragraph() + "'",
        timestamp: Math.floor(Math.random() * (1557185853 - 1494113853) + 1494113853),
        gift_id: faker.random.number(1000),
        creator_id: faker.random.number(1000)
    };
    return comment;
}



function insertUsers (n) {
    for (var i = 1; i < n; i++) {
        let user = createUser(i);
        let userQuery = `INSERT INTO users (user_id, name, url, gift_count, friend_count, gifts, friends_list) VALUES (${user.user_id}, ${user.name}, ${user.url}, ${user.gift_count}, ${user.friend_count}, ${user.gifts}, ${user.friends_list});`;
        client.query(userQuery)
            .then(()=>{ })
            .catch((e) => { console.log(e, user) })
    }

}

function insertGifts (m) {
    for (var i = 1; i < m; i++) {
        let gift = createGift(i);
        let giftQuery = `INSERT INTO gifts (gift_id, gift_name, links, type, purchased, archived) VALUES (${gift.gift_id}, ${gift.gift_name}, ${gift.links}, ${gift.type}, ${gift.purchased}, ${gift.archived});`;
        client.query(giftQuery)
            .then(()=>{})
            .catch((e)=>console.log(e, gift))
    }

}


function insertComments (l) {
    for (var i=1; i < l; i++) {
        let comment = createComment(i);
        let commentQuery = `INSERT INTO comments VALUES (${comment.comment_id}, ${comment.name}, ${comment.comment}, ${comment.timestamp}, ${comment.gift_id}, ${comment.creator_id});`;
        client.query(commentQuery)
            .then(()=>{})
            .catch((e)=>(console.log(e, comment)))
    }
}

insertUsers(1000);
insertGifts(1000);
insertComments(5000);


// client.end();


