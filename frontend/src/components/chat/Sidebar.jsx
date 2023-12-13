import { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import { getSender } from '../../config/chatLogics';
import { PropagateLoader } from 'react-spinners';

const Sidebar = () => {
  const [loggedUser, setLoggedUser] = useState();
  const [chatLoading, setChatLoading] = useState();
  const {
    loggedInUser,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    setCreateGroupModal,
  } = ChatState();

  const fetchChats = async () => {
    try {
      setChatLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
        },
      };

      const { data } = await axios.get(
        'http://localhost:5000/api/chat',
        config
      );

      setChatLoading(false);
      setChats(data);
    } catch (error) {
      toast.warning('Failed To fetch chats!');
    }
  };

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    setLoggedUser(storedUserInfo);
  }, []);

  useEffect(() => {
    if (loggedUser) {
      fetchChats();
    }
  }, [loggedUser]);

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">
          My Chats
        </h3>
        <button
          className="py-2.5 px-5 bg-slate-200 rounded-md text-lg font-medium hover:bg-slate-300 duration-300"
          onClick={() => setCreateGroupModal(true)}
        >
          <FaUsers size={22} />
        </button>
      </div>

      {chatLoading ? (
        <div className="flex justify-center items-center">
          <PropagateLoader
            size={11}
            className="my-4 text-center"
            color="#36d7b7"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-y-2 bg-gray-50 h-full w-full p-2">
          {chats?.map((chat) => (
            <div
              className={`flex flex-col p-2 md:p-3 hover:bg-teal-400 hover:text-white rounded-xl duration-500 cursor-pointer ${
                selectedChat === chat ? 'bg-teal-400 text-white' : 'bg-gray-200'
              }`}
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
            >
              <h4 className="text-lg font-bold">
                {chat.isGroupChat
                  ? chat.chatName
                  : getSender(loggedUser, chat.users)}
              </h4>
              <p className="text-sm">
                <span className="font-bold">{chat?.chatName} </span> Hello THere
              </p>
            </div>
          ))}
        </div>
      )}

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

export default Sidebar;
