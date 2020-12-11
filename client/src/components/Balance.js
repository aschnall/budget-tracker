import React from 'react';

const Balance = ({data}) => {
	
	//making transaction amounts negative for transactions labeled as expenses (type = 0)
	const cleanedData = data.map(transaction => {
		if (transaction.type === 0) {
			transaction.amount = transaction.amount * -1;
			return transaction;
		} else {
			return transaction;
		}
	})

	//calculating the balance
	const calculateBalance = () => {
		return cleanedData.reduce((acc, num) => {
			return acc + num.amount }, 0)
	}

	return (
		<div className="ui container" id="balance-container">
			<h2>Balance</h2>
			<h5 id="balance-text" style={{color: calculateBalance() >= 0 ? calculateBalance() === 0 ? 'black' : '#2f6f2f' : '#ce2525'}}>
				{data[0].amount ? calculateBalance() >= 0 ? `$${calculateBalance().toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` : `-$${(-1*calculateBalance()).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` : '$0'}</h5>
		</div>
	);
}



export default Balance;

