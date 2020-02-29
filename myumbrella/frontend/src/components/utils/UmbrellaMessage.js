import React, { Component } from 'react'

export class UmbrellaMessage extends Component {
    render() {

        const rain = this.props.rain;
        const is_main = this.props.is_main;

        if(parseFloat(rain) > 0) {
            return (
                <h5>
                    <span className="badge badge-umbrella-message">Umbrella needed!</span>
                </h5>
            )
        } else {
            return (
                <h5>
                    <span className="badge badge-umbrella-message badge-umbrella-message-clear">No Umbrella needed</span>
                </h5>
            )
        }
    }
}

export default UmbrellaMessage
