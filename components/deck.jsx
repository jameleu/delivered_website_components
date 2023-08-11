import styles from './deck.module.scss'
import { useState } from 'react'
import Info from './info.jsx'
import CardSet from './card_animation.jsx'

var curr_num1 = 0;
var curr_num2 = 1;

export default function Deck({mechanical, electrical, software, business, media}) {
    const [team, setTeam] = useState(mechanical);
    const [isFlipped, setFlip] = useState(true);
    const [team_symb, setSymb] = useState("m");
    
    const flip = () => {
        setFlip(!isFlipped);
    };
    const flip_when_new = (curr_team, curr_symb) => {
        if(curr_symb != team_symb) {
            setTeam(curr_team);
            let temp = curr_num1;
            curr_num1=curr_num2;
            curr_num2=temp;
            flip();
        }
        setSymb(curr_symb);
    }
    console.log("Deck");

    return(
        <div className={styles.deck_container}>
            
        <div className={styles.base}>
            <div className={isFlipped ? styles.flipped : styles.no_flip}>
                <div className={styles.front}>
                    <Info team_abr={team_symb}
                        flipped={curr_num1}>
                        </Info>
                </div>

                <div className={styles.back}>
                    <Info team_abr={team_symb}
                        flipped={curr_num2}>
                        </Info>
                </div>
            </div>
        </div>

        <h2 className={styles.header2}> 5 subteams. 1 team. 41 hardworking members. </h2>
        
        <div className={styles.button_cont}>
        <button className ={styles.team_button} type="button"
            onClick={()=> {flip_when_new(mechanical, "m");}}
        > Mechanical </button>
        
        <button className = {styles.team_button} type="button"
           onClick={()=> {flip_when_new(electrical, "e");}}
        >
        Electrical</button>

        <button className = {styles.team_button} type="button"
            onClick={()=> {flip_when_new(software, "s");}}
        > Software </button>

        <button className = {styles.team_button} type="button"
            onClick={()=> {flip_when_new(business, "b");}}
        > Business </button>

        <button className= {styles.team_button} type="button"
            onClick={()=> {flip_when_new(media, "c");}}
        > Media </button>
        </div>
        
        <CardSet team={team}> </CardSet>

        </div>
    )
}