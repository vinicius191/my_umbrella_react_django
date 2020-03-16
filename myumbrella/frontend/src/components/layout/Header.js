import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {authLogout} from '../../actions/auth';
import {connect} from 'react-redux';

export class Header extends Component {
	state = {
		username: ''
	}

	static propTypes = {
        authLogout: PropTypes.func.isRequired
    }

	logoutClick = () => {
		this.props.authLogout();

		if (this.props.isAuthenticated) {
            console.log('here....')
            this.props.history.push('/');
		}
	}

    render() {
		console.log('props Header', this.props);
        return (
            <div className="site-header">
				<div className="container">
					
                    <a href="" className="branding">
						<img src={`${_STATIC_}images/logo.png`} alt="" className="logo" />
						<div className="logo-type">
							<h1 className="site-title">My Umbrella</h1>
							<small className="site-description">should I use my umbrella today?</small>
						</div>
					</a>

					<div className="main-navigation">
						<button type="button" className="menu-toggle"><i className="fa fa-bars"></i></button>
						<ul className="menu">

							{
								this.props.location.pathname !== "/" ?
								<li className="menu-item current-menu-item">
									<Link to="/">Home</Link>
								</li>
								:
								<></>
							}

							{
								
								this.props.isAuthenticated ? 
								
								<li className="menu-item current-menu-item logged-menu-item">
									Welcome <span className="logged-username">{ `${this.props.auth.username}` }</span>, <span className="logged-logout" onClick={this.logoutClick}>Logout</span>
								</li>

								:
								<>
									<li className="menu-item current-menu-item">
										<Link to="/login">Login</Link>
									</li>
									
									<li className="menu-item current-menu-item">
										<Link to="/register">Register</Link>
									</li>
								</>
							}

						</ul>
					</div>

                    <div className="mobile-navigation"></div>

				</div>
			</div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username 
    }
};

export default connect(mapStateToProps, {authLogout})(Header);