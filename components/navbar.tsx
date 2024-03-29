import React, { useEffect, useState } from 'react';
import { UserProvider, useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import {
  AiOutlineLogout,
  AiOutlineSearch,
  AiOutlineUpload,
  AiOutlineEdit,
  AiOutlineUser,
  AiOutlineHome,
  AiOutlineMoneyCollect,
} from 'react-icons/ai';
import Logo from '../public/logo.png';
import { toast, Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { LucideUser, LucideUserX, UserCog } from 'lucide-react';

const Navbar = ({ heading, query }: { heading: Boolean, query: any }) => {
  const { user } = useUser();
  const router = useRouter();
  const [newQuery, setNewQuery] = useState('');
  const [userProfileMenu, setUserProfileMenu] = useState(false);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    if (query != 'null') {
      setNewQuery(query);
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/search/${newQuery}`);
  };

  const handleUserProfileClick = () => {
    setUserProfileMenu(!userProfileMenu);
  };

  const handleAPIKeySubmit = (e: any) => {
    e.preventDefault();

    if (apiKey) {
      toast.success('API Key saved successfully!');
    }
    console.log(apiKey);

    if (Cookies.get('apiKey')) {
      Cookies.remove('apiKey');
    }

    Cookies.set('apiKey', apiKey, { expires: 7 });
  };
  return (
    <div
      className="z-10 flex w-full items-center justify-around bg-gray-50 p-1 py-2 shadow"
    >
      <Toaster />
      {heading && (
        <div className="mx-8 my-3 inline-flex items-center gap-x-6">
          <Image
            src={Logo}
            className="rounded-2xl"
            alt="PaperBrain"
            width={40}
            height={40}
          />
          <h1 className="text-2xl font-extrabold text-black">PaperBrain</h1>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mx-12 flex items-center justify-center rounded-full border border-gray-400 p-1 px-2"
      >
        <input
          type="text"
          className=" w-[40vw] bg-transparent px-4 font-medium text-gray-800 placeholder:text-gray-500 focus:outline-none"
          value={newQuery}
          onChange={e => setNewQuery(e.target.value)}
          placeholder="eg: GPT-4, Stable Diffusion etc..."
        />
        <button
          className="flex items-center rounded-full p-2 transition-all hover:scale-105 hover:bg-gray-700 hover:text-gray-50"
          type="submit"
        >
          <AiOutlineSearch className='text-gray-400' size={21} />
        </button>
      </form>

      <div className="flex items-center justify-center">
        <LucideUser size={18} />
        <div className="flex items-center p-2 sm:text-left">
          <p className="text-center font-semibold">{user?.name}</p>

          <motion.button
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={handleUserProfileClick}
            className="focus-2 focus-green-600 focus-offset-2 m-2 rounded-full border border-gray-400 p-1 text-center text-sm font-semibold text-gray-600 transition-all hover:border-transparent hover:bg-gray-600 hover:text-gray-50 focus:outline-none"
          >
            {userProfileMenu ? (
              <IoIosArrowUp size={12} />
            ) : (
              <IoIosArrowDown size={12} />
            )}
          </motion.button>
          {userProfileMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="z-[99999] absolute top-12 right-20 m-2 flex w-52 flex-col rounded-md border border-gray-200 bg-white"
            >
              <Link
                className="focus-2 focus-green-600 focus-offset-2 m-1 flex items-center rounded-lg p-2 text-center text-sm font-semibold text-gray-600 transition-all hover:border-transparent hover:bg-gray-600 hover:text-white focus:outline-none"
                href="/"
              >
                <AiOutlineHome className="mr-2" />
                Home
              </Link>
              <Link
                className="focus-2 focus-green-600 focus-offset-2 m-1 flex items-center rounded-lg p-2 text-center text-sm font-semibold text-gray-600 transition-all hover:border-transparent hover:bg-gray-600 hover:text-white focus:outline-none"
                href="/user"
              >
                <AiOutlineUser className="mr-2" />
                Your Profile
              </Link>
              <Link
                className="focus-2 focus-green-600 focus-offset-2 m-1 flex items-center rounded-lg p-2 text-center text-sm font-semibold text-gray-600 transition-all hover:border-transparent hover:bg-gray-600 hover:text-white focus:outline-none"
                href="/upload"
              >
                <AiOutlineUpload className="mr-2" />
                Upload Papers
              </Link>
              <Link
                className="focus-2 focus-green-600 focus-offset-2 m-1 flex items-center rounded-lg p-2 text-center text-sm font-semibold text-gray-600 transition-all hover:border-transparent hover:bg-gray-600 hover:text-white focus:outline-none"
                href="/pricing"
              >
                <AiOutlineMoneyCollect className="mr-2" />
                Pricing
              </Link>
              <Link
                className="focus-2 focus-green-600 focus-offset-2 m-1 flex items-center rounded-lg p-2 text-center text-sm font-semibold text-gray-600 transition-all hover:border-transparent hover:bg-gray-600 hover:text-white focus:outline-none"
                href="/api/auth/logout"
              >
                <AiOutlineLogout className="mr-2" />
                Logout
              </Link>

              <form
                className="m-1 mt-0 flex p-2 "
                onSubmit={handleAPIKeySubmit}
              >
                <input
                  type="text"
                  className="w-[90%] border bg-transparent p-2 text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none"
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  placeholder="Open AI API key here"
                />
                <button className="ml-2 text-sm" type="submit">
                  <AiOutlineEdit />
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div >
  );
};

export default Navbar;
