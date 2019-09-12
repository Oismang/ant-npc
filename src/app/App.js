import React from 'react';
import './App.css';
import Game from './components/game/Game';

class App extends React.Component {

  render() {
    return (
      <div>
        <input type="button" value="Start" onClick={this.startGame} />
        <div className="game">
          <Game onRef={ref => (this.child = ref)} />
        </div>
      </div>
    );
  }

  startGame = () => {
    this.child.startGame();
  }

}

export default App;
