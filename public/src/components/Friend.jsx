import React from "react";
import Gift from "./Gift.jsx";
import axios from "axios";

class Friend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friendId: "",
            friendName: "",
            gifts: [],
            showGiftBox: false,
            uIdForNewGift: "",
            newGiftName: "",
            newGiftType: "",


        }
        this.handleClick = this.handleClick.bind(this);
        this.hideGifts = this.hideGifts.bind(this);
        this.getData = this.getData.bind(this);
        this.showGiftBox = this.showGiftBox.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.addGift = this.addGift.bind(this);
    }

    handleClick(e) {
        this.setState({
          friendId: e.target.id,
          friendName: e.target.firstElementChild.innerHTML
        })
    
        // this.setState({
        //     friendId: e.target.id,
        //     friendName: e.target.firstElementChild.innerHTML,
        //     gifts: [{ gift_id: '1', name: 'dog', link: '' }, { gift_id: '2', name: 'bunny', link: '' }, { gift_id: '3', name: 'cat', link: '' }]
        // })
    }

    getData (e) {  
        axios.get(`/api/gifts/${e.target.id}`)
            .then(data => {
                this.setState({
                    gifts: data.data
                });
            })
            .catch((e) => { console.log(e) })
    }

    hideGifts() {
        this.setState({
            gifts: []
        })
    }

    showGiftBox(e) {
        this.setState({
            showGiftBox: true,
            uIdForNewGift: e.target.id
        })

    }

    handleInput(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    addGift(e) {
        e.preventDefault();
        this.setState({
            showGiftBox: false
        })
        axios.post(`/api/gifts/${this.state.uIdForNewGift}`,
        {
            gift_name: this.state.newGiftName,
            user_id: this.state.uIdForNewGift,
            type: this.state.newGiftType
        })
            .then(()=>{console.log('success adding gift')})
            .catch((e)=>{console.log(e)})

    }

    render () {
        let friendState = this.state.gifts;
        let showGiftBox = this.state.showGiftBox;

        if (friendState.length === 0) {
            return (
              <div
                // id={this.props.friend.user_id}
                className="friend"
                // onClick={this.handleClick}
                // onClick = {this.getData}
              >
                <h4>{this.props.friend.name}</h4>
                <button
                  id={this.props.friend.user_id}
                  onClick={this.getData}
                >
                  Show {this.props.friend.gift_count} Gifts
                </button>
                {/* <p>{this.props.friend.gift_count}</p> */}
              </div>
            );

        } else if (!showGiftBox) {
            return (
                <div className="gift-list">
                    <div className="gift-list-title">
                        <h5>Gift Ideas</h5>
                        <button className="btn-close" onClick={this.hideGifts}>x</button>
                    </div>
                    <ul>
                        {this.state.gifts.map((el) => {
                            return <Gift key={el.gift_id} gift={el} />
                        })}

                    </ul>
                    <button id={this.props.friend.user_id}className="btn-add-gift" onClick={this.showGiftBox}>Add a gift idea</button>
                </div>
            )
        } else if (showGiftBox) {
            return (
                <div className="gift-list">
                    <div className="gift-list-title">
                        <h5>Gift Ideas</h5>
                        <button className="btn-close" onClick={this.hideGifts}>x</button>
                    </div>
                    <ul>
                        {this.state.gifts.map((el) => {
                            return <Gift key={el.gift_id} gift={el} />
                        })}

                    </ul>
                    <form onSubmit={this.addGift}>
                        <label htmlFor="newGiftName">New gift idea: </label><br />
                        <input
                            type="text"
                            id="newGiftName"
                            value={this.state.newGiftName}
                            onChange={this.handleInput}
                            required
                        /> <br />

                        <select id="newGiftType" onChange={this.handleInput}>
                            <option value="">--Please choose an event--</option>
                            <option value="birthday">Birthday</option>
                            <option value="anniversary">Anniversary</option>
                            <option value="valentines">Valentines</option>
                            <option value="christmas">Christmas</option>
                            <option value="just because">Just Because</option>
                            <option value="other">Other</option>
                        </select>
                        <button>Submit</button>


                    </form>
                </div>

            )
        }
    }
}

export default Friend;