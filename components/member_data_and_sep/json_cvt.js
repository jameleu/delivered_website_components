const fs = require("fs");

const member_list = require("./member-data.json");

const handle_error = (error) => {
    if(error) {
        console.error("Error when writing to file: ", error);
    }
    else { 
        console.log("Successfully wrote file.")
    }
}

const main = (curr_json) => {
    var mech_team = [];
    var elec_team = [];
    var soft_team = [];
    var bus_team = [];
    var media_team = [];
    var leaders = [];

    const json_list = Object.entries(curr_json);

    //key: uniqname, value: object containing that person's information
    json_list.forEach(([key, value]) => {
        value["uniqname"] = key; //add uniqname to info object
        //if is not leader, add now
        if(value["leader"].length === 0) {
            switch(value["subteam"]) {
                case "Mechanical":
                    mech_team.push(value);
                    break;
                case "Electrical":
                    elec_team.push(value);
                    break;
                case "Software":
                    soft_team.push(value);
                    break;            
                case "Business":
                    bus_team.push(value);
                    break;
                case "Media":
                    media_team.push(value);
                    break;
                default:
                    console.error(key + " has no subteam!");
                    return;
            }
        }
        else {
            leaders.push(value);
        }
    });

    const sort_comparator = (a,b) => {
        var size_diff = a["name"].localeCompare(b["name"]);
          if(size_diff < 0) {
            return -1;
          }
          else if(size_diff > 0) {
            return 1;
          }
          return 0;
    };

    const lead_comparator = (a,b) => {
        //rank president, then vice president first
        if(a["leader"] === "President") {
            return 1; //(a > b ); bigger means later in leaders list, and that is added to the front of the list later 
            //therefore it is earlier on the website.
        }
        if(b["leader"] === "President") {
            return -1;
        }
        if(a["leader"] === "Vice President") {
            return 1;
        }
        if(b["leader"] === "Vice President") {
            return -1;
        }

        const regx = new RegExp("(((Software)|(Mechanical)|(Business)|(Media)|(Electrical)) Lead)");

        const match_a = a["leader"].match(regx); 
          //see if leader is a subteam leader, which is ranked higher than remaining leads
        const match_b = b["leader"].match(regx);
        if(match_a) {
            return -1;
        }
        if(match_b) {
            return 1;
        }

        var size_diff = a["name"].localeCompare(b["name"]);
        if(size_diff < 0) {
          return -1;
        }
        else if(size_diff > 0) {
          return 1;
        }
        return 0;
    }
 
    //sort in alphabetical order
    mech_team.sort(sort_comparator);
    elec_team.sort(sort_comparator);
    soft_team.sort(sort_comparator);
    bus_team.sort(sort_comparator);
    media_team.sort(sort_comparator);
    leaders.sort(lead_comparator); //higher ranking leaders at end, but added first to website (see below)

    //add leaders now
    leaders.forEach((lead) => {
        switch(lead["subteam"]) {
            case "Mechanical":
                mech_team.unshift(lead); //push to front
                break;
            case "Electrical":
                elec_team.unshift(lead);
                break;
            case "Software":
                soft_team.unshift(lead);
                break;            
            case "Business":
                bus_team.unshift(lead);
                break;
            case "Media":
                media_team.unshift(lead);
                break;
            default:
                console.error(key + " has no subteam!");
                return;
        }
    }
    );

    const mech_json = JSON.stringify(mech_team);
    const elec_json = JSON.stringify(elec_team);
    const soft_json = JSON.stringify(soft_team);
    const bus_json = JSON.stringify(bus_team);
    const media_json = JSON.stringify(media_team);

    fs.writeFile("mech_team.json", mech_json, "utf8", handle_error);
    fs.writeFile("elec_team.json", elec_json, "utf8", handle_error);
    fs.writeFile("soft_team.json", soft_json, "utf8", handle_error);
    fs.writeFile("bus_team.json", bus_json, "utf8", handle_error);
    fs.writeFile("media_team.json", media_json, "utf8", handle_error);
    
};

main(member_list);