import Head from 'next/head';
import Image from 'next/image';
import styles from './about.module.scss';
import Deck from '../../components/deck.jsx';
import { useEffect, useState } from 'react';
import { RingProgress, Title } from '@mantine/core';

//read subteam member json files
const mech_file = require("../../components/member_data_and_sep/mech_team.json");
const elec_file = require("../../components/member_data_and_sep/elec_team.json");
const soft_file = require("../../components/member_data_and_sep/soft_team.json");
const bus_file = require("../../components/member_data_and_sep/bus_team.json");
const media_file = require("../../components/member_data_and_sep/media_team.json");

//convert obj to iterable
const mech = Object.values(mech_file);
const elec = Object.values(elec_file);
const soft = Object.values(soft_file);
const bus = Object.values(bus_file);
const media = Object.values(media_file);

const about_body = " Michigan Robotic Submarine is a student-led engineering team comprised " +
"of primarily undergraduate students with diverse backgrounds and interests, working together to design and " + 
"build an autonomous robotic submarine for the annual RoboSub competition in San Diego, CA. " + 
"We strive to advance Autonomous Underwater Vehicle (AUV) technology by engineering a submarine that " +
"can perform various sub-nautical tasks, like sonar navigation and torpedo target shooting. ";

const comp_body = "RoboSub is an international student competition " +
"for student teams to design and build robotic submarines, or " + 
"\"Autonomous Underwater Vehicles\" (AUV), with behaviors that mimic real-world systems " +
"deployed around the world, such as underwater exploration, seafloor mapping, sonar " + 
"localization, and much more.";

export default function About() {
  console.log("About");
  
//to dynamically set height/width of video
const [video_size, setSize] = useState(0);
useEffect(() => {
  const update_dimensions = () => {
    setSize({ "width" : window.innerWidth * 0.6, "height" : window.innerHeight * 0.7});
  }

  setSize({ "width" : window.innerWidth * 0.6, "height" : window.innerHeight * 0.7});

  window.addEventListener("resize", update_dimensions);

  return () => {
    window.removeEventListener("resize", update_dimensions);
  }
}, []);

  return(
    <div className={styles.full_container}>
      {/* //replace local video path with real local video path */}
    <video autoPlay loop muted plays-inline className={styles.background_video}> <source src="sample.mp4"></source></video>
    <div className={styles.intro_header}>
      <div className={styles.outer_overflow}>
        <div className={styles.inner_overflow}>
          <h1 className={styles.title}> About Michigan Robotic Submarine </h1>
        </div>
        <h1 className={styles.divider}> | </h1>
        <h1 className={styles.title_2}> Michigan Robotic Submarine aims to advance autonomous underwater vehicle technology, cultivate individual member growth, & develop opportunities for future wolverine success.</h1>
    </div>
    </div>
    <div className={styles.body_container}>
    <section className={styles.sect_1}>
      <h1 className={styles.first_header}> Who We Are </h1>
      <p className={styles.text_body_1}> {about_body} </p>
    </section>
    <section className={styles.pie_charts}>
      <RingProgress size={400} thickness={30} 
          label={
                  <Title order={1} align="center" sx={{ pointerEvents: 'none' }}>
                      Ethnicity
                  </Title>
          }
          sections={[
            { value: 2.5, color: 'blue', tooltip: "2.5% - Multiracial or Biracial (not specified)"  },
            { value: 50, color: 'orange', tooltip: "50% - Asian or Pacific Islander"},
            { value: 27.5, color: 'cyan', tooltip: "27.5% - White or Caucasian"},
            { value: 5, color: 'green', tooltip: "5% - Hispanic or Latino" },
            { value: 5, color: 'grape', tooltip: "5% - Hispanic or Latino, White or Caucasian"},
            { value: 2.5, color: 'yellow', tooltip: "2.5% - Black or African American"},
            { value: 2.5, color: 'red', tooltip: "2.5% - White or Caucasian, Asian or Pacific Islander"},
            { value: 2.5, color: 'pink', tooltip: "2.5% - White or Caucasian, Asian or Pacific Islander (Multiracial or Biracial)"},
            { value: 2.5, color: 'maroon', tooltip: "2.5% - Black or African American, Hispanic or Latino (Multiracial or Biracial)"}

          ]}
      />
       <RingProgress size={400} thickness={30} 
          label={
                  <Title order={1} align="center" sx={{ pointerEvents: 'none' }}>
                    Gender
                  </Title>
          }
          //total: 139 responses (checkbox)
          sections={[
            { value: 2.5, color: 'red', tooltip: "2.5% - Non-binary"},
            { value: 65, color: 'pink', tooltip: "65% - Male"},
            { value: 32.5, color: 'maroon', tooltip: "32.5% - Female"}

          ]}
      />
        <RingProgress size={400} thickness={30} 
          label={
                  <Title order={1} align="center" sx={{ pointerEvents: 'none' }}>
                      Preferred Team Bonding Activity
                  </Title>
          }
          sections={[
            { value: 13.7, color: 'blue', tooltip: "13.7% - Apple Cider and Donut Hangout"  },
            { value: 11.5, color: 'cyan', tooltip: "11.5% - Lab or Classroom Study Session"},
            { value: 15.1, color: 'green', tooltip: "15.1% - Joint Engineering Design Team Party!"},
            { value: 16.5, color: 'grape', tooltip: "16.5% - Bowling" },
            { value: 18.7, color: 'orange', tooltip: "18.7% - Board and Card Game Night"},
            { value: 12.2, color: 'yellow', tooltip: "12.2% - Tailgate for Michigan Football"},
            { value: 12.3, color: 'teal', tooltip: "12.2% - Paint the UMich Rock"}
          ]}
      />
    </section>
    <section className={styles.sect_2}>
      <h1 className={styles.first_header}> The Robosub Competition </h1>
      <iframe width={video_size["width"]} height={video_size["height"]} src="https://www.youtube.com/embed/uSPy8BruHug" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      <p className={styles.text_body_2}> {comp_body} </p>
      <p className = {styles.text_body_2}>Learn more at: <a href="robosub.org" className={styles.link}> robosub.org </a> </p>
    </section>
    <section className={styles.sect_2}>
      <h1 className={styles.second_header}> Meet the Team </h1>
          <Deck
                mechanical={mech}
                electrical={elec}
                software = {soft}
                business = {bus}
                media = {media}
          /> 
    </section>
      
      </div>
      </div>
  )

}