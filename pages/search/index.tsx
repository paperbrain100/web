import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';

import Layout from '../layout';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';


const Search = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
  }, [user, router]);

  return (
    <Layout>
      <div className='bg h-screen'>
        {
          user &&
          <Navbar heading={true} />
        }
        <div className='flex'>
          <Sidebar papers={false} response={['gg','ggg']} />
        </div>
      </div>
    </Layout>
  )
}

export default Search