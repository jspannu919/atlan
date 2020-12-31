import './search.css';
import Filters from '../Filters';
import Players from '../../data/players.json';
import Teams from '../../data/teams.json';
import Matches from '../../data/matches.json';
import Venues from '../../data/venues.json';

import {parseIntergerValues, getFilters, sortData, getTeamId} from '../../utils/appUtils';
import { useState } from 'react';

const Search = ({location}) => {

    const searchItem = location.search.slice(location.search.indexOf('=')+1);
    let filters = null,
        data = getData();
    const [sortBy, setSortBy] = useState('Name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [filteredData, setFilteredData] = useState(data);
    
    

    function getData(){
        let data;
        switch(searchItem){
            case 'Player':
                data = Players;
                break;
            case 'Teams':
                data = Teams;
                break;
            case 'Match':
                data = Matches;
                break;
            case 'Venue':
                data = Venues//data = Venues.map((obj) => ({...obj, Winner: obj.Winner.split(',')}));
                break;
            default:
                data = []
        }
        parseIntergerValues(data);
        return data;
    }

    function getImage(name){
        let imgDir = '/assets/images/';
        switch(searchItem){
            case 'Player':
                return imgDir + 'player.png';
            case 'Teams':
                return imgDir + 'teamLogo/' + getTeamId(name) + '.png';
            case 'Match':
                return imgDir + 'match.png';
            case 'Venue':
                return imgDir + 'venue.png';
            default:
                return []
        }
    }

    // apply filters recieved from Filters component
    // on the data
    function applyFilters (appliedFilters){
        let updatedData = data.filter(obj => {
                    let includeThisValue = true;
                    Object.keys(appliedFilters.range).forEach((filter) => {
                        if(obj[filter] < appliedFilters.range[filter][0] || obj[filter] > appliedFilters.range[filter][1]){
                            includeThisValue = false;
                        }
                    })

                    Object.keys(appliedFilters.text).forEach((filter) => {
                        if(appliedFilters.text[filter].length && !obj[filter].includes(appliedFilters.text[filter]) ){
                            
                            includeThisValue = false;
                        }
                    })

                    return includeThisValue;
                });

        if(JSON.stringify(updatedData) !== JSON.stringify(filteredData) ) setFilteredData(updatedData);
        
    }

    filters = getFilters(data);
    let sortedData = sortData([...filteredData], sortBy, sortDirection);

    return ( 
        <div className="search">
            <Filters filters={filters} data={data} onChange={applyFilters}/>
            <div className="main">

                <div className="sortBar">

                    <span>Sort By</span>
                    <select name="sortBy" onChange={(e) => setSortBy(e.target.value)}>
                        <option key='Name' value='Name'>Name</option>
                        {
                            [...filters.numerical].map((filter) => <option key={filter} value={filter}>{filter}</option>)
                        }
                    </select>

                    <span>Sort Direction</span>
                    <select name="sortDirection" onChange={(e) => setSortDirection(e.target.value)}>
                        <option value="asc" key="asc">Ascending</option>
                        <option value="desc" key="desc">Descending</option>
                    </select>

                </div>

                <div className="items">
                    {
                    sortedData.map((item)=>(
                        <div className="item" key={item['Name']}>
                            <img className="img" src={getImage(item['Name'])} alt=""/>
                            <div className="info">
                                {
                                    Object.keys(item).map((key) => (
                                        <div className="infoRow" key={key}>{key}: {item[key]}</div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    );
}
 
export default Search;