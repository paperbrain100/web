import React from 'react';
import Navbar from '../components/navbar';
import Editor from '../components/ui/editor';

const write = () => {
  return (
    <div>
      <Navbar heading={true} />
      <div className="flex flex-col items-center justify-center">
        <Editor />
      </div>
    </div>
  );
};

export default write;
