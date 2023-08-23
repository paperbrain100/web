import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';

import Layout from '../layout';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import { RoughNotation } from 'react-rough-notation';
import { storage } from '../../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { BsArrow90DegDown, BsArrowReturnLeft } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const Search = () => {
  const { user } = useUser();
  const router = useRouter();
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e: any) => {
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
    uploadTask.on(
      'state_changed',
      snapshot => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgress(progress);
      },
      error => {
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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          console.log('File available at', downloadURL);
          toast.success('File uploaded successfully!');
          console.log(
            downloadURL.replace(
              'https://firebasestorage.googleapis.com/v0/b/legal-ai-8ebe8.appspot.com/o/pdfs%2',
              '',
            ),
          );

          router.push(
            `/custom/pdf/${downloadURL.replace(
              'https://firebasestorage.googleapis.com/v0/b/legal-ai-8ebe8.appspot.com/o/pdfs%2',
              '',
            )}`,
          );
        });
      },
    );
  };

  const handleChange = (e: any) => {
    if (e.target.files[0].type == 'application/pdf') {
      setFile(e.target.files[0]);
    } else {
      // alert('Please upload a pdf file');
      setFile(e.target.files[0]);
    }
  };

  return (
    <Layout>
      <Toaster />

      <motion.div className="h-screen bg-white">
        {user && <Navbar heading={true} />}
        <div className="flex">
          <Sidebar
            openModal={false}
            papers={false}
            heading="Your Uploaded Papers"
            response={[
              {
                paper_authors: 'Elad Hazan',
                paper_summary:
                  'Lecture notes on optimization for machine learning, derived from a course at\nPrinceton University and tutorials given in MLSS, Buenos Aires, as well as\nSimons Foundation, Berkeley.',
                paper_title: 'Lecture Notes: Optimization for Machine Learning',
                paper_url: 'http://arxiv.org/pdf/1909.03550v1',
              },
              {
                paper_authors: 'Elad Hazan',
                paper_summary:
                  'Lecture notes on optimization for machine learning, derived from a course at\nPrinceton University and tutorials given in MLSS, Buenos Aires, as well as\nSimons Foundation, Berkeley.',
                paper_title: 'Lecture Notes: Optimization for Machine Learning',
                paper_url: 'http://arxiv.org/pdf/1909.03550v1',
              },
              {
                paper_authors: 'Elad Hazan',
                paper_summary:
                  'Lecture notes on optimization for machine learning, derived from a course at\nPrinceton University and tutorials given in MLSS, Buenos Aires, as well as\nSimons Foundation, Berkeley.',
                paper_title: 'Lecture Notes: Optimization for Machine Learning',
                paper_url: 'http://arxiv.org/pdf/1909.03550v1',
              },
            ]}
          />

          <div className="m-4 flex h-[85vh] w-[90%] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white">
            <div className="flex flex-col items-center justify-center p-8">
              <RoughNotation
                animationDelay={1000}
                animationDuration={2000}
                type="highlight"
                color="rgb(229 231 235)"
                show={true}
              >
                <h1 className="m-2 flex items-center p-2 text-3xl font-bold">
                  Your Uploaded Papers are here{' '}
                  <BsArrowReturnLeft size={21} className="ml-4" />
                </h1>
              </RoughNotation>
              <p className="mt-2 w-[90%] text-base">
                Click on Continue Reading to open it here
              </p>
            </div>
            <p>OR</p>

            <div className="flex flex-col items-center justify-center p-8">
              <RoughNotation
                animationDelay={1000}
                animationDuration={2000}
                type="highlight"
                color="rgb(229 231 235)"
                show={true}
              >
                <h1 className="m-2 flex items-center p-2 text-3xl font-bold">
                  Upload Papers below
                </h1>
              </RoughNotation>

              <form
                className="flex flex-col items-center gap-y-4"
                onSubmit={handleSubmit}
              >
                <input
                  type="file"
                  onChange={handleChange}
                  className="rounded bg-gray-50 py-2 px-4 font-bold text-gray-800 hover:bg-gray-300"
                />

                {file && (
                  <button
                    type="submit"
                    className="flex items-center gap-x-2 rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-600"
                  >
                    <span>Upload</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                )}
                {progress > 0 && (
                  <CircularProgressbar
                    className="absolute bottom-32 h-24 w-24"
                    styles={buildStyles({
                      textSize: '10px',
                      pathColor: '#8beb86',
                    })}
                    value={Math.floor(progress)}
                    text={`${Math.floor(progress)}%`}
                  />
                )}
              </form>

              {loading && (
                <div className="flex flex-col items-center gap-y-4">
                  <svg
                    className="h-5 w-5 animate-spin text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1zm0 0a8 8 0 018 8H9a7 7 0 00-7-7v1zm0 0h1a8 8 0 018 8v-1a7 7 0 00-7-7zm0 0v1a8 8 0 01-8-8h1a7 7 0 007 7z"
                    ></path>
                  </svg>
                  <p className="text-xl">Processing your document...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* <div className='absolute bottom-2 rounded-full bg-green-100 right-2 p-4 shadow-xl hover:scale-105'>
          <AiFillEdit size={40} className='text-green-500' />
        </div> */}
      </motion.div>
    </Layout>
  );
};

export default Search;
