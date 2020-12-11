import React from 'react';
import BudgetCard from './BudgetCard';

const BudgetList = ({data, onDelete}) => {

	return (
		<div className="ui container" id="transaction-container">
			<h2>Transactions</h2>
			<div className="headers">
				<h4>Date</h4>
				<h4>Amount</h4>
				<h4>Description</h4>
			</div>
			{data && data.map((transaction, index) => {
				return <BudgetCard key={index} amount={transaction.amount} description={transaction.description} type={transaction.type} date={transaction.date} onDelete={onDelete}/>
				}
			)}
		</div>
	);
}

export default BudgetList;