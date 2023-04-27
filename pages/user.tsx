import React from "react";
import Navbar from "../components/navbar";

const user = () => {
  return (
    <div>
      <Navbar heading={true} />
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold text-gray-700'>User</h1>
      </div>
    </div>
  );
};

export default user;
