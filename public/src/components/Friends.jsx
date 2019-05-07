import React from "react";
import Friend from "./Friend.jsx";

class Friends extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            friends: [{ user_id: 1, name: "Ray", gift_count: 3 }, { user_id: 2, name: "Chris", gift_count: 5 }, { user_id: 3, name: "Sen", gift_count: 7 }]
        }
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