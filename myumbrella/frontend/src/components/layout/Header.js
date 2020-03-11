import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

export class Header extends Component {
    render() {

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
							<li className="menu-item current-menu-item">
								<Link to="/">Home</Link>
							</li>

							{
								
								this.props.isAuthenticated ? 
								
								<li className="menu-item current-menu-item">
									<Link to="/logout">Logout</Link>
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

export default connect()(Header);