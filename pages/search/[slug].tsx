import React, { useEffect, useState } from 'react';
import { client } from '../../utils/client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '../layout';
import { useUser } from '@auth0/nextjs-auth0';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { AiFillFilePdf } from 'react-icons/ai';
import { toast, Toaster } from 'react-hot-toast';
import { RoughNotation } from 'react-rough-notation';

import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';

const SearchResults = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { slug } = router.query;
  const { user } = useUser();

  const [pdfs, setPdfs] = useState('');
  const [modal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    paper_title: '',
    paper_summary: '',
    paper_url: '',
    paper_authors: [],
  });
  const [response, setResponse] = useState([]);

  const openModal = (e: any) => {
    const url = e.paper_url;
    setPdfs(url);
    setOpenModal(true);

    // convert e.paper_authors from string to array
    e.paper_authors = e.paper_authors.split(',');

    modalContent.paper_authors = e.paper_authors;
    setModalContent(e);
  };

  const handleClick = (e: any) => {
    router.push(`/pdf/${e.paper_title.replace(/ /g, '-')}`);
  };

  useEffect(() => {
    setLoading(true);

    client
      .post('/', { query: slug })
      .then(res => {
        setResponse(res.data.papers);
        toast.success(`Results for ${slug} found!`);
        setLoading(false);
      })
      .catch(err => {
        toast.error(`No results found for ${slug}!`);
        setLoading(false);
        console.error(err);
      });
  }, [slug, user, router]);

  return (
    <Layout className="overflow-hidden">
      <Toaster />

      <motion.div className="h-screen">
        {user && <Navbar heading={true} query={slug} />}
        <div className="flex">
          {response ? (
            <Sidebar
              papers={true}
              heading={`Results for ${slug}`}
              response={response}
              openModal={openModal}
            />
          ) : (<p>Loading...</p>)}

          {modal ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="m-4 flex h-[85vh] w-[90%] flex-col items-center rounded-lg border-2 border-dashed border-gray-300 bg-white"
            >
              <div className="m-6 h-[90vh]">
                <h1 className="px-4 text-center text-2xl font-bold">
                  {modalContent?.paper_title}
                </h1>
                <div className="h-[65vh]">
                  <div className="mx-4 mt-6 inline-flex">
                    <p className="font-bold underline">Authors: </p>
                    <p className="mx-4 text-base">
                      {modalContent?.paper_authors.join(', \u00A0\u00A0')}
                    </p>
                  </div>
                  <div className="m-4 flex flex-col">
                    <h1 className="m-2 text-center font-bold underline">
                      Abstract
                    </h1>
                    <div className="h-[51vh] overflow-y-auto pr-2">
                      <p className="text-lg">{modalContent?.paper_summary}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="absolute bottom-12 flex items-center justify-center gap-x-4">
                    <button
                      onClick={() => handleClick(modalContent)}
                      className="flex w-32 cursor-pointer items-center gap-x-2 rounded-lg bg-gray-800 p-2 px-4 text-center text-sm text-white transition-all hover:scale-105 hover:bg-gray-600"
                    >
                      <AiFillFilePdf />
                      View PDF
                    </button>
                    {/* <button className="flex w-32 cursor-pointer items-center gap-x-2 rounded-lg bg-gray-800 p-2 px-4 text-center text-sm text-white transition-all hover:scale-105 hover:bg-gray-600">
                      <AiOutlineStar />
                      Star
                    </button> */}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            !loading && (
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
                      Your Search Results are here{' '}
                      <BsArrowReturnLeft size={21} className="ml-4" />
                    </h1>
                  </RoughNotation>
                  <p className="mt-2 w-[90%] text-base">
                    Click on Continue Reading to open it here
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </motion.div>
    </Layout>
  );
};

export default SearchResults;
