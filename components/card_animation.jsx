import React, { useState, useEffect, memo, useRef } from "react";
import { useTransition, useChain, useTrail, animated, useSpringRef } from "@react-spring/web";

import data from "./data";
import styles from "./card_animation.module.scss";
import { Card } from './card.jsx';

export default memo(CardSet);



function CardSet({team}) {

  const [first_run, setRun] = useState(true);
  const [prev_team, setTeam] = useState(team);
  const start_num = useRef(1);
  const end_num = useRef(0);

  const enApi = useSpringRef();
  
  //no delay before this because only delay after first of two animations needed
  var my_enter = useTrail(prev_team.length, {
    ref: enApi,
    from: { opacity: start_num.current, scale: start_num.current},
    to: { opacity: end_num.current, scale: end_num.current},
    config: { mass: 2, tension: 170, friction: 33, trail: 13 * prev_team.length},
    onStart: () => console.log('Animation started' + start_num.current),
      onRest: () => console.log('Animation completed' + start_num.current),
  });

  console.log("ran func");

  
  //built-in delay for after first animation to ensure it finishes before second animation starts
  //useChain is not possible since that requires to animation div's, and one is only needed given the space constraints
  async function finishAnimation() {
    const delay = (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };
    enApi.start();
    await delay(800);
    setTeam(team);
  }
  
  //first animation (old team disappears)
  useEffect(() => {
    if(first_run) {
      //do nothing
      console.log("first_run!");
    } 
    else {
      finishAnimation(); //runs first animation, then delay until finished
      start_num.current = 0;
      end_num.current = 1;
    }
  }, [team]);

  //second animation (new team appears)
  useEffect(() => {
    if(first_run) {
      setRun(false);
    }
    else {
      enApi.start(); //no delay after this animation needed
      start_num.current = 1;
      end_num.current = 0;
    }

    const num_cards_per_row = 3;

    if(team.length > 1) { //give css document number of members in curr subteam
      document.body.style.setProperty("--num_rows", team.length/num_cards_per_row);
    }
    else { //default for <= 1 row is 1 row
      document.body.style.setProperty("--num_rows", 1);
    }
  }, [prev_team]
  );

  return (
    <>
      {/*<button type="button" onClick={() => toggle()}>
        {open ? "1" : "0"}
  </button>*/}
      <div className={styles.wrapper}>
        <div className={styles.deck_cont}>
          {my_enter.map((style, person) => (
            <animated.div
              className={styles.item}
              style={{ ...style}}
            >
            <Card
            information={prev_team[person]}>
            </Card>
            </animated.div>
          ))
        }
        </div>
      </div>
    </>
  );
}
