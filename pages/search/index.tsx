import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';

import Layout from '../layout';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import { RoughNotation } from 'react-rough-notation';
import { BsArrowReturnLeft } from 'react-icons/bs';

const Search = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }

    console.log(Cookies.get('apiKey'));
  }, [user, router]);

  return (
    <Layout className="overflow-hidden">
      <Toaster />
      <motion.div className="h-screen">
        {user && <Navbar heading={true} query={"null"} />}
        <div className="flex">
          <Sidebar
            openModal={false}
            papers={false}
            heading="Your Starred Papers"
            response={[]}
          />

          <div className="m-4 flex h-[85vh] w-[90%] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white">
            <div className="flex flex-col items-center justify-center p-8">
              <RoughNotation
                animationDelay={1000}
                animationDuration={2000}
                type="highlight"
                // color='#f0fdf4'
                color="rgb(229 231 235)"
                show={true}
              >
                <h1 className="m-2 flex items-center p-2 text-3xl font-bold">
                  Your Starred Papers are here{' '}
                  <BsArrowReturnLeft size={21} className="ml-4" />
                </h1>
              </RoughNotation>
              <p className="mt-2 w-[90%] text-base">
                Click on Continue Reading to open it here
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Search;
