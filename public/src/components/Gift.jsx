import React from "react";
import Comments from "./Comments.jsx";
import axios from "axios";

class Gift extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showComments: false,
            comments: [],
            giftIdForNewComment: "",
            showCommentBox: false,
            newCommentName: "",
            newCommentText: ""
        }

        this.toggleComments = this.toggleComments.bind(this);
        this.getComments = this.getComments.bind(this);
        this.openCommentBox = this.openCommentBox.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.addComment = this.addComment.bind(this);
        this.updateComments = this.updateComments.bind(this);
    }

    getComments(e) {
        axios.get(`/api/comments/${e.target.id}`)
            .then((data) => {
                this.setState({
                    showComments: !this.state.showComments,
                    comments: data.data
                })
            })
            .catch((e)=>console.log(e))

    }

    toggleComments() {
        this.setState({
            showComments: !this.state.showComments
        })
    }

    openCommentBox(e) {
        this.setState({
            giftIdForNewComment:e.target.id,
            showCommentBox: !this.state.showCommentBox
        })

    }

    handleInput(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    addComment (e) {
        e.preventDefault();
        this.setState({
            showCommentBox: !this.state.showCommentBox
        })
        axios.post(`/api/comments/${this.state.giftIdForNewComment}`,
            {
                name: this.state.newCommentName,
                comment: this.state.newCommentText,
                timestamp: Date.now(),
                gift_id: this.state.giftIdForNewComment
            }
        )
        .then(()=>{
            this.updateComments(this.state.giftIdForNewComment);
        })
        .catch((e)=>{console.log(e)})

    }

    updateComments(id) {
        axios.get(`/api/comments/${id}`)
            .then((data) => {
                this.setState({
                    comments: data.data
                })
            })
            .catch((e) => console.log(e))

    }

    render () {
        let showComments = this.state.showComments;
        let showCommentBox = this.state.showCommentBox;
        if (showComments && !showCommentBox) {
            return (
              <div>
                <h5>
                  {this.props.gift.gift_name}{" "}
                  <button onClick={this.toggleComments}>x</button>
                </h5>

                {this.state.comments.map(el => {
                  return <Comments key={el.comment_id} comment={el} />;
                })}
                <button id={this.props.gift.gift_id} className="btn-add-comment" onClick={this.openCommentBox}>Add Comment</button>
              </div>
            );

        } else if (showCommentBox && showComments) {
            return (
              <div>
                <h5>
                  {this.props.gift.gift_name}{" "}
                  <button onClick={this.toggleComments}>x</button>
                </h5>

                {this.state.comments.map(el => {
                  return (
                    <Comments key={el.comment_id} comment={el} />
                  );
                })}
                {/* <button id={this.props.gift.gift_id} className="btn-add-comment" onClick={this.openCommentBox}>Add Comment</button> */}
                <form onSubmit={this.addComment}>
                  <label htmlFor="name">Enter your name: </label><br/>
                  <input
                    type="text"
                    id="newCommentName"
                    value={this.state.newCommentName}
                    onChange={this.handleInput}
                    required
                  /> <br/>
                  <label htmlFor="new-comment">Leave a comment:</label><br/>
                  <textarea
                    value={this.state.newCommentText}
                    onChange={this.handleInput}
                    id="newCommentText"
                    rows="5"
                    cols="33"
                  /> <br/>
                  <button>Submit</button>
                </form>
              </div>
            );

        }else {
            return (
                <li onClick={this.getComments} id={this.props.gift.gift_id}>
                    {this.props.gift.gift_name}
                </li>
            )
        }
        
    }
}

export default Gift;