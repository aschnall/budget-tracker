import React, {useState, useEffect} from 'react';

const BudgetCard = ({amount, description, type, date, onDelete}) => {

	const [deleteAmount, setDeleteAmount] = useState(amount);
	const [deleteType, setDeleteType] = useState(null);
	const [deleteDescription, setDeleteDescription] = useState(description);
	const [deleteDate, setDeleteDate] = useState('');

	//setting a piece of state for each property on our transaction
	useEffect(()=>{
	 setDeleteAmount(amount);
	 setDeleteDescription(description);
	 setDeleteType(type);
	 setDeleteDate(date);
	},[amount, description, type, date])

	//calling onDelete prop function with properties of the selected transaction as arguments
	const onDeleteClick = () => {
		onDelete(deleteAmount, deleteDescription, deleteType, deleteDate);
	}

	return (
	<div className="budget-item">
		<div id="transaction-content" style={{border: amount ? '3px solid black' : ''}} className="ui small horizontal statistic">
			<div id="date-value">{date}</div>
		  <div id="budget-value" style={{color: type === 1 ? '#2f6f2f' : '#ce2525'}}>
		    {amount ? type === 1 ? `+$${amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` : `-$${amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`: ''}
		  </div>
		  <div id="budget-description" style={{color: type === 1 ? '#2f6f2f' : '#ce2525'}}>
		    {description}
		  </div>
		  {amount ? <button id="delete-transaction" className="ui button label" onClick={onDeleteClick}>X</button> : ''}
		</div>
	</div>
	);
}


export default BudgetCard;

