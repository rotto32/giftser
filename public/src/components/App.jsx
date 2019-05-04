import React from "react";
import Friends from "./Friends.jsx"
import styles from "../../dist/style.css";

class App extends React.Component {
    constructor(props) {
        super(props);


        /* STATE */
        this.state = {
            loggedin: true,
            username: "Adrienne"

        }
        /* FUNCTION BINDINGS */
    }
  
    /* FUNCTIONS */

    /* RENDER */
    render() {

        return (
            <div className="dash">
                <nav className="top-nav">
                    {`Hello ${this.state.username}`}
                    <button>Log Out</button>
                </nav>
                <div className="friend-list">
                <Friends />
                </div>
            </div>
        )

        

    }
}

export default App;