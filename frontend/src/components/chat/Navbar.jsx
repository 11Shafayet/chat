import { ChatState } from '../../Context/ChatProvider';
import { useNavigate } from 'react-router-dom';
import logo from '/assets/logo.png';
import { FaSearch, FaBell } from 'react-icons/fa';

const Navbar = () => {
  const {
    loggedInUser,
    setLoggedInUser,
    setDrawerOpen,
    setModalOpen,
    openProfile,
    setOpenProfile,
  } = ChatState();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    setLoggedInUser();
    navigate('/');
  };

  return (
    <div className="flex justify-between items-center shadow-light w-full p-4 rounded-lg min-h[8vh]">
      {/* search bar */}
      <div
        className="relative w-[50] sm:w-[180px] flex items-center h-12 bg-gray-50 shadow-md px-3 cursor-pointer hover:bg-gray-100"
        onClick={() => setDrawerOpen(true)}
      >
        <h2 className="hidden sm:block">Search User</h2>
        <button className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer hover:text-cyan-500 z-10 opacity-75">
          <FaSearch size={20} />
        </button>
      </div>
      {/* logo */}
      <div>
        <img src={logo} alt="" className="max-w-[80px] max-h-[50px] " />
      </div>
      {/* notification and profile */}
      <div className="flex items-center gap-x-6">
        <FaBell
          size={25}
          className="hover:text-cyan-500 duration-300 cursor-pointer"
        />
        <div className="relative">
          <img
            src={loggedInUser?.pic}
            alt=""
            className="w-10 h-10 rounded-full duration-300 cursor-pointer"
            onClick={() => setOpenProfile((prev) => !prev)}
          />
          {openProfile && (
            <div className="absolute top-full right-0 bg-gray-50 shadow-md p-2 flex flex-col gap-y-3 w-[200px]">
              <button
                className="text-lg hover:bg-teal-400 hover:text-white duration-500 w-full py-2 rounded-xl"
                onClick={() => {
                  setModalOpen(true);
                  setOpenProfile(false);
                }}
              >
                My Profile
              </button>
              <button
                className="text-lg hover:bg-teal-400 hover:text-white duration-500 w-full py-2 rounded-xl"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
