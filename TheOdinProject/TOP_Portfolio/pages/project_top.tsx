import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image'; 
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import styles from '../styles/Projects.module.css';
import page_bar_styles from '../styles/page_bar.module.css';

import MyDevLogo from '../public/graphics/logos/dev_logo.png';
import EtchASketchSVG from '../public/graphics/images/project-thumnbnails/etchasketch.svg';
import FourWinsPNG from '../public/graphics/images/project-thumnbnails/Connect4_Wins.png';
import TicTacToePNG from '../public/graphics/images/project-thumnbnails/Tic_tac_toe.png';
import RockPaperScissorSVG from '../public/graphics/images/project-thumnbnails/rockpaperscissors.svg';
import { useEffect } from 'react';

const Project_top: NextPage = () => {

  const { t, lang } = useTranslation('common');
  const head_title = t('project_top_head_title');
  const top_link_title = t('top_link_title');
  const intro = t('project_top_intro');
  const etch_h2 = t('project_top_etch_h2');
  const etch_p = t('project_top_etch_p');
  const etch_link = t('project_top_etch_link');
  const fourwins_h2 = t('project_top_fourwins_h2');
  const fourwins_p = t('project_top_fourwins_p');
  const fourwins_link = t('project_top_fourwins_link');
  const tictactoe_h2 = t('project_top_tictactoe_h2');
  const tictactoe_p = t('project_top_tictactoe_p');
  const tictactoe_link = t('project_top_tictactoe_link');
  const rps_h2 = t('project_top_rps_h2');
  const rps_p = t('project_top_rps_p');
  const rps_link = t('project_top_rps_link');
  const projects_link_title = t('projects_link_title');

  const toGithubRepository = t('toGithubRepository');
  const under_construction = t('under_construction');

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

        <h1 className={page_bar_styles.page_title}>the odin project</h1>

      </section>

      <main className={styles.main}>

          <p className={styles.intro}>
            <Link rel="noreferrer prefetch" href='http://www.theodinproject.com' title={top_link_title}>The Odin Project (TOP)  </Link>
            {intro}
          </p>

          {/* Projects Section */}

          <section className={styles.projects}>

            {/* Etch-a-Sketch */}
            <div className={`${styles.project_container} ${styles.project_etch}`}>

              <div className={styles.project_text_wrapper}>
                <h2 className={styles.project_h2}>{etch_h2}</h2>
                <p>{etch_p}</p>
                <Link className={styles.etch_a} rel="noreferrer prefetch" href='https://stefanbartl.github.io/Etch-a-Sketch/' target='_blank'><h3 className={styles.etch_a_l} title={projects_link_title}>{etch_link}</h3></Link>
              </div>

              <div className={styles.project_img_wrapper}>
                <Link className={styles.etch_a} rel="noreferrer prefetch" href='https://github.com/StefanBartl/Etch-a-Sketch' target='_blank' title={toGithubRepository}><Image src={ EtchASketchSVG}  alt="Project Logo" /></Link>
              </div>

            </div>

            {/* 4-in-a-row */}
            <div className={`${styles.project_container} ${styles.project_fourwins}`}>

              <div className={styles.project_text_wrapper}>
                <h2 className={styles.project_h2}>{fourwins_h2}</h2>
                <p>{fourwins_p}</p>
                <Link className={styles.fourwins_a} rel="noreferrer prefetch" href='https://stefanbartl.github.io/FourWins/' target='_blank'><h3 className={styles.fourwins_a_l} title={projects_link_title}>{fourwins_link}</h3></Link>
              </div>

              <div className={styles.project_img_wrapper}>
                <Link className={styles.fourwins_a} rel="noreferrer prefetch" href='https://github.com/StefanBartl/FourWins' target='_blank' title={toGithubRepository}><Image src={ FourWinsPNG } alt="Project Logo" /></Link>
              </div>

            </div>

            {/* Tick-Tac-Toe */}
            <div className={`${styles.project_container} ${styles.project_tictactoe}`} title= {under_construction}>

              <div className={`${styles.project_text_wrapper} ${styles.under_construction}`}>
                <h2 className={styles.project_h2}>{tictactoe_h2}</h2>
                <p>{tictactoe_p}</p>
                <Link className={styles.tictactoe_a} rel="noreferrer prefetch" href='https://stefanbartl.github.io/Tic-Tac-Toe/' target='_blank'><h3 className={styles.tictactoe_a_l} title={projects_link_title}>{tictactoe_link}</h3></Link>
              </div>

              <div className={`${styles.project_img_wrapper} ${styles.under_construction}`}>
                <Link className={styles.tictactoe_a} rel="noreferrer prefetch" href='https://github.com/StefanBartl/Tic-Tac-Toe' target='_blank' title={toGithubRepository}><Image src={ TicTacToePNG } alt="Project Logo"/></Link>
              </div>

            </div>

            {/* Rock-Paper-Scissor */}
            <div className={`${styles.project_container} ${styles.project_rps}`}>

              <div className={styles.project_text_wrapper}>
                <h2 className={styles.project_h2}>{rps_h2}</h2>
                <p>{rps_p}</p>
                <Link className={styles.rps_a} rel="noreferrer prefetch" href='https://stefanbartl.github.io/Rock-Paper-Scissor/' target='_blank'><h3 className={styles.rps_a_l} title={projects_link_title}>{rps_link}</h3></Link>
              </div>

              <div className={styles.project_img_wrapper}>
                <Link className={styles.rps_a} rel="noreferrer prefetch" href='https://github.com/StefanBartl/Rock-Paper-Scissor'target='_blank' title={toGithubRepository}><Image src={ RockPaperScissorSVG } alt="Project Logo" /></Link>
              </div>

            </div>

          </section>

      </main>

    </div>
  )
  
};

export default Project_top
