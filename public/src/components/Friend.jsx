import React from "react";

class Friend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friend: ""

        }
        this.handleClick = this.handleClick.bind(this);
        this.hideGifts = this.hideGifts.bind(this);
    }

    handleClick(e) {
        console.log(e.target.id)
        this.setState({
            friend: e.target.id
        })
    }

    hideGifts() {
        this.setState({
            friend: ""
        })
    }

    render () {
        let friendState = this.state.friend;

        if (friendState === "") {
            return (
                <div id={this.props.friend.id} className="friend" onClick={this.handleClick}>
                    <h4>{this.props.friend.name}</h4>
                    <p>{this.props.friend.gifts}</p>
                </div>
            );

        } else {
            return (
                <div>
                    <button onClick={this.hideGifts}>x</button>
                </div>
            )
        }


    }
}

export default Friend;