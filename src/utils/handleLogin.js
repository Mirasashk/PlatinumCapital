import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth';

function AuthProvider(props) {
  const data = new FormData(props.target);
  const auth = getAuth();

  if (props.target[4].checked) {
    // Local Persistence
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(
          auth,
          data.get('email'),
          data.get('password')
        );
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
  } else {
    // Session Persistence
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(
          auth,
          data.get('email'),
          data.get('password')
        );
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
  }
  return true;
}

export default AuthProvider;

// How data is acessed from the props
// console.log(data.get('email'));
// console.log(data.get('password'));
// console.log(props.target[4].checked);
