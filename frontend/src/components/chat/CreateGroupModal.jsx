import { FaTimes } from 'react-icons/fa';
import { ChatState } from '../../Context/ChatProvider';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { PropagateLoader } from 'react-spinners';
import axios from 'axios';
import UserListItem from './UserListItem';

const CreateGroupModal = () => {
  const { createGroupModal, setCreateGroupModal, chats, setChats } =
    ChatState();
  const [newGroupName, setNewGroupName] = useState('');
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { loggedInUser } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
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

  const handleGroupUser = async (user) => {
    if (selectedUsers.includes(user)) {
      return;
    }
    setSelectedUsers([...selectedUsers, user]);
  };

  const removeUser = (user) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== user._id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    if (!newGroupName) {
      toast.warning('Group Name Is required!');
    }
    if (selectedUsers.length < 2) {
      toast.warning('please choose at least 2 users!');
    }

    try {
      const sendingData = {
        name: newGroupName,
        users: JSON.stringify(selectedUsers.map((user) => user._id)),
      };
      const config = {
        headers: {
          'Content-type': 'Application/json',
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/chat/group',
        sendingData,
        config
      );

      setSubmitLoading(false);
      setChats([data, ...chats]);
      setCreateGroupModal(false);
      toast.success('New Group Created Successfully!');
    } catch (error) {
      setSubmitLoading(false);
      toast.warning('Failed To Create New Group');
    }
  };
  return (
    <>
      {createGroupModal && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 shadow-md rounded-lg p-4 md:p-6 z-[1000] sm:w-[500px]">
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <h4 className="font-bold text-2xl">Create Group Chat</h4>
            <FaTimes
              className="hover:text-teal-400 duration-500 cursor-pointer"
              size={22}
              onClick={() => setCreateGroupModal(false)}
            />
          </div>
          <form
            className="flex flex-col gap-y-3 text-center justify-center items-center"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Chat Name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="bg-gray-100 w-full h-14 py-2 px-3 rounded-lg shadow-md focus:outline-teal-400"
            />
            <input
              type="text"
              placeholder="Search User"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-gray-100 w-full h-14 py-2 px-3 rounded-lg shadow-md focus:outline-teal-400"
            />
            {selectedUsers && (
              <div className="flex flex-wrap gap-3 items-center justify-start w-full">
                {selectedUsers?.map((user) => (
                  <div
                    className="bg-teal-400 text-white px-2 py-1 rounded-full cursor-pointer hover:bg-teal-600 duration-300"
                    key={user._id}
                    onClick={() => removeUser(user)}
                  >
                    {user.name} ✘
                  </div>
                ))}
              </div>
            )}

            {loading ? (
              <PropagateLoader
                size={11}
                className="my-4 text-center"
                color="#36d7b7"
              />
            ) : (
              <div className="flex flex-col gap-y-3 w-full">
                {searchResult.slice(0, 5)?.map((user, i) => (
                  <UserListItem
                    key={i}
                    user={user}
                    accessChat={handleGroupUser}
                  />
                ))}
              </div>
            )}
            <div className="flex w-full">
              <button
                type="submit"
                className={`bg-teal-400 hover:bg-teal-500 text-white px-7 py-3 rounded-lg ${
                  submitLoading
                    ? 'opacity-25 cursor-not-allowed'
                    : 'opacity-100 cursor-pointer'
                }`}
                disabled={submitLoading}
              >
                {!submitLoading ? 'Create Group' : '...'}
              </button>
            </div>
          </form>
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
      )}
    </>
  );
};

export default CreateGroupModal;
