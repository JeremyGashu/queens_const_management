import React, { useState } from 'react';
import {useDispatch} from 'react-redux'

import '../assets/css/login.css';
import link from '../utils/link';
import { setAuthData, showState } from '../actions/action';


const Login = props => {

	const dispatch = useDispatch()
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const changeUsername = e => {
		setUsername(e.target.value);
	};
	const changePass = e => {
		setPassword(e.target.value);
	};

	const login = e => {
		const data = { username, password};
		fetch(`${link.base}user/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					// console.log(data.user.authType)
					dispatch(setAuthData(data))
					dispatch(showState())
					props.history.push('/user')
				} else {
					console.log('incorrect')
				}
			})
			.catch(error => {
				console.error('Error:', error);
			});
	};

	return (
		<div className="main">
			<p className="sign" align="center">
				Sign in
			</p>
			<div>
				<input className="un" onChange={changeUsername} type="text" align="center" placeholder="Username" />
				<input className="pass" onChange={changePass} type="password" align="center" placeholder="Password" />
				<div className='signInButton'>
				<button onClick={login} className="submit" align="center">
					Sign in
				</button>
				</div>
				{/* <p className="clear" align="center">
					<a>Clear</a>
				</p> */}
				<p className="error hidden" align="center">
					Incorrect username or password.
				</p>
			</div>
		</div>
	);
};

export default Login;
