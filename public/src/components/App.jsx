import React from "react";
import Friends from "./Friends.jsx"
import styles from "../../dist/style.css";

class App extends React.Component {
    constructor(props) {
        super(props);


        /* STATE */
        this.state = {
            loggedin: true,
            username: "Adrienne",
            user_id: 3

        }
        /* FUNCTION BINDINGS */
    }
  
    /* FUNCTIONS */

    /* RENDER */
    render() {

        return (
            <div className="dash">
                <nav className="top-nav">
                    <h1>Gifter</h1>
                    <div className="current-user">
                       {`Hello ${this.state.username}!`}
                        <button>Log Out</button>
                    </div>
                </nav>
               
                <Friends currentUser = {this.state.user_id}/>
             
            </div>
        )

        

    }
}

export default App;