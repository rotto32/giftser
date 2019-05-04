import React from "react";
import Friend from "./Friend.jsx";

class Friends extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            friends: [{ id: 1, name: "Ray", gifts: 3 }, { id: 2, name: "Chris", gifts: 5 }, { id: 3, name: "Sen", gifts: 7 }]
        }
    }

    render() {
        return (
            <div className="content">
                <h3>Friends</h3>
                <div className="friends-list">
                    {this.state.friends.map((el) => {
                        return <Friend key={el.id} friend={el} />
                    })}
                </div>
            </div>

        );
        
    }
}

export default Friends;