import React, { useState, useEffect } from 'react';
import { client } from '../../utils/client';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Layout from '../layout';
import Navbar from '../../components/navbar';
import { Document, Outline, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { Loader2 } from 'lucide-react';
import Chatbot from '../../components/chatbot';

import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const ViewPdf = () => {
  const router = useRouter();
  const [response, setResponse] = useState({
    paper_title: '',
    paper_summary: '',
    paper_url: '',
  });
  let { slug } = router.query;
  slug = slug?.toString();
  slug = slug?.replace(/-/g, ' ');
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfURL, setPDFURL] = useState('');
  const [paperId, setPaperId] = useState('');

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setPageNumber(numPages);
  };

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

    client
      .post('/', { query: slug })
      .then(res => {
        setResponse(res.data.papers[0]);
        let id = res.data.papers[0].paper_url.split('/').pop();
        setPDFURL('https://arxiv.org/pdf/' + id + '.pdf');
      })
      .catch(err => {
        console.error(err);
      });
  }, [slug]);

  useEffect(() => {
    client
      .post('/indexpaper', { paperurl: pdfURL })
      .then(res => {
        setPaperId(res.data.paper_id);
      })
      .catch(err => {
        console.error(err);
      });
  }, [pdfURL]);

  console.log(paperId);

  const defaultLayoutPluginInstance = defaultLayoutPlugin(
  );

  return (
    <Layout>
      <Navbar heading={true} query={"null"} />

      <motion.div className="flex h-[91vh]">
        <motion.div className="flex w-[50vw] flex-col">
          <h1 className="mx-4 border-b border-gray-300 p-2 text-xl font-semibold">
            {slug}
          </h1>
          {/* </RoughNotation> */}
          <motion.div className="min-h-[50vh] overflow-y-auto scroll-smooth">
            <Chatbot name="arxiv" f_path={paperId} pdfURL={pdfURL} />
          </motion.div>
        </motion.div>

        <motion.div className="flex w-[60vw] justify-center overflow-y-auto overflow-x-hidden rounded-md">
          {pdfURL ? (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
              <div className='w-[50vw] rounded-lg overflow-x-hidden m-4'>
                <Viewer
                  fileUrl={pdfURL}
                  defaultScale={1.2}
                />
              </div>
            </Worker>
          ) : (
            <div className="m-4 inline-flex items-center border-b border-green-200 p-2 pb-6 text-2xl font-bold">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              Loading PDF...
            </div>
          )}

        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default ViewPdf;
