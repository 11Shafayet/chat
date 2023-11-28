import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (password === conPassword) {
      console.log(name, email, password);
    } else {
      console.log('no match');
    }
  };

  return (
    <form
      className="w-full flex flex-col gap-y-4"
      onSubmit={handleRegisterSubmit}
    >
      <h3 className="accent-color text-3xl text-center font-bold capitalize my-4">
        Register with your details
      </h3>
      {/* name */}
      <input
        type="text"
        placeholder="Your Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full min-h-[55px] shadow-light py-2 px-3 leading-6 focus:outline-cyan-500"
      />
      {/* email */}
      <input
        type="email"
        placeholder="Your Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full min-h-[55px] shadow-light py-2 px-3 leading-6 focus:outline-cyan-500"
      />
      {/* password */}
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full min-h-[55px] shadow-light py-2 px-3 leading-6 focus:outline-cyan-500"
        />
        <div
          className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer hover:text-cyan-500"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
        </div>
      </div>
      {/* confirm password */}
      <div className="relative">
        <input
          type={showConPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          required
          value={conPassword}
          onChange={(e) => setConPassword(e.target.value)}
          className="w-full min-h-[55px] shadow-light py-2 px-3 leading-6 focus:outline-cyan-500"
        />
        <div
          className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer hover:text-cyan-500"
          onClick={() => setShowConPassword((prev) => !prev)}
        >
          {showConPassword ? (
            <FaRegEye size={20} />
          ) : (
            <FaRegEyeSlash size={20} />
          )}
        </div>
      </div>
      <button
        type="submit"
        className="bg-cyan-500 hover:bg-cyan-600 text-white py-4 px-6 w-full rounded-md uppercase duration-300 leading-none font-bold text-lg"
      >
        Register Now
      </button>
    </form>
  );
};

export default Register;
