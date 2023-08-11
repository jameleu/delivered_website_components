import styles from './info.module.scss'
import Stats from './stats.jsx'

const fact_set = {
    "mechanical": [{statistic: 40, fact: "skilled fingers from 8 members (hopefully)"},
    {statistic: 117, fact: "components printed"}
    ],

    "electrical": [{statistic: 2, fact: "solderers venting"},
    {statistic: 292, fact: "hours spent soldering and creating custom PCBs"}
    ],

    "software": [{statistic: 29, fact: "people trying to fix segfaults"},
    {statistic: 483081, fact: "hours collectively spent outside"}
    ],

    "business": [{statistic: 2, fact: "representatives reaching out to sponsors"},
    {statistic: 15, fact: "deals made"}
    ],

    "media": [{statistic: 2, fact: "members spreading our good works"},
    {statistic: 876, fact: "collective supporters who follow our work"}
    ]
}

export default function Info({team_abr, flipped}) {
    var team;
    switch(team_abr) {
        case "m":
            team = "mechanical";
            break;
        case "e":
            team = "electrical";
            break;
        case "s":
            team = "software";
            break;
        case "b":
            team = "business";
            break;
        case "c":
            team = "media";
            break;
        default:
            team = "mechanical";
    }
    const team_facts = fact_set[team];
    return (
    <div className={styles.cont}>
            {team_facts.map((obj) => 
                        <Stats className={styles.stats}
                            num={obj.statistic*flipped}
                            fact={obj.fact}>
                        </Stats>)
            }
    </div>
    )
}