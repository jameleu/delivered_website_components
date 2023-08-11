import styles from './infobox.module.scss'
import Image from 'next/image';


export function InfoBox(header, paragraph, imageLink, direction) {
    
    if(direction == "left"){
        return (
            <div className={styles.infoblock}>
                <Image src={imageLink} width={500} height={300} style={{width:"auto"}}></Image>
                <div className={styles.infotext}>
                    <h4>{header}</h4>
                    <p>{paragraph}</p>
                </div> 
            </div>
      );
    }

    else{
        return (
            <div className={styles.infoblock}>
                <div className={styles.infotext}>
                    <h4>{header}</h4>
                    <p>{paragraph}</p>
                </div> 
                <Image src={imageLink} width={500} height={300} style={{width:"auto"}}></Image>
            </div>
      );
    }

}
