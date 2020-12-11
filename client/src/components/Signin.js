import React, { useState } from 'react';

const Signin = ({onRouteChange, loadUser }) => {

	//initializing state to keep track of sign in fields
	const [signinEmail, setSigninEmail] = useState('');
	const [signinPassword, setSigninPassword] = useState('');

	//making /post request to /signin endpoint to validate signin credentials
	//respond with user's data - use the user's id to pass into loadUser function and re-route to home screen
	const onSigninSubmit = event => {
		event.preventDefault();
		const signin = async () => {
			let signedinUser = await fetch('https://tranquil-shore-13013.herokuapp.com/signin', {
				method: 'post',
				headers: { 'Content-type': 'application/json'},
				body: JSON.stringify({
					email: signinEmail,
					password: signinPassword
				})
			})
			signedinUser = await signedinUser.json();
			if (signedinUser.id) {
				loadUser(signedinUser.id);
				onRouteChange('home');
			}
		}
		signin();
	}

	return (
		<div className="ui container">
			<form onSubmit={onSigninSubmit} className="ui form" id="signin-form">
				<h1 style={{margin: '0 auto', textAlign: 'center', padding: '1rem 0'}}>Sign In</h1>
				<div className="field">
					<label>Email</label>
					<input onChange={(e) => setSigninEmail(e.target.value)}type="text" name="email" placeholder="Email"/>
				</div>			
				<div className="field">
					<label>Password</label>
					<input onChange={(e) => setSigninPassword(e.target.value)} type="password" name="password" placeholder="Password"/>
				</div>	
				<div className="field" style={{display: 'flex', justifyContent: 'center', paddingTop: '1rem'}}>		
					<button 
						className="ui button" 
						type="submit" 
						style={{color: 'rgb(0 0 0 / 91%)'}}
						>
						Sign In
					</button>
				</div>
				<div className="field" style={{display: 'flex', justifyContent: 'center'}}>		
					<p 
						onClick={() => onRouteChange('register')}
						style={{color: 'rgb(0 0 0 / 91%)', cursor: 'pointer'}}
						>
						Register
					</p>
				</div>
			</form>
		</div>
	)
}


export default Signin;