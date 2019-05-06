import React from "react";
import Moment from "react-moment";
//come back and use moment

class Comments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.updateComment = this.updateComment.bind(this);
    }

    updateComment() {

    }

    render() {
        return (
          <div className="comment-box">
            <div className="comment-box-user">
              {this.props.comment.user} - {this.props.comment.timestamp}
            </div>
            <div className="comment-box-comment">
              {this.props.comment.comment}
            </div>
            <button onClick={this.updateComment}>Update</button>
          </div>
        );
    }



}

export default Comments;