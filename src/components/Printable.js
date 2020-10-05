import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import link from '../utils/link';
import '../assets/css/printable.css';
import { parseISOString } from './Entries';
import Loading from 'react-simple-loading';
import WaterMark from './WaterMark';

const Printable = props => {
	const userType = useSelector(state => state.authData.user.authType);
	const [entry, setEntry] = useState({});

	const id = props.match.params.entry_id;
	useEffect(() => {
		fetch(`${link.base}entries/${id}/`)
			.then(res => res.json())
			.then(data => {
				setEntry(data);
			})
			.catch(err => console.log(err));
	}, []);

	const approveEntry = id => {
		fetch(`${link.base}entries/${userType.toLowerCase()}/${id}`, { method: 'POST' })
			.then(res => res.json())
			.then(data => {
				let notification = {
					title: 'Alert!',
					body: data.msg,
				};
				new window.Notification(notification.title, notification);
			})
			.catch(err => console.log(err));
	};

	let visible;

	//style the table based
	if (userType === 'USER') {
		visible = !entry.userChecked;
	} //checked
	else if (userType === 'MARKETING') {
		visible = !entry.marketingManagerChecked && entry.userChecked;
	} //checked or user hasnt approed it yet
	else if (userType === 'MANAGER') {
		visible = !entry.generalManagerChecked && entry.marketingManagerChecked;
	} //checked or marketing hasnt approved it yet
	else {
		visible = false;
	}
	let stage
	if(!entry.userChecked) stage = 'stage-0'
            if(entry.userChecked && !entry.marketingManagerChecked) stage = 'stage-1'
            if(entry.userChecked && entry.marketingManagerChecked && !entry.generalManagerChecked) stage = 'stage-2'
            if(entry.userChecked && entry.marketingManagerChecked && entry.generalManagerChecked) stage = 'stage-3'
	return (
		<div className="main-container">
			<div className="btns">
				<button
					onClick={() => {
						props.history.push('/user');
					}}
					className="Home"
				>
					Home
				</button>
				{visible ? (
					<button
						onClick={() => {
							approveEntry(entry._id);
						}}
						className="Print"
					>
						Approve Entry
					</button>
				) : null}
				<button className="Print">Print</button>
				<button onClick={() => props.history.push('/entries')} className="Print">
					Entries
				</button>
				<button onClick={() => props.history.push(`/RSPD/${entry._id}`)} className="Print">
					RETAIL SELL PRICE DETERMINATION
				</button>
			</div>

			<div className="printable-container">
			{stage ? <WaterMark stage={stage}/> : null}
			
				{!entry.entries ? (
					<Loading color={'firebrick'} stroke={'5px'} size={'110px'} />
				) : (
					<div>
						<p style={{ paddingTop: '20px', paddingBottom: '10px', textAlign: 'center', color: '#444' }}>
							Supplier name : {entry.supplier ? entry.supplier : null} Date :{' '}
							{entry.addedOn ? parseISOString(entry.addedOn).substring(0, 24) : null}
						</p>
						<table className="tableizer-table">
							<thead>
								<tr className="tableizer-firstrow">
									<th>No.</th>
									<th>Product Type</th>
									<th>UOM</th>
									<th>Price Before Vat</th>
									<th>Price AfterVat</th>
								</tr>
							</thead>
							<tbody>
								
								{entry.entries.map((item, index) => {
									return (
										<tr key={Math.random()}>
											<td>{index + 1}</td>
											<td>{item.name}</td>
											<td>PCS</td>
											<td> {item.price}</td>
											<td>{(Number.parseFloat(item.price) * 1.15).toFixed(2)}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
			</div>
			{entry.imageName ? <div className="image">
			{<img src={`${link.base}uploads/${entry.imageName}`} alt=""/>}
			</div>: null}
			
		</div>
	);
};
export default Printable;
