const Tab = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full flex flex-nowrap shadow-light py-2 px-3 rounded-lg gap-x-3 mb-4">
      <h3
        className={`${
          activeTab ? 'bg-cyan-500' : 'bg-slate-400'
        } w-1/2 py-2 px-4 rounded-md hover:bg-cyan-500 flex justify-center items-center text-white cursor-pointer`}
        onClick={() => setActiveTab(true)}
      >
        Login
      </h3>
      <h3
        className={`${
          !activeTab ? 'bg-cyan-500' : 'bg-slate-400'
        } w-1/2 py-2 px-4 rounded-md hover:bg-cyan-500 flex justify-center items-center text-white cursor-pointer`}
        onClick={() => setActiveTab(false)}
      >
        Register
      </h3>
    </div>
  );
};

export default Tab;
