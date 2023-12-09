import type { NextPage } from 'next'
import Head from 'next/head';
import Image from 'next/image'; 
import useTranslation from 'next-translate/useTranslation';

import styles from '../styles/Home.module.css';
import page_bar_styles from '../styles/page_bar.module.css';

import MyDevLogo from '../public/graphics/logos/dev_logo.png';
import MyPortrait from '../public/graphics/images/@me/sb_bank.jpg';

const Home: NextPage = () => {

  const { t, lang } = useTranslation('common');
  const head_title = t('home_head_title');
  const introduction_headline_2h1_first = t('home_introduction_headline_2h1_first');
  const introduction_headline_2h1_second = t('home_introduction_headline_2h1_second');
  const introduction_headline_2h2_first = t('home_introduction_headline_2h2_first');
  const introduction_headline_2h2_second = t('home_introduction_headline_2h2_second');
  const introduction_first_h3 = t('home_introduction_first_h3');
  const introduction_first_p = t('home_introduction_first_p');
  const introduction_second_p = t('home_introduction_second_p');
  const introduction_text_statement = t('home_introduction_text_statement');

  
  return (
    
    <div className={styles.container}>
      
      <Head>
        <title>{head_title}</title>
      </Head>

      {/* HEADLINE Section */}

      <section className={page_bar_styles.headline_section}>

          <div className={page_bar_styles.devlogo_wrapper}>
            <Image src={ MyDevLogo } className={page_bar_styles.devlogo} alt="Stefan Bartl's Logo" title='Science, Tech & Peace!' />
          </div>

          <h1 className={page_bar_styles.page_title}>front-end. web-development</h1>

      </section>

      <main className={styles.main}>

        {/* Introduction Section */}

        <section className={styles.introduction_section}> 

          <div className={styles.introduction_img_wrapper} id='id_intro_animation'>
            <Image src={ MyPortrait } className={styles.introduction_img} alt='Image of the page developer Stefan Bartl '/>
          </div>

          <div className={styles.introduction_text_wrapper}>

          <div className={styles.introduction_headline}>
            <h2 className={styles.introduction_headline_2h1}><strong>{introduction_headline_2h1_first}</strong> {introduction_headline_2h1_second}</h2>
            <h2 className={styles.introduction_headline_2h2}>{introduction_headline_2h2_first}<strong>{introduction_headline_2h2_second}</strong></h2>
          </div>

            <h3 className={styles.introduction_first_h3}>{introduction_first_h3}</h3>
            <p className={styles.introduction_first_p} >{introduction_first_p}</p>
            <h3 className={styles.introduction_second_h3} >SCSS, React-Frameworks, Typescript & Cyber-Security</h3>
            <p className={styles.introduction_second_p} >{introduction_second_p}</p>
            <h3 className={styles.introduction_text_statement} >{introduction_text_statement}</h3>
          </div>

        </section>

      </main>

    </div>
  )
  
};

export default Home
