import React, { useState } from "react";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { AiFillRead, AiOutlineUpload } from "react-icons/ai";

type Type = {
  papers: any;
  response: any;
  heading: string;
};

const Sidebar = ({ papers, response, heading }: Type) => {
  const router = useRouter();

  const [modal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pdfs, setPdfs] = useState("");
  const [modalContent, setModalContent] = useState({
    paper_title: "",
    paper_summary: "",
    paper_url: "",
    paper_authors: [],
  });

  const openModal = (e: any) => {
    const url = e.paper_url;
    setPdfs(url);
    setOpenModal(true);
    // convert e.paper_authors from string to array
    e.paper_authors = e.paper_authors.split(",");
    console.log(e.paper_authors);
    modalContent.paper_authors = e.paper_authors;
    setModalContent(e);
  };

  const handleClick = (e: any) => {
    router.push(`/pdf/${e.paper_title.replace(/ /g, "-")}`);
  };

  return (
    <div className='border-2 h-[91vh] w-[27vw] shadow'>
      <div className='p-3 flex flex-col gap-y-2 items-center justify-center'>
        <h2 className='font-bold text-xl capitalize m-1'>{heading}</h2>
      </div>
      <div className='h-[78vh] w-[25vw] m-2 mt-0 overflow-x-hidden scrollbarHide flex flex-col items-center'>
        {response.map((paper: any) => {
          return (
            <div
              key={paper.paper_title}
              className='w-full rounded-lg border-2 border-gray-300 m-1 flex flex-col items-center justify-center'
            >
              <div className='flex bg-white flex-col items-center justify-center rounded-lg'>
                <div className='flex flex-wrap flex-col items-center justify-center'>
                  <h3 className='font-bold text-xl p-2 px-4 text-gray-700 bg-gray-100 rounded-lg'>
                    {paper.paper_title}
                  </h3>
                  <p className='text-sm text-clip overflow-hidden h-24 p-2 px-4'>
                    {paper.paper_summary}
                  </p>
                </div>
                <button
                  onClick={() => openModal(paper)}
                  className='items-center flex gap-x-2 p-2 text-white text-sm text-center rounded-lg hover:bg-gray-800 cursor-pointer bg-gray-600 mt-4 m-2 px-4 hover:scale-105 transition-all'
                >
                  <AiFillRead />
                  Continue Reading
                </button>
              </div>
            </div>
          );
        })}
        {loading && (
          <div className='flex flex-col items-center justify-center'>
            <p className='font-bold text-sm'>Loading...</p>
          </div>
        )}
      </div>
      {/* <div className=' flex p-1 mx-2 border-green-200 rounded-md bg-gray-300 items-center justify-center hover:bg-green-600 text-white hover:text-white'>
        <button
          onClick={() => router.push("/upload")}
          className='p-2 text-base flex gap-x-2 items-center text-center rounded-lg cursor-pointer'
        >
          <AiOutlineUpload size={21} />
          Upload Papers
        </button>
      </div> */}
    </div>
  );
};

export default Sidebar;
