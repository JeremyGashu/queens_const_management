import React, {useEffect, useState} from 'react';
import '../assets/css/entries.css';
import link from '../utils/link';
import Loading from 'react-simple-loading';
import {useSelector} from 'react-redux'


export const parseISOString = s => {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])).toString();
};

const Entries = props => {


	
	const userType = useSelector(state => state.authData.user.authType)
	
	const [entries, setEntries] = useState([])

	
	// let visible;

	// //style the table based
	// if (userType === 'USER') {
	// 	visible = !entry.userChecked;
	// } //checked
	// else if (userType === 'MARKETING') {
	// 	visible = !entry.marketingManagerChecked && entry.userChecked;
	// } //checked or user hasnt approed it yet
	// else if (userType === 'MANAGER') {
	// 	visible = !entry.generalManagerChecked && entry.marketingManagerChecked;
	// } //checked or marketing hasnt approved it yet
	// else {
	// 	visible = false;
	// }

    // console.log(entries.entries)
    useEffect(() => {
        fetch(`${link.base}entries/`).then(res => res.json()).then(data => setEntries(data.entries))
    }, [])

    const handleClick = (id) => {
        
        //see detail page
        props.history.push(`/printable/${id}`)
        //open windows side to side
	}
	
	

	let jsx;

	let filteredEntry = entries.filter(entry => {
		switch(userType){
			case 'USER':
				return true
			case 'MARKETING':
				return !entry.marketingManagerChecked && entry.userChecked
			case 'MANAGER':
				return !entry.generalManagerChecked && entry.marketingManagerChecked
			default: return entry
		}
	})


	if (entries) {
        // entries = entries.entries;<OnBoard />
        let stage = 'Water Mark'
		jsx = filteredEntry.map((entry, index) => {
			if(!entry.userChecked) stage = 'stage-0'
            if(entry.userChecked && !entry.marketingManagerChecked) stage = 'stage-1'
            if(entry.userChecked && entry.marketingManagerChecked && !entry.generalManagerChecked) stage = 'stage-2'
			if(entry.userChecked && entry.marketingManagerChecked && entry.generalManagerChecked) stage = 'stage-3'

			return (
				
				<tr onClick={() => {handleClick(entry._id)}} className={stage} key={entry._id}>
					<td>{index + 1}</td>
					<td>{parseISOString(entry.addedOn).substring(0, 24)}</td>
					<td>{entry.supplier}</td>
					{/* <td>
						<button className="detail-btn">Detail</button>
					</td> */}
				</tr>
			);
		});
	}
	// let dateString = parseISOString(entries[0].addedOn)

	// console.log(dateString.substring(0,24))
	// console.log(entries);
	// let e = entries.map(entry => {return <p>{entry.addedOn}</p>})
	return (
		<div className="entries-container">
			<table className="tableizer-table">
                <thead>
                    <tr className="tableizer-firstrow">
						<th>No.</th>
						<th>Date Added</th>
						<th>Supplier</th>
					</tr>
                </thead>
				<tbody>
					
					{jsx.length !== 0 ? jsx : <div className='loading'><p style={{fontSize:'40px', padding : '40px', margin : '20px'}}>No new entries are found.</p></div>}
				</tbody>
			</table>
			{/* {e} */}
			<button
				onClick={() => {
					props.history.push('/user');
				}}
				className="home-btn"
			>
				Home
			</button>
		</div>
	);
};

//green = manager approved
//yellow = marketting manager approved
//blue = user approved
//red just added

export default Entries;
