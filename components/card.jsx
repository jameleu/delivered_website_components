import Image from 'next/image';
import styles from './card.module.scss';
import { useState } from 'react';

export function Card({information}) {
    const {name, leader, website, year, hasHeadshot, funFact, major, linkedin, github, email, uniqname} = information;
    var true_image_src = "/instagram-icon-clear.png";

    
    if(hasHeadshot) {
        true_image_src= "/headshots/" + uniqname + ".JPG";
    }
    
    //to not show the image if it is not loaded (happens when full refresh)
    const [is_ready, setReady] = useState(false);
    
    const show = () => {
        setReady(true);
    };

    const has_fact = funFact.length !== 0;
    const has_LI = linkedin.length !== 0;
    const has_git = github.length !== 0;
    const has_email = email.length !== 0;
    const has_website = website.length !== 0;
  
    return(
        <div className={styles.flip}>
            <div className={styles.inner}>
                <div className={styles.front}>
                    <div className={is_ready ? styles.image_cont : styles.image_cont_before}>
                        <Image onLoadingComplete={show} className={styles.image} src={true_image_src} alt="Member Image" fill={true}></Image>
                    </div>
                    <p className={styles.name}>{name}</p>
                    <p className={styles.text}>{leader}</p>
                    <p className={styles.major}>Major: {major}</p>
                </div>
                <div className={styles.back}>
                    <div className={styles.outer_back}>
                        <p className={has_LI ? styles.linkedin : styles.invisible}>LinkedIn: <br></br> <a href={linkedin} className={styles.link} >{linkedin}</a> </p>
                        <p className={has_git ? styles.git : styles.invisible}>Git: <br></br> <a href={github} className={styles.link}> {github}</a> </p>
                        <p className={has_email ? styles.email : styles.invisible}>Email: <br></br> <a href={"mailto:" + email} className={styles.link}> {email}</a> </p>
                        <p className={has_website ? styles.website : styles.invisible}>Website: <br></br> <a href={website} className={styles.link}> {website}</a> </p>
                        <p className={has_fact ? styles.funfact_cont : styles.invisible}> Fun Fact: {funFact}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}