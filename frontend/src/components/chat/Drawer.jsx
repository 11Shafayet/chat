import { FaTimes } from 'react-icons/fa';
import { ChatState } from '../../Context/ChatProvider';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { PropagateLoader } from 'react-spinners';
import UserListItem from './UserListItem';

const Drawer = () => {
  const { loggedInUser, setDrawerOpen, chats, setChats } = ChatState();
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);

  // handle search
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!search) {
      toast.warning('Please enter something!');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/user?search=${search}`,
        config
      );

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.warning('Something went wrong!');
      setLoading(false);
    }
  };

  // access chat
  const accessChat = async (user) => {
    const userId = user._id;
    try {
      setChatLoading(true);
      const config = {
        headers: {
          'Content-type': 'Application/json',
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/chat`,
        { userId },
        config
      );

      if (!chats.find((u) => u._id === data._id)) setChats([data, ...chats]);

      setDrawerOpen(false);
    } catch (error) {
      toast.warning('Something went wrong!');
      setLoading(false);
    }
  };

  return (
    <div className="absolute left-0 top-0 bottom-0 h-full w-[300px] bg-white z-[100000] shadow-md ">
      <div className="flex justify-between items-center gap-x-3 p-4 mb-4">
        <h4 className="text-2xl font-medium">Search User</h4>
        <FaTimes
          size={22}
          className="hover:text-teal-400 cursor-pointer"
          onClick={() => setDrawerOpen(false)}
        />
      </div>
      <div className="border-b border-gray-200" />

      <div className="p-4">
        <form
          action=""
          className="flex gap-x-3 mb-2"
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[45px] bg-gray-100 rounded-md focus:outline-none focus:outline-teal-400 px-3"
          />
          <button
            type="submit"
            className="bg-teal-400 text-white uppercase rounded-md px-4"
          >
            Go
          </button>
        </form>

        {loading ? (
          <PropagateLoader
            size={11}
            className="my-4 text-center"
            color="#36d7b7"
          />
        ) : (
          <div className="flex flex-col gap-y-3">
            {searchResult?.map((user, i) => (
              <UserListItem key={i} user={user} accessChat={accessChat} />
            ))}
          </div>
        )}

        {chatLoading && (
          <PropagateLoader
            size={11}
            className="my-4 text-center"
            color="#36d7b7"
          />
        )}
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Drawer;
