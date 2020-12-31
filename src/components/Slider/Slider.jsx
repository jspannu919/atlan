import './slider.css';
import { Slider as RangeSlider } from 'antd';

const Slider = ({min, max, value, filter, onChange}) => {
    // if value is undefined, the min,max value is used by default
    if(!value){
        value = [min,max];
    }

    return ( 
        <>
            <RangeSlider
                className='rangeSlider'
                range
                step={1}
                defaultValue={value}
                min={min}
                max={max}
                tooltipVisible
                onChange={(value) => onChange(filter, value)}
            />
        </>
    );
}
 
export default Slider;