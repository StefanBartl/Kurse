import styles from '../styles/Home.module.css';
import type { NextPage } from 'next'
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import Monster_1 from '../public/graphics/pics/monster_group/monster_1.svg';
import Monster_2 from '../public/graphics/pics/monster_group/monster_2.svg';
import Monster_3 from '../public/graphics/pics/monster_group/monster_3.svg';
import Monster_4 from '../public/graphics/pics/monster_group/monster_4.svg';
import Monster_5 from '../public/graphics/pics/monster_group/monster_5.svg';
import Monster_6 from '../public/graphics/pics/monster_group/monster_6.svg';
import Monster_7 from '../public/graphics/pics/monster_group/monster_7.svg';
import Monster_8 from '../public/graphics/pics/monster_group/monster_8.svg';
import Monster_9 from '../public/graphics/pics/monster_group/monster_9.svg';
import Monster_10 from '../public/graphics/pics/monster_group/monster_10.svg';

import GithubSVG from '../public/graphics/logos/github-original.svg';


const Home: NextPage = () => {
  
  const { t, lang } = useTranslation('common');
  const app_title = t('app_title');
  const home_title_h1 = t('home_title_h1');
  const home_title_p = t('home_title_p');
  const home_scoreboard_actual_h2= t('home_scoreboard_actual_h2');
  const home_scoreboard_best_h2 = t('home_scoreboard_best_h2');
  const home_monster_alt = t('home_monster_alt');
  const home_to_repo = t('home_to_repo');

  const [actualScore, setActualScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  function resetCounter(){
    // reset 'clicked' attribute 
    const all_cards: NodeListOf<Element> = document.querySelectorAll('#monster_card_id');

    for (let index = 0; index < all_cards.length; index++) {
      const card = all_cards[index];
      card.setAttribute('data-clicked', 'no');
    };

    setActualScore(0);
};

  function alterScoreboardElements(correctGuess: number, bestCore: number ) {
    let timeout;
    //? clear timeout to not commulate durance
    clearTimeout(timeout);

    let scoreboard_font_el: HTMLElement | any = document.querySelector('#scoreboard_actual');
    let scoreboard_score_el: HTMLElement | any = document.querySelector('#actualScore');
    let bestScore_font_el: HTMLElement | any = document.querySelector('#scoreboard_best');
    let bestScore_score_el: HTMLElement | any = document.querySelector('#bestScore');
    
    /*? signal colors loop:
      1) alterScoreboardElements(1, 0); => signal: green actual score
      2) alterScoreboardElements(1, 1); => signal: green actual score, green best score
      3) alterScoreboardElements(0, 0);=> signal:  red actual score, red best score
    */

    if(correctGuess === 1){ // 1) alterScoreboardElements(1, 0); => signal: green actual score
      scoreboard_font_el.style.color = "green";
      scoreboard_score_el.style.color = "green";
      if(bestCore === 1){ // 2) alterScoreboardElements(1, 1); => signal: green actual score, green best score
        bestScore_font_el.style.color = "green";
        bestScore_score_el.style.color = "green";     
      };
    };

    if(correctGuess === 0 && bestCore === 0){ // 3) alterScoreboardElements(0, 0);=> signal:  red actual score, red best score
      scoreboard_font_el.style.color = "red";
      scoreboard_score_el.style.color = "red";
      bestScore_font_el.style.color = "red";
      bestScore_score_el.style.color = "red";
    }

    if ( !timeout ) {
        setTimeout(()=>{ resetScoreSignals() }, 2000);
    };

    function resetScoreSignals() {
      scoreboard_font_el.style.color = "white";
      scoreboard_score_el.style.color = "white";
      bestScore_font_el.style.color = "white";
      bestScore_score_el.style.color = "white";
    };
  };

  const onCardClick = (e:any) => {
    e.preventDefault();

    // Toggle card clicked attribute
    e.target.getAttribute('data-clicked') === 'no'
    ? e.target.setAttribute('data-clicked', 'yes')
    : e.target.setAttribute('data-clicked', 'no');
          
    if(e.target.getAttribute('data-clicked') == 'yes'){ // if player is correct, show signal & increase actualScore
      // show green font for 2s to signal player correct guess  
      alterScoreboardElements(1, 0);
      // set score
      setActualScore(actualScore + 1);
    } else { // if player fails, show signal, evaluate for best score & reset counter   
      
      if(actualScore > bestScore){ // evaluate for best score   
        // if new best score show green font signal 
        alterScoreboardElements(1, 1);
        // set new best score
        setBestScore(actualScore);
        // reset actual score counter
        setActualScore(0);
      } else { // if no new best score show signal & reset actual score counter
        // show no best score show red font signal 
        alterScoreboardElements(0, 0);
        // reset 
        setActualScore(0);
      };
      resetCounter();
    };
  };

  // game won loop
  if(actualScore === 12){
    setBestScore(12)
    resetCounter()
  };

  return (
      <>     
        <Head>
          <title>{app_title}</title>
        </Head>

        {/* HOME Title */}
        <div className={styles.home_title_div}>
          <h1 className={styles.home_title_h1}>{home_title_h1}</h1>
          <p className={styles.home_title_p}>{home_title_p}</p>
        </div>

        {/* Scoreboard */}
        <section className={styles.scoreboard_section}>
          <div>
            <h2 className={styles.scoreboard_actual} id='scoreboard_actual'>{home_scoreboard_actual_h2}</h2>
            <p id='actualScore'>{actualScore}</p>
          </div>
          <div>
          <h2 className={styles.scoreboard_best} id='scoreboard_best'>{home_scoreboard_best_h2}</h2>
          <p id='bestScore'>{bestScore}</p>
          </div>
        </section>

        {/* Gameboard */}
        <section className={styles.gameboard_section}>
          
          <div className={styles.monster_card} id='monster_card_id' data-clicked='no' onClick={onCardClick}>
            <Image src={Monster_1} alt={home_monster_alt} className={styles.monster_image}></Image>
            <h3>Sally</h3>
          </div>

          <div className={styles.monster_card} id='monster_card_id' data-clicked='no' onClick={onCardClick}>
            <Image src={Monster_2} alt={home_monster_alt} className={styles.monster_image}></Image>
            <h3>Norber</h3>
          </div>

          <div className={styles.monster_card} id='monster_card_id' data-clicked='no' onClick={onCardClick}>
            <Image src={Monster_3} alt={home_monster_alt} className={styles.monster_image}></Image>
            <h3>Jasiah</h3>
          </div>

          <div className={styles.monster_card} id='monster_card_id' data-clicked='no' onClick={onCardClick}>
            <Image src={Monster_4} alt={home_monster_alt} className={styles.monster_image}></Image>
            <h3>Karsyn</h3>
          </div>

          <div className={styles.monster_card} id='monster_card_id' data-clicked='no' onClick={onCardClick}>
            <Image src={Monster_5} alt={home_monster_alt} className={styles.monster_image}></Image>
            <h3>Jarvis</h3>
          </div>

          <div className={styles.monster_card} id='monster_card_id' data-clicked='no' onClick={onCardClick}>
            <Image src={Monster_6} alt={home_monster_alt} className={styles.monster_image}></Image>
            <h3>Kylan</h3>
          </div>

          <div className={styles.monster_card} id='monster_card_id' data-clicked='no' onClick={onCardClick}>
            <Image src={Monster_7} alt={home_monster_alt} className={styles.monster_image}></Image>
            <h3>Dayana</h3>
          </div>

          <div className={styles.monster_card} id='monster_card_id' data-clicked='no' onClick={onCardClick}>
            <Image src={Monster_8} alt={home_monster_alt} className={styles.monster_image}></Image>
            <h3>Todd</h3>
          </div>

          <div className={styles.monster_card} id='monster_card_id' data-clicked='no' onClick={onCardClick}>
            <Image src={Monster_9} alt={home_monster_alt} className={styles.monster_image}></Image>
            <h3>Myla</h3>
          </div>

          <div className={styles.monster_card} id='monster_card_id' data-clicked='no' onClick={onCardClick}>
            <Image src={Monster_10} alt={home_monster_alt} className={styles.monster_image}></Image>
            <h3>Pace</h3>
          </div>

        </section>

        <div className={styles.github_div}>
          <Link target='_blank' href='https://github.com/wkddevelopment/Vercel_MMCardGame'>
            <Image src={GithubSVG} className={styles.github_svg} width='1' height='1' alt='Github Logo with Link to APP-Repository' title={home_to_repo}></Image>
            <p className={styles.to_repo}>to repo</p>
          </Link>
        </div>
      </>
  ) 
};

export default Home