import styles from './info.module.scss'
import { useSpring, animated, useSpringRef, useChain } from '@react-spring/web';
import { FONT_LOADER_MANIFEST } from 'next/dist/shared/lib/constants';
import { useEffect, useState } from 'react';

export default function Stats({num, fact}) {

    const random_dur_factor = Math.random();
    const dur = random_dur_factor * 800 + 500;

    // const num_ref = useSpringRef();
    const props = useSpring({ from: {val: 0}, to: {val: num}, delay: 600, reset: true,
                config: (num < 5 ) ? {
                    mass: 1,
                    tension: 12,
                    friction: 5,
                    clamp: true
                } 
                : //ternary operator
                 {
                    frequency: 1,
                    mass: 3,
                    tension: 1,
                    friction: 10,
                    damping: 1,
                    clamp: true
                },
            // ref: num_ref
            }
        );
    
    const [flipped, setFlip] = useState(false);
    const [visible_fact, setFact] = useState("");

    //needed to not load in fact so soon to avoid it from appearing before the background flips
    async function fade_in_delay() {
        const delay = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        };
        await delay(400);
        setFact(fact);
    }

    useEffect( () => {
        setFlip(!flipped);
        fade_in_delay();
    }, [num, fact]);

    // const fade_ref = useSpringRef();
    // const fade_in = useSpring({ from: {opacity: 0}, to: {opacity: 1},
    //             config: {
    //                 mass: 1,
    //                 tension: 20,
    //                 friction: 10
    //             },
    //         ref: fade_ref
    //         }
    //     );
    // useChain([num_ref, fade_ref], [0, 0.4]);
    return (
        <div className={styles.stat_block}>
            <animated.div className={styles.number}>
                {props.val.interpolate(val => Math.floor(val))}
            </animated.div>
            <p className={flipped ? styles.text_2 : styles.text_1}> {visible_fact} </p>
        </div>
    )
}