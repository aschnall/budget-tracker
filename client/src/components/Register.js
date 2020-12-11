import React, { useState } from 'react';


const Register = ({onRouteChange, loadUser}) => {

	//initialzing state to keep track of registration fields
	const [registerFirstName, setRegisterFirstName] = useState('');
	const [registerLastName, setRegisterLastName] = useState('');
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');

	//making post request to /register endpoint to load new user into database
	//respond with user's data - use the user's id to pass into loadUser function and re-route to home screen
	const onRegisterSubmit = event => {
		event.preventDefault();
		const register = async () => {
			let registeredUser = await fetch('https://tranquil-shore-13013.herokuapp.com/register', {
				method: 'post',
				headers: { 'Content-type': 'application/json'},
				body: JSON.stringify({
					first_name: registerFirstName,
					last_name: registerLastName,
					email: registerEmail,
					password: registerPassword
				})
			})
			registeredUser = await registeredUser.json();
			if (registeredUser.id) {
				loadUser(registeredUser.id);
				onRouteChange('home');		
			}
		}
		register();
	}

	return (
		<div className="ui container">
			<form onSubmit={onRegisterSubmit} className="ui form" id="register-form">
				<h1 style={{margin: '0 auto', textAlign: 'center', padding: '1rem 0'}}>Register</h1>
				<div className="field">
					<label>First Name</label>
					<input onChange={(e) => setRegisterFirstName(e.target.value)} type="text" name="first-name" placeholder="First Name"/>
				</div>
				<div className="field">
					<label>Last Name</label>
					<input onChange={(e) => setRegisterLastName(e.target.value)} type="text" name="last-name" placeholder="Last Name"/>
				</div>
				<div className="field">
					<label>Email</label>
					<input onChange={(e) => setRegisterEmail(e.target.value)} type="text" name="email" placeholder="Email"/>
				</div>			
				<div className="field">
					<label>Password</label>
					<input onChange={(e) => setRegisterPassword(e.target.value)} type="password" name="password" placeholder="Password"/>
				</div>	
				<div className="field" style={{display: 'flex', justifyContent: 'center'}}>		
					<button 
						className="ui button" 
						type="submit" 
						style={{color: 'rgb(0 0 0 / 91%)'}}
						>Register
					</button>
				</div>
			</form>
		</div>
	)
}

export default Register;