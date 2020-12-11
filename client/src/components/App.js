import React, { useState } from 'react';
import BudgetInput from './BudgetInput';
import BudgetList from './BudgetList';
import Balance from './Balance';
import Reset from './Reset';
import Signin from './Signin';
import Register from './Register';
import NavBar from './NavBar';
import './App.css';

const App = () => {

	const [data, setData] = useState([{ amount: null, description: '', type: null}]);
	const [route, setRoute] = useState('signin');
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [signedInUserID, setSignedInUserID] = useState(null);

	//setting user id piece of state to the id of the signed in user
	const loadUser = id => {
		setSignedInUserID(id);
		fetchExistingData(id);
	}

	//displaying any pre-existing data for the signed in user
	const fetchExistingData = async (id) => {
		let initialData = await fetch(`https://tranquil-shore-13013.herokuapp.com/${id}`)
		initialData = await initialData.json();
		checkDataExists(initialData);
	}


	//fetching updated data after submitting new transaction
	const fetchTransactions = async (amount, description, type, date) => {
		let response = await fetch('https://tranquil-shore-13013.herokuapp.com/submit', {
			method: 'put',
			headers: { 'Content-type': 'application/json'},
			body: JSON.stringify({
				amount: amount,
				description: description,
				type: type,
				date: date,
				user_id: signedInUserID
			})
		})
		response = await response.json();
		response = response.map(({amount, description, type, date}) => ({amount: parseFloat(amount), description, type, date}));
		setData(response);
	}

	//clearing database after hitting reset
	const onReset = async () => {
		await fetch('https://tranquil-shore-13013.herokuapp.com/reset', {
			method: 'put',
			headers: { 'Content-type': 'application/json'},
			body: JSON.stringify({
				user_id: signedInUserID
			})
		})
		setData([{ amount: null, description: '', type: null, date: ''}]);
	}

	//deleting desired transaction from databse
	const onDelete = async (amount, description, type, date) => {
		let newData = await fetch('https://tranquil-shore-13013.herokuapp.com/delete', {
			method: 'put',
			headers: { 'Content-type': 'application/json'},
			body: JSON.stringify({
				amount: amount,
				description: description,
				type: type,
				date: date,
				user_id: signedInUserID
			})
		})
		newData = await newData.json();
		checkDataExists(newData);
	}

	//function that checks if fetched data exists - if not it populates with default values
	const checkDataExists = data => {
		if (data.length === 0) {
			setData([{ amount: null, description: '', type: null, date: '' }]);
		} else {
				data = data.map(({amount, description, type, date}) => ({amount: parseFloat(amount), description, type, date}));
				setData(data);
		}
 	}

 	//changing the display page between logged in home screen, signin form, and register form
 	//also determing if a user is signed in which will determine what is displayed on the nav bar 
	const onRouteChange = (route) => {
		if (route === 'home') {
			setIsSignedIn(true);
		} else {
			setIsSignedIn(false);
		}
		setRoute(route);
	}


	return (
		<div>
			<NavBar onRouteChange={onRouteChange} isSignedIn={isSignedIn}/>
			{route === 'signin' 
			? <Signin loadUser={loadUser} onRouteChange={onRouteChange}/> : 
			route === 'register' 
			? <Register loadUser={loadUser} onRouteChange={onRouteChange}/> : (
				<div>
					<div id="budget-input" className="ui container">
						<BudgetInput onSubmit={fetchTransactions} />
					</div>
					<div id="reset-button" className="ui container">
						<Reset onReset={onReset} />
					</div>
					<BudgetList data={data} onDelete={onDelete}/> 
					<Balance data={data}/>
				</div>
				)
			}
		</div>

	);
}

export default App;