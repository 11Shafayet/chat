const ScrollableChat = ({ messages }) => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const userId = user._id;

  return (
    <div className="flex flex-col justify-end h-full">
      {messages?.map((m) => {
        
        return (
          <div key={m._id}>
            {m.sender._id === userId ? (
              <div className="flex w-full justify-start my-1">
                <span className="bg-orange-500 text-white py-2 px-5 rounded-md max-w-[75%]">
                  {m.content}
                </span>
              </div>
            ) : (
              <div className="flex w-full justify-end my-1">
                <span className="bg-cyan-500 text-white py-2 px-5 rounded-md max-w-[75%]">
                  {m.content}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ScrollableChat;
