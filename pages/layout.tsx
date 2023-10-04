import React from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

const variants = {
  hidden: { opacity: 0, x: 0, y: 40 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const Layout = ({ children }: any) => {
  return (
    <div>
      <Head>
        <title>PaperBrain</title>
        <link rel="icon" href="/favicon.ico" />
        {/* add meta */}
        <meta name="description" content="Exploring your study papers has never been easier!" />
        <meta name="keywords" content="PaperBrain, Paper, Brain, Study, Research, Research Paper, Paper Brain, PaperBrain" />
        <meta name="author" content="PaperBrain" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="PaperBrain" />
        <meta property="og:description" content="Exploring your study papers has never been easier!" />
        <meta property="og:image" content="https://paperbrain.study/logo.png" />
        <meta property="og:url" content="https://paperbrain.study" />
        <meta property="og:site_name" content="PaperBrain" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@__paperbrain" />
        <meta name="twitter:creator" content="@__paperbrain" />
        <meta name="twitter:title" content="PaperBrain" />
        <meta name="twitter:description" content="Exploring your study papers has never been easier!" />
        <meta name="twitter:image" content="https://paperbrain.study/logo.png" />
        <meta name="twitter:image:alt" content="PaperBrain" />
        <meta name="twitter:domain" content="paperbrain.study" />
      </Head>
      <motion.main
        variants={variants} // Pass the variant object into Framer Motion
        initial="hidden" // Set the initial state to variants.hidden
        animate="enter" // Animated state to variants.enter
        exit="exit" // Exit state (used later) to variants.exit
        transition={{ type: 'linear' }} // Set the transition to linear
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;
