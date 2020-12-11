import React from 'react';

const NavBar = ({onRouteChange, isSignedIn}) => {
	//using isSignedIn piece of state to conditionally render Sign Out or Sign In/Register in the nav bar
	return (
		isSignedIn ? 
		<nav id="navbar">
			<ul>
				<li onClick={() => onRouteChange('signin')}>Sign Out</li>
			</ul>
		</nav>
		:
		<nav id="navbar">
			<ul>
				<li onClick={() => onRouteChange('signin')}>Sign In</li>
				<li onClick={() => onRouteChange('register')}>Register</li>
			</ul>
		</nav>
	);
}

export default NavBar;