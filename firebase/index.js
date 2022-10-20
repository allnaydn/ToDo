import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBfFeaoL3UtHvLFceb-kE8ziE2fC2MdzEo",
    authDomain: "modern-react-app-5ab99.firebaseapp.com",
    projectId: "modern-react-app-5ab99",
    storageBucket: "modern-react-app-5ab99.appspot.com",
    messagingSenderId: "433135622498",
    appId: "1:433135622498:web:f95305a672f3e92013f43b"
  };

  initializeApp(firebaseConfig);

  const db=getFirestore();
  const auth=getAuth();
  const provider= new GoogleAuthProvider();

  export {db,auth,provider}