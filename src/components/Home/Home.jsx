import './home.css';
import Card from '../Card';

function Home() {
  return (
      <div className="container">
        <h1>What are you looking for?</h1>
        <div className="cards">
            <Card imgSource="/assets/images/player.jpg" title="Player"/>
            <Card imgSource="/assets/images/teams.jpg" title="Teams"/>
            <Card imgSource="/assets/images/match.jpg" title="Match"/>
            <Card imgSource="/assets/images/venue.jpg" title="Venue"/>
        </div>
      </div>
  );
}

export default Home;
