import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Favourites extends Component {
    componentDidMount() {
        console.log('Favourites Component', this.props);
    }
    
    render() {
        console.log('Favourites Component -> render()', this.props);
        return (
            <div>
                Favourites
            </div>
        );
    }
}

const mapStateToProps = (state) => {
}

export default connect(
    mapStateToProps
)(Favourites);