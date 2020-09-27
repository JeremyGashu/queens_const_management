import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../assets/css/onboard.css';
import { removeItem } from '../actions/action';

const OnBoard = props => {
	const dispatch = useDispatch();
	const onBoared = useSelector(state => state.onBoard);
	const entries = onBoared.entries.map((entry, index) => {
		return (
			<tr key={Math.random()}>
				<td>{index + 1}</td>
				<td>{entry.name}</td>
				<td>{entry.price}</td>
				<td><button onClick={() => {deleteItemFromBoard(entry.id)}} className="delete">X</button></td>
			</tr>
		);
	});

	const deleteItemFromBoard = id => {
		dispatch(removeItem(id));
	};

	return (
		<div className="items-container">
			<table className="tableizer-table">
				{entries.length > 0 ? <thead>
					<tr className="tableizer-firstrow">
						<th>No.</th>
						<th>Item name</th>
						<th>Price</th>
						<th>{}</th>
						{/* <th>Price AfterVat</th> */}
					</tr>
				</thead> : null}
				<tbody>
					{
						entries
					}
				</tbody>
			</table>
			{/* {entries} */}
		</div>
	);
};

export default OnBoard;
