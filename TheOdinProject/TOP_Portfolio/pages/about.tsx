import type { NextPage } from 'next';
import Image from 'next/image'; 
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import styles from '../styles/About.module.css';
import page_bar_styles from '../styles/page_bar.module.css';

import MyDevLogo from '../public/graphics/logos/dev_logo.png';
import MySignature from '../public/graphics/images/@me/unterschrift_transparent.png';
import EuropeMap from '../public/graphics/images/google_maps_europa_edited.png';
import MeDonaumarina from '../public/graphics/images/@me/sb_donaumarina.jpg';
import Link from 'next/link';

const About: NextPage = () => {

  const { t, lang } = useTranslation('common');
  const about_head_title = t('about_head_title');
  const about_page_title = t('about_page_title');
  const about_text_h2_first = t('about_text_h2_first');
  const about_text_p_first = t('about_text_p_first');
  const about_text_h2_second = t('about_text_h2_second');
  const about_text_p_second = t('about_text_p_second');
  const about_text_p_third = t('about_text_p_third');
  const about_me_final_text_h = t('about_me_final_text_h');
  const about_me_final_text_p = t('about_me_final_text_p');
  const about_me_final_text_h3 = t('about_me_final_text_h3');
  const github_link_title_portfolio_nextjs = t('github_link_title_portfolio_nextjs');
  const about_me_infobox = t('about_me_infobox');
  const about_me_infobox_2 = t('about_me_infobox_2');

  return (
    
    <div className={styles.container}>
      
      <Head>
        <title>{about_head_title}</title>
      </Head>




      {/* Headline Section */}

      <section className={page_bar_styles.headline_section}>

          <div className={page_bar_styles.devlogo_wrapper}>
            <Image src={ MyDevLogo } className={page_bar_styles.devlogo} title='Science, Tech & Peace!' alt='Developers-Logo' />
          </div>

          <h1 className={page_bar_styles.page_title}>{about_page_title}</h1>


      </section>


      <main className={styles.main}>

          {/* Content (Section */}

          <section className={styles.about_content_section}>

            {/* Content (left) Section */}

            <div className={styles.about_text_container}>

              <h2 className={styles.portfolio_h2}>{about_text_h2_first}</h2>
              <p>{about_text_p_first}</p>

              <h2>{about_text_h2_second}</h2>
              <p>{about_text_p_second}</p>
              <p className={styles.about_thanks}>{about_text_p_third}</p>

            </div>

          </section>

          {/* Map Section */}

          <section className={styles.about_map_section}>

            <div className={styles.about_map_container}>
              
                <div className={styles.about_map_wrapper}>
                  <Image src={ EuropeMap } alt="Map of Europe with Vienna marked" />
                </div>

            </div>

          </section>
          
          {/* Outro Section */}

          <section className={styles.about_outro_section}>

            <div className={styles.about_me_final_text}>

              <h2>{about_me_final_text_h}</h2>
              <p>{about_me_final_text_p}</p> 

            </div>

              <h3>{about_me_final_text_h3}</h3>

              <div className={styles.about_signature} >
                <Image src={ MySignature }  alt="Stefan Bartl's Signature " />
              </div> 


            <div className={styles.infobox}>
              <Link href='https://github.com/wkddevelopment/portfolio-next-ts' target='_blank' rel="noreferrer prefetch" title={github_link_title_portfolio_nextjs} >
                <h4>{about_me_infobox}</h4>
                <p>{about_me_infobox_2}</p>
              </Link>
            </div>
          
          </section>

          {/* Circle image */}

          <div className={styles.about_me_img_wrapper} >
            <Image src={ MeDonaumarina } alt="Image of Stefan Bartl" />
          </div>


      </main>

    </div>
  )
};

export default About
