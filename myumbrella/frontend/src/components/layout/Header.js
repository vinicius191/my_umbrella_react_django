import React, { Component } from 'react';

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
							<li className="menu-item current-menu-item"><a href="">Home</a></li>
						</ul>
					</div>

                    <div className="mobile-navigation"></div>

				</div>
			</div>
        )
    }
}

export default Header;
