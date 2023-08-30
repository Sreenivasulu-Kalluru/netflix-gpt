import { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL, USER_AVTAR } from '../utils/constants';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // * Validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    ////////// * Sign In / Sign Up /////////////
    if (!isSignInForm) {
      // * Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // * Signed Up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVTAR,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
        });
    } else {
      // * Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen w-screen object-cover"
          src={BG_URL}
          alt="Hero Background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute left-0 right-0 w-[70%] md:w-[70%] xl:w-[25%] p-4 md:p-8 mx-auto text-white bg-black rounded-lg my-36 bg-opacity-80 "
      >
        <h1 className="py-4 text-3xl font-bold">
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 rounded-md my-2 w-full bg-[#333333] border-b-2 transition-all duration-[.2s] border-transparent placeholder-[#868586] focus:border-b-2  focus:border-[#e50914] focus:outline-0"
          />
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email Address"
          className="p-4 rounded-md my-2 w-full bg-[#333333] border-b-2 transition-all duration-[.2s] border-transparent placeholder-[#868586] focus:border-b-2  focus:border-[#e50914] focus:outline-0"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 rounded-md my-2 w-full bg-[#333333] border-b-2 transition-all duration-[.2s]  border-transparent placeholder-[#868586] focus:border-b-2  focus:border-[#e50914]  focus:outline-0"
        />
        <p className="text-[#e50914]">{errorMessage}</p>
        <button
          className="p-4 my-6 rounded-md bg-[#e50914] hover:bg-[#d6180b] transition-all duration-[.2s] w-full font-medium"
          onClick={handleButtonClick}
        >
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>
        <p
          className="my-4 cursor-pointer opacity-50 transition-all duration-[.3s] hover:opacity-100 hover:underline"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? 'New to Netflix? Sign Up Now'
            : 'Already registered? Sign In Now'}
        </p>
      </form>
    </div>
  );
};

export default Login;
