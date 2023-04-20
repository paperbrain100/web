import React, { useState } from 'react';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { AiFillRead, AiOutlineUpload } from 'react-icons/ai';

type Type = {
    papers: any;
    response: any;
}

const Sidebar = ({ papers, response }: Type) => {
    const router = useRouter();

    const [modal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pdfs, setPdfs] = useState('');
    const [modalContent, setModalContent] = useState({
        paper_title: '',
        paper_summary: '',
        paper_url: '',
        paper_authors: [],
    });

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


    return (
        <div className='border-2 h-[89vh] border-green-100'>
            <div className='p-3 flex flex-col gap-y-2 items-center justify-center'>
                <h2 className='font-bold text-xl capitalize m-1'>Your Starred Papers</h2>
            </div>
            <div className='h-[74vh] w-[28vw] m-2 mt-0 overflow-x-hidden scrollbarHide flex flex-col items-center'>
                {
                    response.map((paper: any) => {
                        return (
                            <div key={paper.paper_title} className='w-full rounded-md border-2 border-green-200 m-2 flex flex-col items-center justify-center'>
                                <div className='flex bg-white flex-col items-center justify-center'>
                                    <div className='flex flex-wrap flex-col items-center justify-center'>
                                        <h3 className='font-bold text-xl p-4 bg-[#f0fdf4]'>{paper.paper_title}</h3>
                                        <p className='text-sm text-clip overflow-hidden h-32 p-4'>{paper.paper_summary}</p>
                                    </div>
                                    <button onClick={() => openModal(paper)} className='items-center flex gap-x-2 p-2 text-white text-sm text-center rounded-lg hover:bg-green-700 cursor-pointer bg-green-600 mt-4 m-2 px-4 hover:scale-105 transition-all'><AiFillRead />Continue Reading
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    loading &&
                    <div className='flex flex-col items-center justify-center'>
                        <p className='font-bold text-sm'>Loading...</p>
                    </div>
                }
            </div>
            <div className='flex p-1 mx-2 border-green-200 rounded-md bg-white items-center justify-center hover:bg-green-600 text-green-600 hover:text-white'>
                <button onClick={() => router.push('/upload')} className='p-2 text-base flex gap-x-2 items-center text-center rounded-lg cursor-pointer'>
                    <AiOutlineUpload size={21} />Upload Papers
                </button>
            </div>
        </div>
    )
}

export default Sidebar