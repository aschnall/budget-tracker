import React, { useState } from 'react';

const BudgetInput = ({onSubmit}) => {

	const [amountInput, setAmountInput] = useState(null);
	const [descriptionInput, setDescriptionInput] = useState('');
	const [typeInput, setTypeInput] = useState(null);
	const [dateInput, setDateInput] = useState('');


	//checking all fields are filled out - if so calling onSubmit prop function with transaction properties as arguments	
	const onBudgetSubmit = (event) => {
		event.preventDefault();
		if (!amountInput || !descriptionInput || !dateInput || typeInput === null) {
			alert('Please fill out all fields')
		} else {
			onSubmit(amountInput, descriptionInput, typeInput, dateInput);
			resetFields();
		}
	}

	//resetting input values and pieces of state back to default
	const resetFields = () => {
		document.querySelector('#description').value = '';
		document.querySelector('#amount').value = '';
		document.querySelector('#date-picker').value = '';
		setAmountInput(null);
		setDescriptionInput('');
		setDateInput(null);
	}

	return (
		<form className="ui form">
		  <div className="fields">
		  	<div id="date-container" className="field">
		      <label htmlFor="date-picker">Date</label>
		      <input 
		      	onChange={(e) => setDateInput(e.target.value)}
		      	type="date" id="date-picker"
       			min="2020-01-01" max="2021-12-31"/>
		    </div>
		    <div className="field">
		      <label htmlFor="description">Description</label>
		      <input 
		      	onChange={(e) => setDescriptionInput(e.target.value)}
		      	id="description"
		      	type="text" 
		      	placeholder="Description"/>
		    </div>
		    <div className="field">
		      <label htmlFor="amount">Amount</label>
		      <input 
		      	onChange={(e) => setAmountInput(parseFloat(e.target.value))}
		      	id="amount"
		      	type="text" 
		      	placeholder="$$"/>
		    </div>
		    <div className="field">
		     <label>Type</label>
				<select onChange={(e) => setTypeInput(parseFloat(e.target.value))} id="budget-type" className="ui search dropdown" defaultValue={'DEFAULT'} style={{padding: '0 0 0 5px'}}>
				  <option value="DEFAULT" disabled>Select Type</option>
				  <option value="1">Income</option>
				  <option value="0">Expense</option>
				</select>
		    </div>
		    <div id="button-field" className="field">
			    <button 
			    	onClick={onBudgetSubmit}
			    	className="ui button" 
			    	type="submit">
			    	Submit
			    </button>
			   </div>
		  </div>
		</form>
	);
}

export default BudgetInput;


