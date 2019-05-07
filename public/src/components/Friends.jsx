import React from "react";
import Friend from "./Friend.jsx";
import axios from "axios";

class Friends extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            friends: [{ user_id: 1, name: "Ray", gift_count: 3 }, { user_id: 2, name: "Chris", gift_count: 5 }, { user_id: 3, name: "Sen", gift_count: 7 }]
        }
    }

    componentDidMount() {
        axios.get(`/api/friends/${this.props.currentUser.user_id}`)
            .then((data) => {
                this.setState({
                    friends: data
                })
            })
            .catch((e) => {console.log('error with getting friend data ', e)})
    }

    render() {
        return (
            <div className="content">
                <h3>Friends</h3>
                <div className="friends-list">
                    {this.state.friends.map((el) => {
                        return <Friend key={el.user_id} friend={el} />
                    })}
                </div>
            </div>

        );
        
    }
}

export default Friends;