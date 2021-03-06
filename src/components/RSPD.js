import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import '../assets/css/RSPD.css';
import link from '../utils/link';
import { parseISOString } from './Entries';
import Loading from 'react-simple-loading';
import WaterMark from './WaterMark';
import FinanceSignature from '../assets/images/finance_manager_signature.jpg'
import GeneralManagerSignature from '../assets/images/general_manager_signature.jpg'


const RSPD = props => {


	const showImageSignal = (imageUrl) => {
		window.ipcRenderer.send('show-image', imageUrl)
	}
	// const userType = useSelector(state => state.authData.user.authType);

	const [entry, setEntry] = useState({});
	const userType = useSelector(state => state.authData.user.authType);


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

	const id = props.match.params.entry_id;

	let stage
	let signature
	
	let name
	if(!entry.userChecked) stage = 'stage-0'
            if(entry.userChecked && !entry.marketingManagerChecked) stage = 'stage-1'
            if(entry.userChecked && entry.marketingManagerChecked && !entry.generalManagerChecked) {stage = 'stage-2' ; signature = FinanceSignature;name='Yetinayet Taye'}
            if(entry.userChecked && entry.marketingManagerChecked && entry.generalManagerChecked) {stage = 'stage-3' ;signature = GeneralManagerSignature; name = 'Meryem Oumer'}
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
				<button onClick={() => props.history.push(`/printable/${id}`)}>
					Time Controlled Price List
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
									<th>Direct Cost</th>
									<th>Direct Cost +VAT</th>
									<th>Total Overhead Cost</th>
									<th>&nbsp;</th>
									<th>Total Cost</th>
									<th>Recommended profit margin %</th>
									<th>Recommended Retail sale price &amp; Qty</th>
									<th>&nbsp;</th>
									<th>&nbsp;</th>
									<th>&nbsp;</th>
									<th>Existing Price</th>
									<th>Market Price</th>
									<th>Remark</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>%</td>
									<td>Amount</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>QTY</td>
									<td>selling price before VAT</td>
									<td>VAT</td>
									<td>selling price</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
								</tr>
								{/* <tr>
									<td>1</td>
									<td>Telba 1kg</td>
									<td>pcs</td>
									<td>90.00</td>
									<td>135.01</td>
									<td>14.00</td>
									<td>12.60</td>
									<td>102.61</td>
									<td>1.00%</td>
									<td>1</td>
									<td> 103.63 </td>
									<td> 15.54 </td>
									<td>119.18 </td>
									<td> 117.00 </td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
								</tr> */}

								{entry.entries.map((item, index) => {
									return (
										<tr key={Math.random()}>
											<td>{index + 1}</td>
											<td>{item.name}</td>
											<td>PCS</td>
											<td>{Number.parseFloat(item.price)}</td>
											<td>{(Number.parseFloat(item.price)  * 1.15).toFixed(2)}</td>
											<td>14.00</td>
											<td>{(Number.parseFloat(item.price) * 0.14).toFixed(2)}</td>
											<td>{((Number.parseFloat(item.price) * 0.14) + Number.parseFloat(item.price)).toFixed(2) }</td>
											<td>1.00%</td>
											<td>1</td>
											<td>{

                                                (Number.parseFloat(item.price) + (Number.parseFloat(item.price) * 0.15) + (Number.parseFloat(item.price) * 0.01)).toFixed(2)
                                            }</td>
											<td>{((Number.parseFloat(item.price) + (Number.parseFloat(item.price) * 0.15) + (Number.parseFloat(item.price) * 0.01)) * 0.15).toFixed(2)}</td>
											<td>{
                                                (((Number.parseFloat(item.price) + Number.parseFloat(item.price) * 0.15 + (Number.parseFloat(item.price) * 0.01)) * 0.15) + (Number.parseFloat(item.price) + Number.parseFloat(item.price) * 0.15 + (Number.parseFloat(item.price) * 0.01))).toFixed(2)
                                            } </td>
											<td> NEW </td>
											<td>&nbsp;</td>
											<td>&nbsp;</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
			</div>
			<div className="signature">
				{name ? <p>Approved By : </p> : null}
				{signature ? <><span>{name}</span> <img src={signature} alt=""/></> : null}
			</div>
			{entry.imageName && (userType !== 'BRANCH') ? (
				<div onClick={() => showImageSignal(entry.imageName)} className="image">
					{<img style={{ cursor: 'pointer' }} src={entry.imageName} alt="" />}
				</div>
			) : null}
		</div>
	);
};
export default RSPD;
