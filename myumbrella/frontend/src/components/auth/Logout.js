import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {authLogout} from '../../actions/auth';
import {connect} from 'react-redux';

export class Logout extends Component {

    static propTypes = {
        authLogout: PropTypes.func.isRequired
    }

    componentDidMount = () => {
        this.props.authLogout();

        if (this.props.isAuthenticated) {
            this.props.history.push('/');
		}
    }

    render() {
        return <Redirect to="/" />;
    }
}

const mapStateToProps = state => {

};

export default connect(mapStateToProps, {authLogout})(Logout);