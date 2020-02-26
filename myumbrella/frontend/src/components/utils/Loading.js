import React, { Component } from 'react'

export class Loading extends Component {
    render() {
        
        const color = this.props.color;
        const size = this.props.size;
        const classes = `spinner-border ${color} ${size}`

        return (
            <div className={classes} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    }
}

export default Loading
