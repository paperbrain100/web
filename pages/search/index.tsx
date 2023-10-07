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
    if (user && !user) {
      router.push('/');
      return;
    }

    if (user) {
      fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          toast.success(`${data.message}`);
        })
        .catch(err => {
          console.log(err);
        });
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
            heading="Start by searching above!"
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
                  Welcome to PaperBrain{' '}
                  <BsArrowReturnLeft size={21} className="ml-4" />
                </h1>
              </RoughNotation>
              <p className="mt-2 w-[90%] text-base">
                You can search for any paper you want to read and PaperBrain will help you to read it in a better way.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Search;
