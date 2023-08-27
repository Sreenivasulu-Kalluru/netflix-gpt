import { useState } from 'react';
import Header from './Header';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

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
      <form className="w-3/12 p-8 bg-black absolute my-36 mx-auto right-0 left-0 rounded-lg text-white bg-opacity-80 ">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 rounded-md my-2 w-full bg-[#333333] border-b-2 transition-all duration-[.2s] border-transparent placeholder-[#868586] focus:border-b-2  focus:border-[#e50914] focus:outline-0"
          />
        )}
        <input
          type="email"
          placeholder="Email Address"
          className="p-4 rounded-md my-2 w-full bg-[#333333] border-b-2 transition-all duration-[.2s] border-transparent placeholder-[#868586] focus:border-b-2  focus:border-[#e50914] focus:outline-0"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 rounded-md my-2 w-full bg-[#333333] border-b-2 transition-all duration-[.2s]  border-transparent placeholder-[#868586] focus:border-b-2  focus:border-[#e50914]  focus:outline-0"
        />
        <button className="p-4 my-6 rounded-md bg-[#e50914] w-full font-medium">
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>
        <p
          className="py-4 cursor-pointer opacity-50 transition-all duration-[.3s] hover:opacity-100"
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
