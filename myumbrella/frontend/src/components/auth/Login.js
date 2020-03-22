import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {authLogin} from '../../actions/auth';
import {connect} from 'react-redux';

export class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    static propTypes = {
        authLogin: PropTypes.func.isRequired
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.authLogin(this.state.username, this.state.password);

        if (this.props.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }

        const { username, password } = this.state;
        const style = {
            backgroundImage: 'url(' + _STATIC_ + 'images/city-bg.jpg)',
        }

        return (
            <div>
                <div className="hero" style={style}>
                    <div className="container">

                        <div className="row row-zero">
                            <div className="col-8 offset-2 forecast-container forecast-card-container">
                                <div className="row">
                                    <div className="col-10 offset-1" style={{marginTop: '10px'}}>
                                        <button type="button" className="btn btn-primary-outline" style={{color: '#FFF', fontSize: '18px', fontWeight: '400'}}>
                                            Login
                                        </button>
                                    </div>
                                    
                                    <div className="col-10 offset-1">
                                        {

                                            this.props.error
                                            ?
                                                <div style={{padding: '1.25rem', marginBottom: '-20px', color: '#ff0039'}}>
                                                    {this.props.error}
                                                </div>
                                            :
                                                <div></div>
                                        }
                                        <div className="card card-body mt-5 card-login border-0">
                                            <form onSubmit={this.onSubmit}>
                                                <div className="form-group">
                                                    <label>Username</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="username"
                                                        onChange={this.onChange}
                                                        value={username}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Password</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        name="password"
                                                        onChange={this.onChange}
                                                        value={password}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-primary">Login</button>
                                                </div>
                                                <p>
                                                    Don't have an account? <Link to="/register">Register</Link>
                                                </p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {

    return {
        error: state.auth.error 
    }
};

export default connect(mapStateToProps, {authLogin})(Login);