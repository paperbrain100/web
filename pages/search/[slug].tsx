import React, { useEffect, useState } from 'react';
import { client } from '../../utils/client';
import axios from 'axios';
import { motion } from 'framer-motion'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../layout';
import { useUser } from '@auth0/nextjs-auth0';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { BiArrowBack } from 'react-icons/bi';
import { AiFillRead, AiFillFilePdf } from 'react-icons/ai';
import { toast, Toaster } from 'react-hot-toast';
import { RoughNotation } from "react-rough-notation";

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
        console.log(e.paper_authors);
        modalContent.paper_authors = e.paper_authors;
        setModalContent(e);
    }

    const handleClick = (e: any) => {
        router.push(`/pdf/${e.paper_title.replace(/ /g, '-')}`);
    }

    useEffect(() => {
        setLoading(true);

        if (!slug) return;

        if (!user) {
            toast.error('You are not logged in!');
            setLoading(false);
            router.push('/');
            return;
        }

        client.post('/', { query: slug })
            .then(res => {
                setResponse(res.data.papers);
                console.log(res.data.papers);
                toast.success(`Results for ${slug} found!`);
                setLoading(false);
            })
            .catch(err => {
                toast.error(`No results found for ${slug}!`);
                setLoading(false);
                console.error(err);
            })
    }, [slug, user, router]);

    return (
        <Layout className='overflow-hidden'>
            <div className='flex bg h-screen'>
                <Toaster />
                {
                    response &&
                    <Sidebar papers={true} response={response} />
                }
                <div className='w-full h-[95vh] flex flex-col overflow-y-scroll items-center'>

                    {
                        modal ?
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className='flex h-[90vh] flex-col  overflow-y-scroll border-green-200 rounded-md items-center m-4 bg-white'>
                                <div className='flex rounded-md h-full flex-col items-center p-8 '>
                                    {/* <RoughNotation animationDelay={1000} animationDuration={2000} type="highlight" color='#f0fdf4' show={modal}> */}
                                    <h1 className='font-bold text-3xl p-2 m-2'>{modalContent?.paper_title}</h1>
                                    {/* </RoughNotation> */}
                                    <div className='flex p-2 gap-x-4 '>
                                        <div className='flex flex-col p-4 pt-0 w-4/5'>
                                            <p className='font-bold underline mt-2'>Abstract</p>
                                            <p className='text-base mt-2'>{modalContent?.paper_summary}</p>
                                        </div>
                                        <div className='flex flex-col w-1/4'>
                                            <p className='font-bold underline mt-2'>Authors</p>
                                            <ol>
                                                {
                                                    modalContent?.paper_authors.map((author, index) => {
                                                        return (
                                                            <li key={index} className='text-base mt-2'>{index + 1}. {author}</li>
                                                        )
                                                    })
                                                }

                                            </ol>
                                        </div>
                                    </div>
                                    <div className='w-1/2 flex justify-center items-center mt-4'>
                                        <button onClick={() => handleClick(modalContent)} className='items-center flex gap-x-2 p-2 text-white text-sm text-center rounded-lg hover:bg-green-700 cursor-pointer bg-green-600 mt-4 m-2 px-4 hover:scale-105 transition-all w-32'><AiFillFilePdf />View PDF</button>
                                        {/* <button onClick={() => handleStarred(modalContent)} className='items-center flex gap-x-2 p-2 text-green-700 border-green-700 border text-sm text-center rounded-lg hover:bg-gray-50 cursor-pointer mt-4 m-2 px-4 hover:scale-105 transition-all w-32'><AiOutlineStar />Star</button> */}
                                    </div>
                                </div>
                            </motion.div>
                            :
                            !loading &&
                            <div className='flex bg-white w-[90%] h-full border-2 border-green-200 flex-col items-center m-4 justify-center'>
                                <div className='flex flex-col items-center justify-center p-8'>
                                    <RoughNotation animationDelay={1000} animationDuration={2000} type="highlight" color='#f0fdf4' show={true}>
                                        <h1 className='flex items-center font-bold text-3xl p-2 m-2'>Your Search Results are here <BsArrowReturnLeft size={21} className="ml-4" /></h1>
                                    </RoughNotation>
                                    <p className='w-[90%] text-base mt-2'>Click on Continue Reading to open it here</p>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default SearchResults