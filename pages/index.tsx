import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { RoughNotation } from 'react-rough-notation';
import Link from 'next/link';
import Layout from './layout';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import Logo from '../public/logo.png';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const { user } = useUser()
  const [active, setActive] = useState(false)
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setActive(true);
      toast.success(`Welcome! ${user.name}`);

      router.push('/search');
    }
  }, [user])

  return (
    <>
      <Head>
        <title>PaperBrain</title>
        <meta name='description' content='Exploring your study papers has never been easier!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout className='overflow-hidden'>
        <Toaster />
        <div className='bg h-screen'>
          <div className='flex items-center justify-between px-6 h-[10vh]'>
            <h1 className='opacity-50 text-3xl text-green-900'>PaperBrain</h1>

            <ul className='flex gap-x-4 text-green-900 text-sm'>
              <li className='cursor-pointer p-2 hover:scale-105 transition-all'>Twitter</li>
              <li className='cursor-pointer p-2 hover:scale-105 transition-all'>GitHub</li>
            </ul>
          </div>
          <div className='flex flex-col h-[90vh] items-center justify-center'>
            <div className='m-6 mt-0'>
              <Image
                src={Logo}
                className='rounded-full'
                alt='PaperBrain'
                width={64}
                height={64}
              />
            </div>
            <RoughNotation
              animationDelay={1000}
              animationDuration={2000}
              type='box'
              show={true}
            >
              <h1 className='font-bold text-8xl'>PaperBrain</h1>
            </RoughNotation>
            <p className='mt-8 font-extralight text-xl'>
              Exploring your study papers has never been easier!
            </p>
            {!active &&
              <button className='p-2 text-white text-md text-center rounded-lg hover:bg-green-700 cursor-pointer bg-green-600 my-6 px-4 hover:scale-105 transition-all'>
                <Link href='/api/auth/login'>Lets Get Started</Link>
              </button>
            }
          </div>
        </div>
      </Layout>
    </>
  )
}
