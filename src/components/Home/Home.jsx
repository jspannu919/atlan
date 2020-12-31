import './home.css';
import Card from '../Card';

function Home() {
  return (
      <div className="container">
        <h1>What are you looking for?</h1>
        <div className="cards">
            <Card imgSource="/assets/images/player.png" title="Player"/>
            <Card imgSource="/assets/images/teams.png" title="Teams"/>
            <Card imgSource="/assets/images/match.png" title="Match"/>
            <Card imgSource="/assets/images/venue.png" title="Venue"/>
        </div>
      </div>
  );
}

export default Home;
