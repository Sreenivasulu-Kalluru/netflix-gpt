import { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
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
            photoURL: 'https://avatars.githubusercontent.com/u/84690382?v=4',
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
              navigate('/browse');
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
          console.log(user);
          navigate('/browse');
          // ...
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
          src="https://assets.nflxext.com/ffe/siteui/vlv3/00103100-5b45-4d4f-af32-342649f1bda5/64774cd8-5c3a-4823-a0bb-1610d6971bd4/IN-en-20230821-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="Hero Background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute left-0 right-0 w-3/12 p-8 mx-auto text-white bg-black rounded-lg my-36 bg-opacity-80 "
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
          className="p-4 my-6 rounded-md bg-[#e50914] w-full font-medium"
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
