import React from 'react';
import { connect } from 'react-redux';
import Game from './screens/game/Game';
import { START_SCREEN, GAME_SCREEN } from './constants/redux';
import Start from './screens/start/Start';
import './App.css';

class App extends React.Component {

  render() {
    const { currentScreen } = this.props.appState;

    return <>
      { this.renderScreens(currentScreen) }
    </>
  }

  renderScreens = (currentScreen) => {
    const stepWithScreens = {
      [START_SCREEN]: <Start />,
      [GAME_SCREEN]: <Game />
    };

    return stepWithScreens[currentScreen];
  }

}

export const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

export default connect(mapStateToProps)(App);
