import React from "react";
import Gift from "./Gift.jsx";

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
    }

    handleClick(e) {
        this.setState({
            friendId: e.target.id,
            friendName: e.target.firstElementChild.innerHTML,
            gifts: [{ gift_id: '1', name: 'dog', link: '' }, { gift_id: '2', name: 'bunny', link: '' }, { gift_id: '3', name: 'cat', link: '' }]
        })
    }

    hideGifts() {
        this.setState({
            friendId: ""
        })
    }

    render () {
        let friendState = this.state.friendId;

        if (friendState === "") {
            return (
              <div
                id={this.props.friend.user_id}
                className="friend"
                onClick={this.handleClick}
              >
                <h4>{this.props.friend.name}</h4>
                <p>{this.props.friend.gifts}</p>
              </div>
            );

        } else {
            return (
                <div className="gift-list">
                    <div className="gift-list-title">
                        <h5>Gift Ideas for {this.state.friendName}</h5>
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