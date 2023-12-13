import { FaTimes } from 'react-icons/fa';
import { ChatState } from '../../Context/ChatProvider';

const ProfileModal = ({ user }) => {
  const { modalOpen, setModalOpen, setOpenProfile } = ChatState();
  const { name, pic, email } = user;

  return (
    <>
      {modalOpen && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 shadow-md rounded-lg p-4 md:p-6 z-[1000] sm:w-[500px]">
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <h4 className="font-bold text-2xl">{name}</h4>
            <FaTimes
              className="hover:text-teal-400 duration-500 cursor-pointer"
              size={22}
              onClick={() => {
                setModalOpen(false);
                setOpenProfile(false);
              }}
            />
          </div>
          <div className="flex flex-col gap-y-3 text-center justify-center items-center">
            <img
              src={pic}
              alt={name}
              className="w-[200px] h-[200px] rounded-full object-cover"
            />
            <h4 className="font-bold text-xl">{email}</h4>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileModal;
