import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import styles from '../styles/Projects.module.css';
import page_bar_styles from '../styles/page_bar.module.css';

import MyDevLogo from '../public/graphics/logos/dev_logo.png';
import MemoryCardPNG from '../public/graphics/images/project-thumnbnails/reshot-icon-memory-game.svg';

const Projects_react_nextjs: NextPage = () => {

  const { t, lang } = useTranslation('common');
  const head_title = t('projects_nextjs_head_title');
  const page_title = t('projects_nextjs_page_title');
  const intro = t('projects_nextjs_intro');
  const mmcardgame_project_h2 = t('projects_nextjs_mmcardgame_project_h2');
  const mmcardgame_project_p = t('projects_nextjs_mmcardgame_project_p');
  const mmcardgame_project_link = t('projects_nextjs_mmcardgame_project_link');
  const projects_link_title = t('projects_link_title');
  const toGithubRepository = t('toGithubRepository');

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

        <h1 className={page_bar_styles.page_title}>{page_title}</h1>

      </section>

      <main className={styles.main}>

          <p className={styles.intro}>{intro}</p>

          {/* Projects Section */}

          <section className={styles.projects}>

            {/* -Memry Card Game */}
            <div className={`${styles.project_container} ${styles.project_mmcardgame}`}>

              <div className={styles.project_text_wrapper}>
                <h2 className={styles.project_h2}>{mmcardgame_project_h2}</h2>
                <p>{mmcardgame_project_p}</p>
                <Link className={styles.mmcardgame} rel="noreferrer prefetch" href='https://vercel-mmc-ard-game.vercel.app/de' target='_blank'>
                   <h3 className={styles.mmcardgame_l} title={projects_link_title}>{mmcardgame_project_link}</h3>
                </Link>
              </div>
              <div className={styles.project_img_wrapper}>
                <Link rel="noreferrer prefetch" href='https://github.com/wkddevelopment/Vercel_MMCardGame' target='_blank' title={toGithubRepository}>
                  <Image src={ MemoryCardPNG } className={styles.mmcardgame_img} alt="Project Logo" />
                </Link>
              </div>
            </div>
            

          </section>

      </main>

    </div>
  )
};

export default Projects_react_nextjs
