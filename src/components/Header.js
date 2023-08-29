import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

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
  }, []);

  return (
    <div className="absolute z-10 flex items-center justify-between w-full px-8 py-2 bg-gradient-to-b from-black">
      <img className="w-44" src={LOGO} alt="Netflix Logo" />

      {user && (
        <>
          <div>
            <div className="flex items-center p-2">
              <img
                className="w-12 h-12 rounded-full shadow-md"
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
