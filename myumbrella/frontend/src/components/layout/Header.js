import React, { Component } from 'react';

export class Header extends Component {
    render() {
        return (
            <div className="site-header">
				<div className="container">
					
                    <a href="index.html" className="branding">
						<img src="../../../static/images/logo.png" alt="" className="logo" />
						<div className="logo-type">
							<h1 className="site-title">My Umbrella</h1>
							<small className="site-description">should I use my umbrella today?</small>
						</div>
					</a>

					<div className="main-navigation">
						<button type="button" className="menu-toggle"><i className="fa fa-bars"></i></button>
						<ul className="menu">
							<li className="menu-item current-menu-item"><a href="index.html">Home</a></li>
						</ul>
					</div>

                    <div className="mobile-navigation"></div>

				</div>
			</div>
        )
    }
}

export default Header;