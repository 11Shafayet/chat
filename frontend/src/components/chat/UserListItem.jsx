const UserListItem = ({ user, accessChat }) => {
  const { email, name, pic, _id } = user;
  return (
    <div
      className="w-full flex gap-x-2 items-center bg-gray-100 py-2 px-4 rounded-md hover:bg-teal-400 hover:text-white duration-500 cursor-pointer"
      onClick={() => accessChat(user)}
    >
      <img src={pic} alt="" className="w-11 h-11 rounded-full" />
      <div>
        <h6 className="text-base font-bold">{name}</h6>
        <p className="text-[12px]">
          <span className="font-bold mr-2">Email:</span>
          {email}
        </p>
      </div>
    </div>
  );
};

export default UserListItem;
