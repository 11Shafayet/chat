import Navbar from '../components/chat/Navbar';
import Sidebar from '../components/chat/Sidebar';

const ChatPage = () => {
  return (
    <section className="min-h-screen p-4 ">
      <div className="flex flex-col gap-y-4">
        <Navbar />
        <div className="grid grid-cols-10 gap-4 min-h-[85vh]">
          <div className="col-span-10 sm:col-span-4 md:col-span-3 shadow-light w-full p-4 rounded-lg sm:h-full">
            <Sidebar />
          </div>
          <div className="col-span-10 sm:col-span-6 md:col-span-7 shadow-light w-full p-4 rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};

export default ChatPage;
