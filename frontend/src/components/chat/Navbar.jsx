import logo from '/assets/logo.png';
import { FaSearch, FaBell } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center shadow-light w-full p-4 rounded-lg min-h[8vh]">
      {/* search bar */}
      <form className="relative">
        <input
          type="text"
          className="w-[80px] sm:w-full min-h-[50px] shadow-light py-2 px-3 leading-6 focus:outline-cyan-500"
        />
        <button className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer hover:text-cyan-500 z-10 opacity-75">
          <FaSearch size={20} />
        </button>
      </form>
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
        <img
          src=""
          alt=""
          className="w-10 h-10 rounded-full duration-300 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
