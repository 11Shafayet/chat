import { useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import CreateGroupModal from '../components/chat/CreateGroupModal';
import Drawer from '../components/chat/Drawer';
import Navbar from '../components/chat/Navbar';
import ProfileModal from '../components/chat/ProfileModal';
import Sidebar from '../components/chat/Sidebar';
import MessageBox from '../components/chat/MessageBox';

const ChatPage = () => {
  const {
    drawerOpen,
    modalOpen,
    loggedInUser,
    createGroupModal,
    selectedChat,
  } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <section className="min-h-screen p-4 relative z-10">
      {modalOpen && <ProfileModal user={loggedInUser} />}
      {createGroupModal && <CreateGroupModal />}
      {drawerOpen && <Drawer />}
      <div className="flex flex-col gap-y-4">
        <Navbar />
        <div className="grid grid-cols-10 gap-4 min-h-[85vh]">
          <div className="col-span-10 sm:col-span-4 md:col-span-3 shadow-light w-full p-4 rounded-lg sm:h-full">
            <Sidebar fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </div>
          <div className="col-span-10 sm:col-span-6 md:col-span-7 shadow-light w-full p-4 rounded-lg max-h-[85vh]">
            <MessageBox
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatPage;
