import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/');
      })
      .catch((error) => {
        // An error happened.
        navigate('/error');
      });
  };

  return (
    <div className="absolute z-10 flex items-center justify-between w-full px-8 py-2 bg-gradient-to-b from-black">
      <img
        className="w-44"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Netflix Logo"
      />

      {user && (
        <>
          <div>
            <div className="flex items-center p-2">
              <img
                className="w-12 h-12 rounded-full"
                src={user?.photoURL}
                alt="user icon"
              />

              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-white ml-4 rounded-md bg-[#e50914] w-full font-medium"
              >
                Sign Out
              </button>
            </div>
            <h4 className="text-xl font-medium">Hello👋, {user.displayName}</h4>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
