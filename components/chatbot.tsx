import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@auth0/nextjs-auth0';
import { BsArrowReturnRight } from 'react-icons/bs';
import { client } from '../utils/client';
import { Loader2 } from 'lucide-react';

interface Chat {
  message: string;
  author: string;
}

const Chatbot = (props: { name: string; f_path: string; pdfURL: string }) => {
  const [input, setInput] = useState('');
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  let url = props.name == 'explain' ? '/chat' : '/explain-new';

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setChats([...chats, { message: input, author: 'user' }]);
    setLoading(true);

    console.log(url);

    client
      .post(url, {
        message: input,
        f_path: props.f_path,
        // paper_id: props.paper_id,
      })
      .then(res => {
        const Answer = res.data.answer;
        setChats([
          ...chats,
          { message: input, author: 'user' },
          { message: Answer, author: 'bot' },
        ]);
        setInput('');
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setChats([
          ...chats,
          { message: input, author: 'user' },
          {
            message:
              "Sorry, We've ran out of Open AI credits right now! We know its not ideal.",
            author: 'bot',
          },
        ]);
        setInput('');
        setLoading(false);
      });
  };

  return (
    <div className="mx-2">
      <div
        ref={chatContainerRef}
        className="mx-2 mt-2 h-[70vh] overflow-y-auto shadow"
      >
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`mx-2.5 my-2 rounded-lg py-0.5 ${
              chat.author === 'user' ? 'text-right' : 'w-[90%] text-left'
            }`}
          >
            <span
              className={`inline-block rounded-lg px-2 py-0.5 text-base font-medium ${
                chat.author === 'user'
                  ? 'rounded-br-none bg-[#FFEFD9] text-[#FF9500]'
                  : 'rounded-bl-none bg-gray-100 text-black'
              }`}
            >
              {chat.message}
            </span>
          </div>
        ))}

        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="ml-2 mt-2 flex h-4 w-4 animate-spin items-start rounded-full ring-gray-400"
          >
            <div className="h-2 w-2 rounded-full bg-gray-400"></div>
          </motion.div>
        )}
      </div>
      <div className="z-1 absolute bottom-4 mx-4 w-[42vw] rounded-lg bg-gray-200 py-2 drop-shadow-md">
        <form onSubmit={handleSubmit} className="">
          <div className="flex items-center px-4 py-2">
            <input
              type="text"
              value={input}
              placeholder="Ask about the paper here..."
              onChange={event =>
                setInput(
                  event.target.value.charAt(0).toUpperCase() +
                    event.target.value.slice(1),
                )
              }
              className="w-full border-none bg-inherit text-[#707070] outline-none placeholder:text-[#707070]"
              disabled={!props.f_path}
            />
            {props.pdfURL ? (
              <>
                {props.f_path ? (
                  <button type="submit" className="ml-2">
                    <BsArrowReturnRight />
                  </button>
                ) : (
                  <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                )}
              </>
            ) : (
              <button type="submit" className="ml-2" disabled={!props.f_path}>
                <BsArrowReturnRight />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
