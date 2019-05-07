import React from "react";
import Friend from "./Friend.jsx";
import axios from "axios";


class Friends extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            friends: []
        }
    }

    componentDidMount() {
        axios.get(`/api/friends/${this.props.currentUser}`)
            .then((data) => {
                this.setState({
                    friends: data.data
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