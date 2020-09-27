import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import link from '../utils/link';
import { showState, clearBoard, submitStarted, submitFinished } from '../actions/action';

const BottomButtons = props => {
	const onBoared = useSelector(state => state.onBoard);
	const supplier = useSelector(state => state.onBoard.supplier)
	const submitting = useSelector(state => state.submitting)
	const dispatch = useDispatch();
	const submitEntry = () => {
		let data = JSON.stringify({entries : onBoared.entries, supplier})
		dispatch(showState())
		if (onBoared.entries.length > 0) {
			dispatch(submitStarted())
			fetch(`${link.base}entries/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: data,
			})
				.then(response => response.json())
				.then(data => {
					dispatch(clearBoard())
					dispatch(submitFinished())
					let notification = {
						title : 'New Entry',
						body : 'New Entry Added Successfully!',
						
					}
					new window.Notification(notification.title, notification)
				})
				.catch(error => {
					console.error('Error:', error);
					// submitting = []
				});
		}
	};

	return (
		<div className="last-button">
			<button disabled={submitting} onClick={submitEntry} className="submit">Submit</button>
			<button className="comment">Comment</button>
		</div>
	);
};

export default BottomButtons;
