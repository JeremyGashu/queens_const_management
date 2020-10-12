import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import link from '../utils/link';
import { showState, clearBoard, submitStarted, submitFinished } from '../actions/action';
import { storage } from '../firebase/firebase';

const BottomButtons = (props) => {
	const onBoared = useSelector((state) => state.onBoard);
	const supplier = useSelector((state) => state.onBoard.supplier);
	const submitting = useSelector((state) => state.submitting);
	const entryImage = useSelector((state) => state.entryImage);
	const dispatch = useDispatch();
	const submitEntry = () => {
		let data = JSON.stringify({ entries: onBoared.entries, supplier, entryImage });
		let formData = new FormData();
		formData.append('entryImage', entryImage);
		// formData.append('entries', onBoared.entries)
		// formData.append('supplier', supplier)

		//send pic and entry info with different endOint(may be vad design pattern but it slves the problem)

		dispatch(showState());
		if (onBoared.entries.length > 0) {
			dispatch(submitStarted());
			fetch(`${link.base}entries/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: data,
			})
				.then((response) => response.json())
				.then((data) => {
					let entryId = data.entry._id;
					if (entryImage) {
						// fetch(`${link.base}entries/image/${entryId}`, {
						// 	method: 'POST',
						// 	body: formData,
						// }).then(res => res.json())
						// .then(data => console.log(data))
						// .catch(err => console.log(err))

						const uploadTask = storage.ref(`/images/${entryImage.name}`).put(entryImage);

						uploadTask.on(
							'state_changed',
							(snapShot) => {
								//takes a snap shot of the process as it is happening
								console.log(snapShot);
							},
							(err) => {
								//catches the errors
								console.log(err);
							},
							() => {
								// gets the functions from storage refences the image storage in firebase by the children
								// gets the download url then sets the image from firebase as the value for the imgUrl key:
								storage
									.ref('images')
									.child(entryImage.name)
									.getDownloadURL()
									.then((fireBaseUrl) => {
										console.log(fireBaseUrl);
										fetch(`${link.base}entries/image/${entryId}`, {
											method: 'POST',
											headers: {
												'Content-Type': 'application/json',
											},
											body: JSON.stringify({filename : fireBaseUrl}),
										}).then(res => res.json())
										.then(data => console.log(data))
										.catch(err => console.log(err))
									});
							}
						);
					}
					//check if it is not empty
					//send Image now
					dispatch(clearBoard());
					dispatch(submitFinished());
					let notification = {
						title: 'New Entry',
						body: 'New Entry Added Successfully!',
					};
					new window.Notification(notification.title, notification);
				})
				.catch((error) => {
					console.error('Error:', error);
					// submitting = []
				});
		}
	};

	return (
		<div className="last-button">
			<button disabled={submitting || !entryImage} onClick={submitEntry} className="submit">
				Submit
			</button>
			<button className="comment">Comment</button>
		</div>
	);
};

export default BottomButtons;
