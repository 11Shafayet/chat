import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { getSender } from '../../config/chatLogics';
import { ChatState } from '../../Context/ChatProvider';
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:5173';
var socket, selectedChatCompare;

const MessageBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, loggedInUser } = ChatState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);

  const user = JSON.parse(localStorage.getItem('userInfo'));

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:5000/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit('join chat', selectedChat._id);
    } catch (error) {
      toast.warning('Something went wrong while fetching messages!');
    }
  };

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newMessage) {
      toast.warning('Please write a message!');
      return;
    }

    if (loggedInUser) {
      try {
        setLoading(true);
        const submitingData = {
          content: newMessage,
          chatId: selectedChat._id,
        };

        const config = {
          headers: {
            'Content-type': 'Application/json',
            Authorization: `Bearer ${loggedInUser.token}`,
          },
        };
        setNewMessage('');
        const { data } = await axios.post(
          `http://localhost:5000/api/message`,
          submitingData,
          config
        );
        console.log(data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.warning('Error sending message!');
      }
    }

    return;
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connection', () => setSocketConnected(true));
  }, [user]);

  return !selectedChat ? (
    <div className="h-full w-full flex justify-center items-center">
      <h5 className="text-xl md:text-3xl font-bold uppercase">
        Please Select a chat
      </h5>
    </div>
  ) : (
    <div className="flex flex-col gap-4 h-full ">
      {/* header */}
      <div className="flex justify-between items-center gap-x-3 h-[7%]">
        <h3 className="text-2xl md:text-3xl font-bold capitalize">
          {selectedChat?.isGroupChat
            ? selectedChat.chatName
            : getSender(loggedInUser, selectedChat.users)}
        </h3>
        <button className="py-2 px-4 bg-teal-400 hover:bg-teal-500 text-white rounded-lg duration-300">
          <FaEye size={22} />
        </button>
      </div>
      {/* chat box */}
      <div className="w-full  bg-gray-100 rounded-lg p-3 flex flex-col justify-end !overflow-y-scroll h-[93%]">
        <ScrollableChat messages={messages} />

        <form action="" className="flex gap-x-2" onSubmit={handleSubmit}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="h-14 bg-gray-200 w-full py-2 px-3 rounded-md focus:outline-teal-400"
          />
          <button
            className="py-2 h-full px-5 bg-teal-400 text-white uppercase hover:bg-teal-500 duration-300 rounded-md"
            type="submit"
          >
            Send
          </button>
        </form>
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

export default MessageBox;
