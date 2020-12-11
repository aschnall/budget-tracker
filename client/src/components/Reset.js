import React from 'react'


const Reset = ({onReset}) => {
	
	const onResetSubmit = (event) => {
		event.preventDefault();
		onReset();
		document.querySelector('#description').value = '';
		document.querySelector('#amount').value = '';
	}

	return (
		<div>
			<button 
				onClick={onResetSubmit}
				className="ui button">
			Reset
			</button>
		</div>
	);
}






export default Reset;

