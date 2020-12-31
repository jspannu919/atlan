import './card.css';
import {Link} from  'react-router-dom';

const Card = ({title, imgSource}) => {
    return ( 
        //used query parameter to identify the entity that user want to search
        <Link to={"search?query=" + title} className="link">
            <div className="card">
                <img src={imgSource} alt={title}></img>
                <span>{title}</span>
            </div>
        </Link>
     );
}
 
export default Card;