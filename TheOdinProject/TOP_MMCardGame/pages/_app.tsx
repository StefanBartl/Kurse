import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  
  return (
      <>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='author' content='Stefan Bartl (wkd-development)' />
          <meta name='description' content='Project task to complete the Javascript module "The Odin Project".' />
          <meta name='keywords' content='Memory-Game, Game, Browsergame, course assignment, The Odin Project, Sass, Javascript, Typescript, Node.js, React, Next.js' />
          <link rel='icon' sizes='16x16' href='/graphics/logos/dev_logo.png' />
          <link rel='apple-touch-icon' sizes='120x120' href='/graphics/logos/dev_logo.png' />
        </Head>
        
        <div className='app-container'>

          <Component {...pageProps} />
          
        </div>

      </>
  ) 

}

export default App