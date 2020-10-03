import React, { useEffect } from 'react';
import AddItem from './AddItem';
import OnBoard from './OnBoard';
import BottomButtons from './BottomButton';
import { useSelector, useDispatch } from 'react-redux';
import { clearAuthData, setEntries } from '../actions/action';
import link from '../utils/link';

const User = props => {
    const userType = useSelector(state => state.authData.user.authType);
    
    const checkEntries = () => {
        props.history.push('/entries')
    }

    const updateEntries = () => {
        fetch(`${link.base}entries`)
			.then(res => res.json())
			.then(data => {
                dispatch(setEntries(data))
                // dispatch(showState())
			})
			.catch(err => console.log(err));
	};
    
    setInterval(updateEntries,15000)
	useEffect(() => {
		fetch(`${link.base}entries`)
			.then(res => res.json())
			.then(data => {
                dispatch(setEntries(data))
				let exist;
				switch (userType) {
					case 'USER':
						exist = data.entries.filter(item => item.userChecked === false);
						break;
					case 'MANAGER':
						exist = data.entries.filter(item => ((item.generalManagerChecked === false) && (item.marketingManagerChecked)));
						break;
					case 'MARKETING':
						exist = data.entries.filter(item => ((item.marketingManagerChecked === false) && (item.userChecked)));
						break;
					default:
						break;
				}
				
				if (exist) {
					if(exist.length > 0) {
						let notification = {
						title: 'Unchecked Entries!',
						body: 'There are uncheked entries!',
					};
					new window.Notification(notification.title, notification);
					}
					
				}
			})
			.catch(err => console.log(err));
	}, []);
	//authData, user, authType
	const dispatch = useDispatch();

	const onBoared = useSelector(state => state.onBoard);
	const logout = () => {
		dispatch(clearAuthData());
		props.history.push('/');
	};
	return (
		<div className="user-container">
			{userType === 'USER' ? <AddItem /> : null}
			<OnBoard />
			{onBoared.entries.length > 0 ? <BottomButtons /> : null}
			<button onClick={checkEntries} className="check-btn">
				Check Entry
			</button>
			<button onClick={logout} className="logout">
				Sign Out
			</button>
		</div>
	);
};
export default User;
