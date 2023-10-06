import React, { useState } from 'react';
import { AiFillRead, AiOutlineUpload } from 'react-icons/ai';

type Type = {
  papers: any;
  response: any;
  heading: string;
  openModal: any;
};

const Sidebar = ({ papers, response, heading, openModal }: Type) => {
  return (
    <div className="h-[96vh] w-[27vw] rounded">
      <div className="flex flex-col items-center justify-center gap-y-2 p-3">
        <h2 className="m-1 text-xl font-bold ">{heading}</h2>
      </div>
      <div className="scrollbarHide m-2 mt-0 flex h-[82vh] w-[25vw] flex-col items-center overflow-x-hidden">
        {response.map((paper: any) => {
          return (
            <div
              key={paper.paper_title}
              className="m-1 flex w-full flex-col items-center justify-center rounded-lg border border-gray-300"
            >
              <div className="flex flex-col items-center justify-center rounded-lg bg-white">
                <div className="flex flex-col flex-wrap items-center justify-center">
                  <h3 className="w-full rounded-lg bg-gray-100 p-2 px-4 text-base font-semibold text-gray-700">
                    {paper.paper_title}
                  </h3>
                  <p className="h-24 overflow-hidden text-clip p-2 px-4 text-sm">
                    {paper.paper_summary.slice(0, 150)}
                    {paper.paper_summary.length > 150 ? '...' : ''}
                  </p>
                </div>
                <button
                  onClick={() => openModal(paper)}
                  className="m-2 mt-4 flex cursor-pointer items-center gap-x-2 rounded-lg bg-gray-800 p-2 px-4 text-center text-sm text-white transition-all hover:scale-105 hover:bg-gray-600"
                >
                  <AiFillRead />
                  Continue Reading
                </button>
              </div>
            </div>
          );
        })}
        {/* {loading && (
          <div className='flex flex-col items-center justify-center'>
            <p className='font-bold text-sm'>Loading...</p>
          </div>
        )} */}
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
