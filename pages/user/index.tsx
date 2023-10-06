'use client';

import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Layout from '../layout';
import Navbar from '../../components/navbar';


const User = () => {
    const { user } = useUser();
    return (
        <>
            <Head>
                <title>PaperBrain</title>
                <meta
                    name="description"
                    content="Exploring your study papers has never been easier!"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout className="overflow-hidden">
                <Navbar heading={true} query={"null"} />
                <div className="flex min-h-full flex-col items-center justify-center p-8">
                    <div className="h-full w-2/3 rounded-lg bg-gray-300 p-4">
                        <div className="flex items-center justify-between ">
                            <h1 className="text-4xl font-bold text-gray-700">{user?.name}</h1>
                            {/* <img className="rounded-full w-12 h-12" src={user?.picture} alt={user?.name} /> */}
                        </div>
                        <p className="text-md font-bold text-gray-700">@{user?.nickname}</p>
                        <p className="text-md font-bold text-gray-700">{user?.email}</p>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default User;
