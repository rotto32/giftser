import React from "react";
import Comments from "./Comments.jsx";

class Gift extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showComments: false,
            comments: [{ comment_id: 1, user: "Sen", comment: "I'll get this one!", timestamp: Date.now() }, { comment_id: 2, user: "Chris", comment: "What about bitcoin?", timestamp: "Jan/1/2019"}]
        }

        this.toggleComments = this.toggleComments.bind(this);
    }

    toggleComments() {
        this.setState({
            showComments: !this.state.showComments
        })
    }

    render () {
        let showComments = this.state.showComments;
        if (showComments) {
            return (
              <div>
                <h5>
                  {this.props.gift.gift_name}{" "}
                  <button onClick={this.toggleComments}>x</button>
                </h5>

                {this.state.comments.map(el => {
                  return <Comments key={el.comment_id} comment={el} />;
                })}
              </div>
            );

        } else {
            return (
                <li onClick={this.toggleComments}>
                    {this.props.gift.gift_name}
                </li>
            )
        }
        
    }
}

export default Gift;