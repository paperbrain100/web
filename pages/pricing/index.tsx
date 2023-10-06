
import React from 'react';
import Navbar from '../../components/navbar';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const Pricing = () => {
    const router = useRouter();

    const handleClick = (type: string) => {
        if (type === "free") {
            toast.success("You're already on the free plan!");
            return;
        }

        router.push(`/pricing/${type}`);
    }

    return (
        <div>
            <Navbar heading={true} query={"null"} />
            <h1 className="text-4xl font-bold text-center text-zinc-900 dark:text-zinc-100 pt-12"> Pricing</h1>
            <section className="min-h-[60vh] w-full flex flex-col items-center justify-center">
                <div className="container px-4 md:px-6 ">
                    <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
                        <div className="flex flex-col hover:scale-105 transition-all p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-300">
                            <div>
                                <h3 className="text-2xl font-bold text-center">Free</h3>
                                <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                                    <span className="text-4xl font-bold">$0</span>for 10 credits
                                </div>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-center">
                                        <svg
                                            className=" text-white text-xs bg-green-500 rounded-full mr-2 p-1"
                                            fill="none"
                                            height="24"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        View 2 Papers per Day
                                    </li>
                                    <li className="flex items-center">
                                        <svg
                                            className=" text-white text-xs bg-green-500 rounded-full mr-2 p-1"
                                            fill="none"
                                            height="24"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        Limited Conversations with Papers
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-6">
                                <Button onClick={() => handleClick("free")} className="w-full">Continue Reading</Button>
                            </div>
                        </div>
                        <div className="relative flex flex-col hover:scale-105 transition-all p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-purple-500">
                            <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                Popular
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-center">Pro</h3>
                                <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                                    <span className="text-4xl font-bold">$20</span>for 50 credits
                                </div>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-center">
                                        <svg
                                            className=" text-white text-2xs bg-green-500 rounded-full mr-2 p-1"
                                            fill="none"
                                            height="24"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        Unlimited Paper Viewing
                                    </li>
                                    <li className="flex items-center">
                                        <svg
                                            className=" text-white text-xs bg-green-500 rounded-full mr-2 p-1"
                                            fill="none"
                                            height="24"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        Limited Conversations with Papers
                                    </li>
                                    <li className="flex items-center">
                                        <svg
                                            className=" text-white text-xs bg-green-500 rounded-full mr-2 p-1"
                                            fill="none"
                                            height="24"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        Unlimited Uploads
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-6">
                                <Button onClick={() => handleClick("pro")} className="w-full bg-gradient-to-r from-pink-500 to-purple-500">Get Started</Button>
                            </div>
                        </div>
                        <div className="flex flex-col p-6 bg-white hover:scale-105 transition-all shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-300">
                            <div>
                                <h3 className="text-2xl font-bold text-center">Braineer</h3>
                                <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                                    <span className="text-4xl font-bold">$39</span>for 100 credits
                                </div>
                                <ul className="mt-4 space-y-2">
                                    <li className="flex items-center">
                                        <svg
                                            className=" text-white text-xs bg-green-500 rounded-full mr-2 p-1"
                                            fill="none"
                                            height="24"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        Faster Paper Viewing
                                    </li>
                                    <li className="flex items-center">
                                        <svg
                                            className=" text-white text-xs bg-green-500 rounded-full mr-2 p-1"
                                            fill="none"
                                            height="24"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        GPT 4 Access
                                    </li>
                                    <li className="flex items-center">
                                        <svg
                                            className=" text-white text-xs bg-green-500 rounded-full mr-2 p-1"
                                            fill="none"
                                            height="24"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        Unlimited Conversations with Papers
                                    </li>
                                    <li className="flex items-center">
                                        <svg
                                            className=" text-white text-xs bg-green-500 rounded-full mr-2 p-1"
                                            fill="none"
                                            height="24"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        Dedicated Support
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-6">
                                <Button onClick={() => handleClick("braineer")} className="w-full">Get Started</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Pricing;
