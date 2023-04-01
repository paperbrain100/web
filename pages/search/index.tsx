import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/logo.png';
import { AiOutlineArrowDown, AiOutlineSearch, AiOutlineLogout, AiOutlineUpload } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { RoughNotation } from "react-rough-notation";

import Layout from '../layout';

const Search = () => {
  const [query, setQuery] = useState('');
  const { user } = useUser();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/search/${query}`);
  }

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
  }, [user, router]);


  return (
    <Layout>
      <div className='bg h-screen w-screen'>
        {
          user &&
          <motion.div initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between px-6 h-[10vh]">

            <div className='mt-12 p-4'>
              <RoughNotation animationDelay={1000} animationDuration={2000} type="highlight" color='#bfecb6' show={true}>
                <h1 className='text-3xl p-2 pb-0 text-gray-900 font-bold'>Looking for Research Papers?</h1>
                <h1 className='text-xl p-2 pt-0 text-gray-500 font-bold'>We have got you covered.</h1>
              </RoughNotation>
            </div>

            <div className="text-center flex items-center space-y-4 sm:text-left">
              <Image src={Logo} alt="user-profile-picture" className="rounded-full mt-4 mx-2" width={32} height={32} />
              <div className="space-y-0.5 mb-2">
                <p className=" text-black font-semibold">
                  {user.name}
                </p>
              </div>
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-1  m-2 text-center transition-all text-sm text-green-600 font-semibold rounded-full border border-green-200 hover:text-white hover:bg-green-400 hover:border-transparent focus:outline-none focus-2 focus-green-600 focus-offset-2">
                {isOpen ? <IoIosArrowUp size={21} /> : <IoIosArrowDown size={21} />}
              </motion.button>

              {
                isOpen &&
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}

                  className='absolute top-16 border-2 border-green-100 right-8 w-44 bg-white z-12 flex flex-col m-2 '>
                  <Link scroll={false} href='/api/auth/logout' className="flex items-center p-2 m-1 text-center transition-all text-sm text-green-600 font-semibold rounded-lg  hover:text-white hover:bg-green-400 hover:border-transparent focus:outline-none focus-2 focus-green-600 focus-offset-2">
                    <AiOutlineLogout size={21} className='mr-2' />Logout
                  </Link>

                  <Link scroll={false} href='/upload' className="flex items-center p-2 m-1 text-center transition-all text-sm text-green-600 font-semibold rounded-lg hover:text-white hover:bg-green-400 hover:border-transparent focus:outline-none focus-2 focus-green-600 focus-offset-2">
                    <AiOutlineUpload size={21} className='mr-2' />Upload Papers
                  </Link>
                </motion.div>

              }

            </div>
          </motion.div>
        }

        <div className='flex items-center justify-center w-full'>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col items-center p-12'>


            <form onSubmit={handleSubmit} className="flex rounded-full border-2 border-green-300 p-2 mt-6 items-center justify-center">
              <input type="text" className="text-green-600 placeholder:text-gray-500 focus:outline-none px-4 bg-transparent w-[40vw]" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="eg: GPT-3 Stable Diffusion etc..." />
              <button className="flex items-center hover:scale-105 p-2 transition-all rounded-full  hover:bg-green-900 hover:text-slate-50" type='submit'><AiOutlineSearch size={21} /></button>
            </form>

          </motion.div>
        </div>
        {/* <div className='h-[50vh] flex justify-evenly'>
          <div className='p-2 border w-1/2 rounded-md m-4'>
            <h1 className='text-2xl'>Upload your own papers on PaperBrain</h1>
          </div>

          <div className='p-2 border w-1/2 rounded-md m-4'>
            <h1 className='text-2xl'>Upload your own papers on PaperBrain</h1>
          </div>
        </div> */}
      </div>
    </Layout>
  )
}

export default Search