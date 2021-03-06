import axios from 'axios';
import React from 'react';
import Gift from './Gift.jsx';


class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendId: '',
      friendName: '',
      gifts: [],
      showGiftBox: false,
      uIdForNewGift: '',
      newGiftName: '',
      newGiftType: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.hideGifts = this.hideGifts.bind(this);
    this.getData = this.getData.bind(this);
    this.showGiftBox = this.showGiftBox.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.addGift = this.addGift.bind(this);
    this.getDataAfterPost = this.getDataAfterPost.bind(this);
  }

  // this.setState({
  //     friendId: e.target.id,
  //     friendName: e.target.firstElementChild.innerHTML,
  //     gifts: [{ gift_id: '1', name: 'dog', link: '' }, { gift_id: '2', name: 'bunny', link: '' }, { gift_id: '3', name: 'cat', link: '' }]
  // })

  getData(event) {
    axios
      .get(`/api/gifts/${event.target.id}`)
      .then((data) => {
        this.setState({
          gifts: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getDataAfterPost(id) {
    axios
      .get(`/api/gifts/${id}`)
      .then((data) => {
        this.setState({
          gifts: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleClick(event) {
    this.setState({
      friendId: event.target.id,
      friendName: event.target.firstElementChild.innerHTML,
    });
  }

  hideGifts() {
    this.setState({
      gifts: [],
    });
  }

  showGiftBox(e) {
    if (this.state.showGiftBox) {
      this.setState({
        showGiftBox: false,
      });
    } else {
      this.setState({
        showGiftBox: true,
        uIdForNewGift: e.target.id,
      });
    }
  }

  handleInput(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  addGift(event) {
    event.preventDefault();
    this.setState({
      showGiftBox: false,
    });
    axios.post(`/api/gifts/${this.state.uIdForNewGift}`,
      {
        gift_name: this.state.newGiftName,
        user_id: this.state.uIdForNewGift,
        type: this.state.newGiftType
      })
      .then((postResp) => { this.getDataAfterPost(postResp.data.user_id); })
      .catch((err) => { console.log(err); });
  }

  // aggregateGiftCategories() {
  //   let categoryArray = [];
  //   this.props.gifts.map((gift) => {
  //     if (!categoryArray.includes(gift.type)) {
  //       categoryArray.push(gift.type);
  //     }
  //   });
  //   this.setState({
  //     allGiftCategories: categoryArray,
  //   });
  // }

  render() {
    const friendState = this.state.gifts;
    const showGiftBox = this.state.showGiftBox;

    const aggrGiftCategories = (giftArr) => {
      let catObj = {};
      giftArr.map((el) => {
        if (catObj[el.type]) {
          catObj[el.type].push(el);
        } else {
          catObj[el.type] = [];
          catObj[el.type].push(el);
        }
      });
      return catObj;
    };

    const transformCategories = (str) => {
      const strArr = str.split('');
      strArr[0] = strArr[0].toUpperCase();
      if (strArr.includes(' ')) {
        const iofSpace = strArr.indexOf(' ');
        strArr[iofSpace + 1] = strArr[iofSpace + 1].toUpperCase();
      }
      return strArr.join('');
    };

    const renderGiftsByCat = (objKeys, objCat) => {
      return objKeys.map((cat) => {
        const transformedCat = transformCategories(cat);
        return (
          <div>
            <h6 className="cat-title">{transformedCat}</h6>
            <ul>
              {objCat[cat].map((gift) => {
                return <Gift key={gift.gift_id} gift={gift} />;
              })}
            </ul>
          </div>
        );
      });
    };

    const giftsByCategory = aggrGiftCategories(friendState);

    const giftCategories = Object.keys(giftsByCategory);

    if (friendState.length === 0) {
      return (
        <div
                // id={this.props.friend.user_id}
          className="friend"
                // onClick={this.handleClick}
                // onClick = {this.getData}
        >
          <div className="friend-header">
            <img src={ this.props.friend.url }></img>
            <div className="friend-title">
              <h4>{this.props.friend.name}</h4>
              <p>Gifts: {this.props.friend.gift_count}</p>
            </div>
          </div>

          <button
            type="button"
            className="btn-show-gifts"
            id={this.props.friend.user_id}
            onClick={this.getData}
          >
            Show Gifts
          </button>
          {/* <p>{this.props.friend.gift_count}</p> */}
        </div>
      );
    }
    if (!showGiftBox) {
      return (
        <div className="gift-list">
          <div className="gift-list-title">
            <h5>Gift Ideas for {this.props.friend.name}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={this.hideGifts}
            >
              x
            </button>
          </div>

          <div>
            {renderGiftsByCat(giftCategories, giftsByCategory)}
          </div>

          <button
            type="button"
            id={this.props.friend.user_id}
            className="btn-add-gift"
            onClick={this.showGiftBox}
          >
            Add a gift idea
          </button>
        </div>
      );
    }
    if (showGiftBox) {
      return (
        <div className="gift-list">
          <div className="gift-list-title">
            <h5>
              Gift Ideas for {this.props.friend.name}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={this.hideGifts}
            >
            x
            </button>
          </div>
          <ul>
            {this.state.gifts.map(el => (
              <Gift
                key={el.gift_id}
                gift={el}
              />
            ))}
          </ul>
          {/* <button className="btn-close-gift-box" onClick={this.showGiftBox}>x</button> */}
          <form onSubmit={this.addGift}>
            <label htmlFor="newGiftName">New gift idea: </label>
            <button
              type="button"
              className="btn-close-gift-box"
              onClick={this.showGiftBox}
            >
            x
            </button>
            <br />
            <input
              type="text"
              id="newGiftName"
              value={this.state.newGiftName}
              onChange={this.handleInput}
              required
            />
            <br />

            <select id="newGiftType" onChange={this.handleInput}>
              <option value="">--Please choose an event--</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
              <option value="valentines">Valentines</option>
              <option value="christmas">Christmas</option>
              <option value="just because">Just Because</option>
              <option value="other">Other</option>
            </select>
            <button
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      );
    }
  }
}

export default Friend;
