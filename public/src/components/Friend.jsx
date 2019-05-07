import React from "react";
import Gift from "./Gift.jsx";
import axios from "axios";

class Friend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friendId: "",
            friendName: "",
            gifts: []

        }
        this.handleClick = this.handleClick.bind(this);
        this.hideGifts = this.hideGifts.bind(this);
        this.getData = this.getData.bind(this);
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

    render () {
        let friendState = this.state.gifts;

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

        } else {
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
                </div>
            )
        }


    }
}

export default Friend;