import React, { Component } from 'react';
import * as wFunc from './weatherFunction';
import { icons } from '../utils/icons';

export class Icon extends Component {
    render() {

        const cod = this.props.cod;
        const dt = this.props.dt;
        const id = this.props.id;

        const icon = wFunc.showIcon(icons, cod, dt);

        return (
            <div className={`wi ${icon}`} id={id}></div>
        )
    }
}

export default Icon
