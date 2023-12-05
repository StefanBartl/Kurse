import Head from 'next/head';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

import { Navbar } from '../components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
      <>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='author' content='Stefan Bartl (WKDStevie)' />
          <meta name='description' content='Web-Development Portfolio by Stefan Bartl (WKDStevie)' />
          <meta name='keywords' content='Portfolio, Web-Development, HTML, CSS, Sass, Javascript, Typescript, Node.js, React, Next.js, Cyber-Security' />
          <link rel='icon' sizes='16x16' href='/graphics/logos/dev_logo.png' />
          <link rel='apple-touch-icon' sizes='120x120' href='/graphics/logos/dev_logo.png' />
        </Head>
        
        <div className='app-container'>
          <div className='navbar-container'>
            <Navbar />
          </div>

          <Component {...pageProps} />
        </div>

      </>
  ) 

}

export default MyApp
