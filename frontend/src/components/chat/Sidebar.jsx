import { FaUsers } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">
          My Chats
        </h3>
        <button className="py-2.5 px-5 bg-slate-200 rounded-md text-lg font-medium hover:bg-slate-300 duration-300">
          <FaUsers size={22} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
