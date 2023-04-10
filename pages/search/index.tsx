import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { storage } from '../../config/firebase';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/logo.png';
import { AiOutlineArrowDown, AiOutlineSearch, AiOutlineLogout, AiOutlineUpload } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { RoughNotation } from "react-rough-notation";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Layout from '../layout';

const Search = () => {
  const [query, setQuery] = useState('');
  const { user } = useUser();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<any>(null);
  const [clicked, setClicked] = useState(false);

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

  const handleChange = (e: any) => {
    if (e.target.files[0].type == 'application/pdf') {
      setFile(e.target.files[0]);
    } else {
      alert('Please upload a pdf file');
      setFile(e.target.files[0]);
    }

    // check if file is more than 10mb
    if (e.target.files[0].size > 10000000) {
      alert('File size is too big');
      setFile(e.target.files[0]);
    }
  }

  const handleUploadSubmit = (e: any) => {
    e.preventDefault();
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a pdf file');
      return;
    }
    // Create a root reference
    const storageRef = ref(storage, 'pdfs/' + file.name + Date.now());

    // Upload file and metadata to the object 'images/mountains.jpg'
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed', (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      setProgress(progress);
    }
      , (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }
      , () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          toast.success('File uploaded successfully!');

          router.push(`/custom/pdf/${downloadURL.replace('https://firebasestorage.googleapis.com/v0/b/legal-ai-8ebe8.appspot.com/o/pdfs%2', '')}`);
        });
      }
    );
  }


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


            <form onSubmit={handleSubmit} className="flex rounded-full border-2 border-green-300 p-1 mt-6 items-center justify-center">
              <input type="text" onFocus={() => setClicked(true)} onBlur={() => setClicked(false)} className="text-green-600 placeholder:text-gray-500 focus:outline-none px-4 bg-transparent w-[40vw]" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="eg: GPT-3 Stable Diffusion etc..." />
              <button className="flex items-center hover:scale-105 p-2 transition-all rounded-full  hover:bg-green-900 hover:text-slate-50" type='submit'><AiOutlineSearch size={21} /></button>
            </form>

            <div>
              {
                clicked && (
                  <div className='absolute left-96 w-2/3 bg-white p-2 itemxs-center ring justify-center mt-4'>
                    <h1 className='text-xl'>Search Results</h1>
                    <div className='flex flex-col items-center justify-center mt-4'>
                      <ul>
                        <li>
                          <Link href={`/search/${query}`}><p className='text-green-600 hover:text-green-900'>dsdsdsd</p></Link>
                        </li>
                        <li>
                          <Link href={`/search/${query}`}><p className='text-green-600 hover:text-green-900'>dsdsdsd</p></Link>
                        </li>
                        <li>
                          <Link href={`/search/${query}`}><p className='text-green-600 hover:text-green-900'>dsdsdsd</p></Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                )
              }
            </div>

          </motion.div>
        </div>
        <div className='min-h-[65vh] flex justify-around'>
          <div className='p-2 flex flex-col items-center border w-1/2 rounded-md m-4'>
            <h1 className='text-2xl'>Featured Papers</h1>
          </div>

          <div className='p-2 flex flex-col items-center border w-1/2 rounded-md m-4'>
            <h1 className='text-2xl'>Upload your own papers on PaperBrain</h1>
            <form className='flex flex-col items-center gap-y-4 mt-4' onSubmit={handleUploadSubmit}>
              <input type='file' onChange={handleChange} className='bg-green-50 hover:bg-green-100 text-gray-800 font-bold py-2 px-4 rounded' />

              {
                file && (
                  <button
                    type='submit'
                    className='flex items-center gap-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'>
                    <span>Upload</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>)
              }
              {
                progress > 0 && (
                  <CircularProgressbar className='absolute bottom-32 w-24 h-24'
                    styles={buildStyles({
                      textSize: '10px',
                      pathColor: '#8beb86',
                    })}

                    value={Math.floor(progress)} text={`${Math.floor(progress)}%`} />
                )
              }
            </form>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default Search