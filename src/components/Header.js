import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate('/error');
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate('/browse');
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate('/');
      }
    });

    // * Unsubscribe when component unmounts
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGptSearchClick = () => {
    // * Toggle GPT Search Button
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="sticky top-0 z-10 flex flex-col md:flex-row items-center justify-between w-full px-8 py-2 bg-black shadow-md">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="Netflix Logo" />

      {user && (
        <>
          <button
            onClick={handleGptSearchClick}
            className="px-8 py-2 mx-4 text-white bg-purple-800 font-medium rounded-md hover:bg-purple-600 transition-all duration-[.2s]"
          >
            {showGptSearch ? '🏠 HomePage' : 'GPT Search 🔎'}
          </button>

          <div>
            <div className="flex items-center p-2">
              {showGptSearch && (
                <select
                  className="p-2 m-2 hidden md:block text-white bg-gray-900"
                  onChange={handleLanguageChange}
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.identifier} value={lang.identifier}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              )}
              <img
                className="w-12 h-12 rounded-full shadow-md m-2 hidden md:block"
                src={user?.photoURL}
                alt="user icon"
              />

              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-white shadow-md ml-4 rounded-md bg-[#e50914] hover:bg-[#d6180b] transition-all duration-[.2s] w-full font-medium"
              >
                Sign Out
              </button>
            </div>
            <h4 className="text-xl font-medium text-white">
              Hello👋, {user.displayName}
            </h4>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
