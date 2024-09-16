import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import styles from '../styles/Contact.module.css';
import page_bar_styles from '../styles/page_bar.module.css';

import MyDevLogo from '../public/graphics/logos/dev_logo.png';
import facebookSVG from '../public/graphics/logos/web_plattforms/facebook-original.svg';
import githubSVG from '../public/graphics/logos/web_plattforms/github-original.svg';
import instagramSVG from '../public/graphics/logos/web_plattforms/instagram.svg';
import linkedinSVG from '../public/graphics/logos/web_plattforms/linkedin.svg';
import twitterSVG from '../public/graphics/logos/web_plattforms/twitter-original.svg';
import youtubeSVG from '../public/graphics/logos/web_plattforms/youtube.svg';

import { SendEmail } from '../components/SendEmail';

const Contact: NextPage = () => {

  const { t, lang } = useTranslation('common');
  const contact_head_title = t('contact_head_title');
  const page_title = t('contact_page_title');
  const contact_social_media_h = t('contact_social_media_h');
  const send_email_section_h2 = t('contact_send_email_section_h2');

  return (
    
    <div className={styles.container}>
      
      <Head>
        <title>{contact_head_title}</title>
      </Head>

      {/* Headline Section */}

      <section className={page_bar_styles.headline_section}>

          <div className={page_bar_styles.devlogo_wrapper}>
            <Image src={ MyDevLogo } className={page_bar_styles.devlogo} title='Science, Tech & Peace!' alt='Developers-Logo' />
          </div>

          <h1 className={page_bar_styles.page_title}>{page_title}</h1>

       </section>


      <main className={styles.main}>

        <section className={styles.social_media_section}>

           <h2 className={styles.contact_social_media_h}>{contact_social_media_h}</h2>
           <div className={styles.social_media_container}>

              <div className={`${styles.social_media_logo_wrapper} ${styles.instagramSVG_wrapper}`}>
                <Link href='https://www.instagram.com/_steve_vie/' target='_blank' rel="noreferrer prefetch" ><Image src={ instagramSVG } className={`${styles.social_media} ${styles.instagramSVG}`} alt='Instagram-Logo' /></Link>
              </div>

              <div className={`${styles.social_media_logo_wrapper} ${styles.facebookSVG_wrapper}`}>
                <Link href='https://www.facebook.com/barstevie/' target='_blank' rel="noreferrer prefetch" ><Image src={ facebookSVG } className={`${styles.social_media} ${styles.facebookSVG}`} alt='Facebook-Logo' /></Link>
              </div>

              <div className={`${styles.social_media_logo_wrapper} ${styles.githubSVG_wrapper}`}>
                <Link href='https://github.com/wkddevelopment' target='_blank' rel="noreferrer prefetch" ><Image src={ githubSVG } className={`${styles.social_media} ${styles.githubSVG}`} alt='Github-Logo' /></Link>
              </div>

              <div className={`${styles.social_media_logo_wrapper} ${styles.linkedinSVG_wrapper}`}>
                <Link href='https://www.linkedin.com/in/stefan-bartl-660556112/' target='_blank' rel="noreferrer prefetch" ><Image src={ linkedinSVG } className={`${styles.social_media} ${styles.linkedinSVG}`} alt='LinkedIn-Logo' /></Link>
              </div>

              <div className={`${styles.social_media_logo_wrapper} ${styles.twitterSVG_wrapper}`}>
                <Link href='https://twitter.com/stevVIEsprotest/' target='_blank' rel="noreferrer prefetch" ><Image src={ twitterSVG } className={`${styles.social_media} ${styles.twitterSVG}`} alt='Twitter-Logo' /></Link>
              </div>

              <div className={`${styles.social_media_logo_wrapper} ${styles.youtubeSVG_wrapper}`}>
                <Link href='https://www.youtube.com/channel/UCVUfjupaBJzqm4JfgWllumQ/about' target='_blank' rel="noreferrer prefetch" ><Image src={ youtubeSVG } className={`${styles.social_media} ${styles.youtubeSVG}`} alt='Youtube-Logo' /></Link>
              </div>

           </div>

        </section>
        



        <section className={styles.send_email_section}>

          <h2 className={styles.send_email_section_h2}>{send_email_section_h2}</h2>
          <div className={styles.send_email_form_wrapper} >
            <SendEmail />
          </div>

        </section>



      </main>

    </div>
  )
};

export default Contact
