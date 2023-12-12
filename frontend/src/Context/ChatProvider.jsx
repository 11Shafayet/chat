import { createContext, useContext, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const contexts = {
    selectedChat,
    setSelectedChat,
    loggedInUser,
    setLoggedInUser,
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
