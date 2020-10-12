import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
	apiKey: 'AIzaSyDqFrhCYcoQpHCgd1LBjggc9OIdpHThV2A',
	authDomain: 'queens-images.firebaseapp.com',
	databaseURL: 'https://queens-images.firebaseio.com',
	projectId: 'queens-images',
	storageBucket: 'queens-images.appspot.com',
	messagingSenderId: '418745886626',
	appId: '1:418745886626:web:e375bf5be29dbae61b34fb',
	measurementId: 'G-N1LZ3FJMLL',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()

export  {
    storage, firebase as default
  }