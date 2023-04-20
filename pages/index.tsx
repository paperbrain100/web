import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { RoughNotation } from 'react-rough-notation';
import Link from 'next/link';
import Layout from './layout';
import toast, { Toaster } from 'react-hot-toast';
import { AiOutlineTwitter, AiOutlineGithub } from 'react-icons/ai';
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
  }, [user, router])

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
              <li className='cursor-pointer hover:scale-105 transition-all'><AiOutlineTwitter size={22} /></li>
              <li className='cursor-pointer hover:scale-105 transition-all'><AiOutlineGithub size={22} /></li>
            </ul>
          </div>
          <div className='flex flex-col h-[80vh] items-center justify-center'>
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
              Exploring research papers has never been easier!
            </p>
            {
              <button className='p-2 text-white text-md text-center rounded-lg hover:bg-green-700 cursor-pointer bg-green-600 my-6 px-4 hover:scale-105 transition-all'>
                <Link href={active ? '/search' : '/api/auth/login'}>Lets Get Started</Link>
              </button>
            }
          </div>
          <div className='bg-inverse2 p-12 pt-0 flex items-center justify-center'>
            <video
              className='w-6/7 rounded-xl shadow-2xl'
              autoPlay
              muted
              loop
              src='https://user-images.githubusercontent.com/83456083/233063742-ca57e432-a4db-4d65-b7eb-20bd78e3ed72.mp4'
            />
          </div>
        </div>
      </Layout>
    </>
  )
}
