import React, { useState } from 'react';
import {useDispatch} from 'react-redux'
import '../assets/css/user.css';
import { addItem, setSupplier } from '../actions/action';

export default function AddItem() {
	const dispatch = useDispatch()
    // const [items, setItems] = useState([]);
    
    const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	// const [supplier, setSuppplier] = useState(1)

	const changeName = e => {
		setName(e.target.value)
	};
	
	const changePrice = e => {
		setPrice(e.target.value)
	}

	const changeSupplier = e => {
		// setSuppplier(e.target.value)
		dispatch(setSupplier(e.target.value))
	}

	

	const addItemToEntry = e => {
		if(name !== '' && price !== ''){
			dispatch(addItem({name, price, id : Math.random()}))	
		}
	}
	return (
		<div className="form-container">
			<input type="text" name="name" onChange={changeName} placeholder="Enter name..." className="name-field" />
			<input type="number" min={0} onChange={changePrice} name="price" placeholder="Enter Price..." className="price-field" />
			<select defaultValue={'5f6aebaaee2db900171ee583'} onChange={changeSupplier} name="supplier" className="supplier">
				<option value={'5f6aeb98ee2db900171ee582'}>Samuel Negash</option>
				<option value={'5f6aeb79ee2db900171ee580'}>Abebe Gedefaw</option>
				<option value={'5f6aeb89ee2db900171ee581'}>Ermias Nebiyu</option>
				<option value={'5f6aeb98ee2db900171ee582'}>Tasew Tamiru</option>
				<option value={'5f6aeb79ee2db900171ee580'}>Adem Demile</option>
				<option value={'5f6aeb89ee2db900171ee581'}>Nessir Shikur</option>
				<option value={'5f6aeb98ee2db900171ee582'}>Adanech Abebe</option>
				<option value={'5f6aeb79ee2db900171ee580'}>Takele Uma</option>
				<option value={'5f6aeb89ee2db900171ee581'}>Abiy Ahmad</option>
				<option  value={'5f6aebaaee2db900171ee583'}>Other...</option>
			</select>
			<button onClick={addItemToEntry} className="add-item" align="center">
				Add Item
			</button>
		</div>
	);
}
