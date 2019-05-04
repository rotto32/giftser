import React from "react";
import Friend from "./Friend.jsx";

class Friends extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div className="friend">
                <h3>Friends</h3>
                <Friend />
            </div>

        );
        
    }
}

export default Friends;