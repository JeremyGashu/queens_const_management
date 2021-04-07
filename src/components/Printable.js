import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import link from '../utils/link';
import '../assets/css/printable.css';
import { parseISOString } from './Entries';
import Loading from 'react-simple-loading';
import WaterMark from './WaterMark';
import FinanceSignature from '../assets/images/finance_manager_signature.jpg';
import GeneralManagerSignature from '../assets/images/general_manager_signature.jpg';

const Printable = (props) => {
	const showImageSignal = (imageUrl) => {
		window.ipcRenderer.send('show-image', imageUrl);
	};
	const userType = useSelector((state) => state.authData.user.authType);
	const [entry, setEntry] = useState({});

	const id = props.match.params.entry_id;
	useEffect(() => {
		fetch(`${link.base}entries/${id}/`)
			.then((res) => res.json())
			.then((data) => {
				setEntry(data);
			})
			.catch((err) => console.log(err));
	}, []);

	let stage;
	let signature;
	let name;
	if (!entry.userChecked) stage = 'stage-0';
	if (entry.userChecked && !entry.marketingManagerChecked) stage = 'stage-1';
	if (entry.userChecked && entry.marketingManagerChecked && !entry.generalManagerChecked) {
		stage = 'stage-2';
		signature = FinanceSignature;
		name = 'Yetinayet Taye';
	}
	if (entry.userChecked && entry.marketingManagerChecked && entry.generalManagerChecked) {
		stage = 'stage-3';
		signature = GeneralManagerSignature;
		name = 'Meryem Oumer';
	}
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

				<button className="Print">Print</button>
				<button onClick={() => props.history.push('/entries')} className="Print">
					Entries
				</button>
				{userType !== 'BRANCH' ? <button onClick={() => props.history.push(`/RSPD/${entry._id}`)} className="Print">
					RETAIL SELL PRICE DETERMINATION
				</button> : null}
				
			</div>

			<div className="printable-container">
				{stage ? <WaterMark stage={stage} /> : null}

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
											<td>
												{(
													Number.parseFloat(item.price) +
													Number.parseFloat(item.price) * 0.15 +
													Number.parseFloat(item.price) * 0.01
												).toFixed(2)}
											</td>
											<td>{
                                                (((Number.parseFloat(item.price) + Number.parseFloat(item.price) * 0.15 + (Number.parseFloat(item.price) * 0.01)) * 0.15) + (Number.parseFloat(item.price) + Number.parseFloat(item.price) * 0.15 + (Number.parseFloat(item.price) * 0.01))).toFixed(2)
                                            } </td>
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
				{signature ? (
					<>
						<span>{name}</span> <img src={signature} alt="" />
					</>
				) : null}
			</div>
			
			{entry.imageName && (userType !== 'BRANCH') ? (
				<div onClick={() => showImageSignal(entry.imageName)} className="image">
					{<img style={{ cursor: 'pointer' }} src={entry.imageName} alt="" />}
				</div>
			) : null}
		</div>
	);
};
export default Printable;
