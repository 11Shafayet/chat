import { createContext, useContext, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [createGroupModal, setCreateGroupModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setLoggedInUser(userInfo);
    if (!userInfo) navigate('/');
  }, [navigate]);

  const contexts = {
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    loggedInUser,
    setLoggedInUser,
    drawerOpen,
    setDrawerOpen,
    modalOpen,
    setModalOpen,
    openProfile,
    setOpenProfile,
    createGroupModal,
    setCreateGroupModal,
  };
  return (
    <ChatContext.Provider value={contexts}>{children}</ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

ChatProvider.propTypes = {
  children: PropTypes.any,
};

export default ChatProvider;
