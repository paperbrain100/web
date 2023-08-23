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
      <div className="gradient flex h-screen">
        <div className="flex w-[50vw] flex-col">
          <RoughNotation
            animationDelay={1000}
            animationDuration={2000}
            type="highlight"
            color="#f0fdf4"
            show={true}
          >
            <div className="m-4 flex gap-x-4 border-b border-green-200 p-2 pb-6 text-2xl font-bold">
              <Image
                src={Logo}
                className="rounded"
                alt="Logo"
                width={32}
                height={32}
              />
              <h1>PaperBrain Upload</h1>
            </div>
          </RoughNotation>
          <Chatbot name="explain" f_path={fpath} />
        </div>

        <motion.div className="h-[99vh] w-[50vw] overflow-x-hidden overflow-y-scroll rounded-md">
          {pdfURL ? (
            <embed
              src={pdfURL}
              type="application/pdf"
              width="100%"
              height="100%"
            />
          ) : (
            <div className="absolute right-64 top-[50%] items-center justify-center">
              Loading PDF...
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
