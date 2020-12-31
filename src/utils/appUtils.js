export function sortData(data, label, direction){
    /*
        sort Data as per the key passed as label
    */
    let isDataString = false;
    data.sort(
        (item1, item2) => {
            if(isNaN(data[item1])) isDataString = true;
            if(item1[label] < item2[label]) return 1;
            else if(item1[label] > item2[label]) return -1;
            else return 0;
        }
    )
    
    if(direction === 'desc' ^ isDataString) data = data.reverse();

    return data;
}

export function getFilters(data){
    /*
        get all possible filters as per the data recieved
    */
    let filters={
        text: [],
        numerical: []
    };
    Object.keys(data[0])
        .forEach((key) => {
            if(isFinite(data[0][key]))
                filters.numerical.push(key);
            else
                filters.text.push(key);
        }
    )
    return filters;
}

export function parseIntergerValues(data){
    /*
        parse valuew which are integer but recieved as an string
    */
    data.forEach(
        (obj) => {
            Object.keys(obj)
                .forEach((key) => {
                    if(obj[key] === "") {
                        obj[key]="NA"
                    }
                    else if(!isNaN(obj[key])){
                        obj[key] = parseInt(obj[key]);
                    }
                })
        }
    )
}


export function getTeamId(teamName){
    /*
       mapping each team to a unique ID
    */
    switch(teamName){
        case 'Mumbai Indians':
            return 0;
        case 'Rising Pune Supergiant':
            return 1;
        case 'Chennai Super Kings':
            return 2;
        case 'Delhi Daredevils':
        case 'Delhi Capitals':
            return 3;
        case 'Sunrisers Hyderabad':
            return 4;
        case 'Rajasthan Royals':
            return 5;
        case 'Deccan Chargers':
            return 6;
        case 'Kings XI Punjab':
            return 7;
        case 'Royal Challengers Bangalore':
            return 8;
        case 'Kolkata Knight Riders':
            return 9;
        // case 'Delhi Daredevils':
        //     return 10;
        case 'Pune Warriors':
            return 11;
        case 'Kochi Tuskers Kerala':
            return 12;
        case 'Gujarat Lions':
            return 13;
        default :
            return '';
    }
} 