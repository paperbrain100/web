import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Layout from '../../layout';
import { client } from '../../../utils/client';
import { Document, Page, pdfjs } from 'react-pdf';
import { RoughNotation } from 'react-rough-notation';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Chatbot from '../../../components/chatbot';
import Logo from '../../../public/logo.png';
import Image from 'next/image';
import Navbar from '@/components/navbar';

export default function Pdf() {
  const router = useRouter();
  const { slug } = router.query;
  const [fpath, setFpath] = useState<string>('');
  const pdfURL =
    `https://firebasestorage.googleapis.com/v0/b/legal-ai-8ebe8.appspot.com/o/pdfs%2` +
    slug +
    '?alt=media';

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

    client
      .post('/getpdf', { pdfURL })
      .then(res => {
        setFpath(res.data.f_path);
      })
      .catch(err => {
        console.error(err);
      });
  }, [slug, pdfURL]);

  return (
    <Layout>
      <Navbar heading={true} />

      <motion.div className="flex h-[91vh]">
        <motion.div className="flex w-[50vw] flex-col">
          <h1 className="mx-4 border-b border-gray-300 p-2 text-xl font-semibold">
            Uploaded Paper: {slug}
          </h1>
          <motion.div className="min-h-[50vh] overflow-y-auto scroll-smooth">
            <Chatbot name="explain" f_path={fpath} pdfURL={pdfURL} />
          </motion.div>
        </motion.div>

        <motion.div className="flex w-[60vw] justify-center overflow-y-auto overflow-x-hidden rounded-md">
          {pdfURL ? (
            <embed
              src={pdfURL}
              type="application/pdf"
              width="100%"
              height="100%"
            />
          ) : (
            <h1 className="m-4 border-b border-green-200 p-2 pb-6 text-2xl font-bold">
              Loading PDF...
            </h1>
          )}
        </motion.div>
      </motion.div>
    </Layout>
  );
}
