import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  AiOutlineLogout,
  AiOutlineSearch,
  AiOutlineUpload,
  AiOutlineEdit,
  AiOutlineUser,
} from "react-icons/ai";
import Logo from "../public/logo.png";

const Navbar = ({ heading }: { heading: Boolean }) => {
  const { user } = useUser();
  const router = useRouter();
  const [newQuery, setNewQuery] = useState("");
  const [userProfileMenu, setUserProfileMenu] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/search/${newQuery}`);
  };

  const handleUserProfileClick = () => {
    setUserProfileMenu(!userProfileMenu);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className='bg-gray-50 w-full z-10 flex items-center justify-around shadow'
    >
      {heading && (
        <h1 className='text-2xl font-extrabold text-black'>PaperBrain</h1>
      )}

      <form
        onSubmit={handleSubmit}
        className='flex rounded-full border-2 border-gray-400 px-2 mx-12 items-center justify-center'
      >
        <input
          type='text'
          className=' text-gray-800 font-medium focus:outline-none px-4 placeholder:text-gray-500 w-[40vw]'
          value={newQuery}
          onChange={(e) => setNewQuery(e.target.value)}
          placeholder='eg: GPT-3 Stable Diffusion etc...'
        />
        <button
          className='flex items-center hover:scale-105 p-2 transition-all rounded-full hover:bg-gray-700 hover:text-gray-50'
          type='submit'
        >
          <AiOutlineSearch size={21} />
        </button>
      </form>

      <div className='flex items-center justify-center'>
        <Image
          src={Logo}
          alt='user-profile-picture'
          className='rounded-full'
          width={32}
          height={32}
        />
        <div className='items-center flex p-2 sm:text-left'>
          <p className='text-center font-semibold'>{user?.name}</p>

          <motion.button
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={handleUserProfileClick}
            className='p-1  m-2 text-center transition-all text-sm text-gray-600 font-semibold rounded-full border border-gray-400 hover:text-gray-50 hover:bg-gray-600 hover:border-transparent focus:outline-none focus-2 focus-green-600 focus-offset-2'
          >
            {userProfileMenu ? (
              <IoIosArrowUp size={21} />
            ) : (
              <IoIosArrowDown size={21} />
            )}
          </motion.button>
          {userProfileMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className='absolute top-16 right-8 w-44 border-2 rounded-md border-gray-200 bg-white z-12 flex flex-col m-2'
            >
              <Link
                className='flex items-center p-2 m-1 text-center transition-all text-sm text-gray-600 font-semibold rounded-lg hover:text-white hover:bg-gray-600 hover:border-transparent focus:outline-none focus-2 focus-green-600 focus-offset-2'
                href='/user'
              >
                <AiOutlineUser className='mr-2' />
                User Profile
              </Link>
              <Link
                className='flex items-center p-2 m-1 text-center transition-all text-sm text-gray-600 font-semibold rounded-lg hover:text-white hover:bg-gray-600 hover:border-transparent focus:outline-none focus-2 focus-green-600 focus-offset-2'
                href='/upload'
              >
                <AiOutlineUpload className='mr-2' />
                Upload Papers
              </Link>
              <Link
                className='flex items-center p-2 m-1 text-center transition-all text-sm text-gray-600 font-semibold rounded-lg hover:text-white hover:bg-gray-600 hover:border-transparent focus:outline-none focus-2 focus-green-600 focus-offset-2'
                href='/write'
              >
                <AiOutlineEdit className='mr-2' />
                Write Papers
              </Link>
              <Link
                className='flex items-center p-2 m-1 text-center transition-all text-sm text-gray-600 font-semibold rounded-lg hover:text-white hover:bg-gray-600 hover:border-transparent focus:outline-none focus-2 focus-green-600 focus-offset-2'
                href='/api/auth/logout'
              >
                <AiOutlineLogout className='mr-2' />
                Logout
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
