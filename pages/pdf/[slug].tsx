import React, { useState, useEffect, use } from 'react';
import { client } from '../../utils/client';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Layout from '../layout';
import Navbar from '../../components/navbar';
import { toast, Toaster } from 'react-hot-toast';
import { useUser } from '@auth0/nextjs-auth0';
import { Document, Outline, Page, pdfjs } from 'react-pdf';
import { RoughNotation } from 'react-rough-notation';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import Chatbot from '../../components/chatbot';
import { Loader2 } from 'lucide-react';

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

  return (
    <Layout>
      <Navbar heading={true} />

      <motion.div className="flex h-[91vh]">
        <motion.div className="flex w-[50vw] flex-col">
          <h1 className="mx-4 border-b border-gray-300 p-2 text-xl font-semibold">
            {slug}
          </h1>
          {/* </RoughNotation> */}
          <motion.div className="min-h-[50vh] overflow-y-auto scroll-smooth">
            {/* {
                            response.paper_title && <h1 className='border-2 border-green-200 bg-white m-4 p-2 pb-6'><strong>Abstract - </strong>{response.paper_summary}</h1>
                        } */}

            <Chatbot name="arxiv" f_path={paperId} pdfURL={pdfURL} />
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
