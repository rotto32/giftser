import React from "react";

class Gift extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render () {
        return (
            <li>
              {this.props.gift.name}
            </li>
        )
    }
}

export default Gift;