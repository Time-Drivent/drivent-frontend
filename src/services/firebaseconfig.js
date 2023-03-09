import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCcDocJmACaQnHwV7O7bxzHi45k9QWfBCU',
  authDomain: 'drivent-38bdd.firebaseapp.com',
  projectId: 'drivent-38bdd',
  storageBucket: 'drivent-38bdd.appspot.com',
  messagingSenderId: '1043691140799',
  appId: '1:1043691140799:web:57a907c5a4a7ae1f69f80a'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
