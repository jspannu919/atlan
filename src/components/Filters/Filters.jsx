import './filters.css';
import { Collapse, Checkbox, Tag } from 'antd';
import Slider from '../Slider';
import {useState} from 'react';

const { Panel } = Collapse;

const Filters = ({filters, data, onChange}) => {
    const [appliedFilters, setAppliedFilter] = useState({text:{}, range:{}});
    let filterValues = {};
    
    // get possible values for each filter
    function getFilterValues (data){
        filters.text
        .forEach((filter) => {
            if(filter === 'Winner Teams') {
                data.forEach((obj) => {
                    obj['Winner Teams'].split(',')
                        .forEach((teamName) =>{
                            if(!filterValues[filter]) filterValues[filter] = [];

                            if(filterValues[filter].indexOf(teamName) === -1 ){
                                filterValues[filter].push(teamName)     
                            }
                        })
                })
            }
            else{ 
                data.forEach((obj) => {
                    if(!filterValues[filter]) filterValues[filter] = [];

                    if(filterValues[filter].indexOf(obj[filter]) === -1 ){
                        filterValues[filter].push(obj[filter])     
                    }
                })
            }
        })
        filters.numerical
        .forEach((filter) => {
            let minValue = data[0][filter],
                maxValue = data[0][filter];

            data.forEach((obj) => {
                if(obj[filter] < minValue) minValue = obj[filter];
                if(obj[filter] > maxValue) maxValue = obj[filter];
            })

            filterValues[filter] = {
                min: minValue,
                max: maxValue
            }
        })
    }

    // handle filters which works on textual data
    function textFilterHandler (e){

        if(e.target.type === 'checkbox'){
            let filter = e.target.getAttribute('data-filter');
            let value = e.target.getAttribute('data-value');;
            let previousFilters = appliedFilters.text[filter] ? appliedFilters.text[filter] : [];
            if(e.target.checked) {
                previousFilters.push(value);
            }
            else{
                previousFilters = previousFilters.filter( arrayValue =>  arrayValue !== value);
            }

            let newFilter = {...appliedFilters  };
            newFilter.text[filter] = previousFilters;
            setAppliedFilter(newFilter);
        }
    }

    // handle filters which works on numerical data
    function rangeFilterHandler (filter, value){
        let newFilter = {...appliedFilters  };
            newFilter.range[filter] = value;

        setAppliedFilter(newFilter);
        
    }

    // clear filter using Tags
    function clearFilter(e){
        let filter = e.target.getAttribute('data-filter'),
            value  = e.target.getAttribute('data-value');
         
        if(appliedFilters.range[filter]){
            let newFilter = {...appliedFilters  };
            delete(newFilter.range[filter]);
            setAppliedFilter(newFilter);
        }
        else{
            let previousFilters = appliedFilters.text[filter];
            previousFilters = previousFilters.filter( arrayValue =>  arrayValue !== value);
            let newFilter = {...appliedFilters  };
            newFilter.text[filter] = previousFilters;
            setAppliedFilter(newFilter);
        }
    }

    //Plot tags for each choosen filter
    function getAppliedFilters(){
        let formattedAppliedFilters = [];
        Object.keys(appliedFilters.text)
            .forEach((key) => {
                formattedAppliedFilters.push(
                    appliedFilters.text[key]
                        .map((value) => (
                            <Tag closable color="warning" onClose={clearFilter} closeIcon={<span data-filter={key} data-value={value}>X</span>}>{key}: {value}</Tag>
                        )
                    )
                );
            })

        Object.keys(appliedFilters.range)
            .forEach((key) => {
                formattedAppliedFilters.push(
                    <Tag color="warning" onClose={clearFilter} closeIcon={<span data-filter={key} >X</span>}>{key}: Between {appliedFilters.range[key][0]} and {appliedFilters.range[key][1]}</Tag>  
                    )
            })  
        
        return formattedAppliedFilters;
    }

    getFilterValues(data);
    onChange(appliedFilters);
    
    return ( 
        <div className="filters">
            <span>Filters</span>
            <div className="appliedFilters">
                {getAppliedFilters()}
            </div>
            <Collapse>
                {
                    filters.numerical.map((filter) => (
                        <Panel header={filter} key={filter}>
                            <Slider filter={filter} min={filterValues[filter].min} max={filterValues[filter].max} value={appliedFilters.range[filter]} onChange={rangeFilterHandler}/>
                        </Panel>
                    ))
                }
                {
                    filters.text.map((filter) => (
                        <Panel header={filter} key={filter}>
                            <div className="checkboxContainer" onClick={textFilterHandler}>
                                {
                                    filterValues[filter]
                                        .map((value) => <Checkbox data-filter={filter} data-value={value} key={value} checked={appliedFilters.text[filter] && appliedFilters.text[filter].includes(value)}> {value}</Checkbox> )
                                }
                            </div>
                        </Panel>
                    ))
                }
             </Collapse>
        </div>
     );
}
 
export default Filters;