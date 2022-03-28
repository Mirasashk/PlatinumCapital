import { getFirestore } from 'firebase/firestore';
import { initializeApp } from '@firebase/app';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyC4k0awb3-q9LK2UUYDJncOAevfr127vQw',
  authDomain: 'platinumcapital-ffcb4.firebaseapp.com',
  databaseURL:
    'https://platinumcapital-ffcb4-default-rtdb.firebaseio.com',
  projectId: 'platinumcapital-ffcb4',
  storageBucket: 'platinumcapital-ffcb4.appspot.com',
  messagingSenderId: '141383843971',
  appId: '1:141383843971:web:693448d6f024f4f9699bb6',
};

const firebase = () => {
  initializeApp(firebaseConfig);
  getFirestore();
};

export default firebase;

// export const fbApp = () => {
//   initializeApp(firebaseConfig);
// };

// export const db = getFirestore(fbApp);
