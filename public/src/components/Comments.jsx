import React from 'react';
import Moment from 'react-moment';
// come back and use moment

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      commentId: ''
    }

    this.updateComment = this.updateComment.bind(this);
  }

  updateComment(event) {
    console.log(event.target)
    // this.setState({
    //   comment: ""
    // })
  }

  render() {
    let parsedTimestamp = new Date(this.props.comment.timestamp * 1000);
    parsedTimestamp = parsedTimestamp.toLocaleString();
    return (
          <div className="comment-box">
            <div className="comment-box-user">
              {this.props.comment.name} -{' '}
              <Moment fromNow ago>
                {parsedTimestamp}
              </Moment>
              ago
            </div>
            <div className="comment-box-comment">
              {this.props.comment.comment}
            </div>
            {/* <button
              onClick={this.updateComment}
              id={this.props.comment.comment_id}
            >
              Update
            </button> */}
          </div>
    );
  }
}

export default Comments;
