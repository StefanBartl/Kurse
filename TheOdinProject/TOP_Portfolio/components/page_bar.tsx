import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import styles from '../styles/page_bar.module.css';
import MyDevLogo from '../public/graphics/logos/dev_logo.png';


export const Page_Bar = () => {
  
    const { t, lang } = useTranslation('common');
    // Different page titles in different languages from locales (one's which are in en & de the same are hardcoded)
    const home_pagetitle = 'front-end. web-development';
    const odin_projects_pagetitle = 'the odin project';
    const projects_nextjs_page_title = t('projects_nextjs_page_title');
    const about_pagetitle = t('about_page_title');
    const contact_pagetitle = t('contact_page_title');

    return (
        <section className={styles.headline_section}>

            <div className={styles.devlogo_wrapper}>
              <Image src={ MyDevLogo } className={styles.devlogo} alt="Stefan Bartl's Logo" title='Science, Tech & Peace!' />
            </div>

            <h1 className={styles.page_title}>{}</h1>

        </section>
    )
}