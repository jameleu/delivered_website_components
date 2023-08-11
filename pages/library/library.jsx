import Head from 'next/head'
import Image from 'next/image'
import styles from './documentation.module.scss'
import SortTable from '../../components/sort_table.jsx'

const the_data = [
    {name : "Clam-Slam", date : "2023" , dwn : "1test" },
    {name : "Erie", date : "2022" , dwn : "3test" },
    {name : "Huron", date : "2021" , dwn : "2test" },
    {name : "Other", date : "2013" , dwn : "0test" }
  ];

const submarines_txt = "We write a detailed report on the technical specifications of each submarine " +
          "we design for the annual RoboNation Robosub competition. The report is called a \"technical design report\" " +
          "and overviews mechanical, software, and hardware components, some of which include object detection, hull design, " + 
          "and hydrophone prototyping. Testing for calibration and experiments on new features " +
          "are documented in these reports as well."

export default function Library() {
    return(
        <div className={styles.whole_cont}>
            <video autoPlay loop muted plays-inline className={styles.background_video}> <source src="sample.mp4"></source></video>
            <div className={styles.intro_header}>

                <h1 className={styles.title}> Michigan Robotic Submarine Library </h1>
            </div>
          <div className={styles.outer_cont}>
                <section className={styles.sect_b}>
                    <div className={styles.smaller_width}>
                        <h1 className={styles.hdr}> All You Need to Know About Our Submarines, In One Place</h1>
                        <p className={styles.body_txt}> {submarines_txt} </p>
                    </div>
                </section>
                <section className={styles.sect_w}>
                    <div className={styles.smaller_width}>
                        <h1 className={styles.hdr}> The Library </h1>
                        <SortTable data={the_data}> </SortTable>
                    </div>
                </section>
          </div>
        </div>
    );
}