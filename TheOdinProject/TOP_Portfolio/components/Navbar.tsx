import Link from 'next/link';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';
import styles from '../styles/Navbar.module.css';
import Eye from '../public/graphics/images/eye_cuttted.png';

export const Navbar = () => {
  
    const { t, lang } = useTranslation('common');
    const home = t('navbar_home');
    const projects = t('navbar_projects');
    const about = t('navbar_about');
    const contact = t('navbar_contact');
    const eye_title = t('navbar_eye_title');
    // const under_construction = t('under_construction');

    //#region Cyber-Eye (Inspiration & most of the code: https://www.youtube.com/watch?v=TGe3pS5LqEw)

    function angle(cx: number, cy: number, ex: number, ey: number){
        const dy = ey - cy;
        const dx = ex -cx;
        const rad = Math.atan2(dy, dx); // range (-PI, PI)
        const deg = rad *180 / Math.PI; // rads to degs, range (180, 180)
        return deg;
    }
    useEffect(()=>{
        window.addEventListener('mousemove', (e)=>{

            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const anchor = document.querySelector<HTMLElement>('#anchor');
            const pupil = document.querySelector<HTMLElement>('#pupil');
            const rekt = anchor?.getBoundingClientRect(); //The Element.getBoundingClientRect() method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.
            
            if(rekt){
                const anchorX = rekt?.left + rekt?.width / 2;
                const anchorY = rekt?.top + rekt?.height / 2;    
                const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);
                if(pupil && anchor){
                    pupil.style.filter = `hue-rotate(${angleDeg}deg)`;
                    pupil.style.transform = `rotate(${90 + angleDeg}deg)`;
                }
            }
        })
    }, []);

    //#endregion

    return (
            <nav className={styles.mynavbar}>
                    <div className={styles.eye} id='anchor' title={eye_title}>
                        <a target="_blank" rel="noreferrer prefetch" href="https://netzpolitik.org/2023/europaweiter-protest-petition-gegen-chatkontrolle-gestartet/">
                            <Image src={Eye} className={styles.pupil} id='pupil' alt='Gadget' />
                        </a>
                    </div>
                
                <ul>

                    {/* Home */}
                    <li className={styles.nav_item_home}>
                        <Link href="/" className={`${styles.navbar_link}`} >{home}</Link>
                    </li>
                    
                    {/* Projects */}
                    <li className={styles.dropdown}>
                        <div className={`${styles.navbar_link} ${styles.dropbtn}`} >{projects}</div>
                            <div className={styles.dropdown_content}>
                                <Link  className={`${styles.navbar_link} ${styles.nav_item_projects_dropdown_li_1}`} href="/project_top">The Odin Project</Link>
                                <Link className={`${styles.navbar_link} ${styles.nav_item_projects_dropdown_li_2}`} href="projects_react_nextjs">React/Next.js-Projects</Link>
                            </div>
                    </li>

                    {/* About */}
                    <li className={styles.nav_item_about}>
                        <Link href="/about" className={`${styles.navbar_link}`} >{about}</Link>
                    </li>

                    {/* Contact */}
                    <li className={styles.nav_item_contact}>
                        <Link href="/contact" className={`${styles.navbar_link}`} >{contact}</Link>
                    </li>

                </ul>
            </nav>
    )
} 
