import React, { Component } from 'react';
import { Layer, Stage } from 'react-konva';
import Ant from '../../components/ant/Ant';
import House from '../../components/house/House';
import Leaf from '../../components/leaf/Leaf';
import { CLOSEST_DISTANCE, LEAFS_COUNT, TIMEOT_MILIS, VIEW_HEIGHT, VIEW_WIDTH } from '../../constants/config';
import { calculateAwayCoords, calculateNewCoords, delaySeconds, getClosestLeaf, getDistance, getRandomPoint } from '../../shared/helpers';
import { StackFSM } from '../../shared/stackFSM';
import './Game.css';

class Game extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ant: {
        x: 0,
        y: 0
      },
      house: {
        x: 0,
        y: 0,
        leafsCounter: 0
      },
      leafs: [],
      runAway: {
        warning: false,
        mousePoint: {
          x: 0,
          y: 0
        }
      }
    }
    this.brain = new StackFSM();
  }

  componentDidMount = () => {
    this.setRandomPoints();
  }

  startGame = () => {
    this.brain.pushState(this.findLeaf);
  }

  render = () => {
    return (
      <>
        <input type="button" value="Start" onClick={this.startGame} />
        <div className="game-root">
          <Stage width={VIEW_WIDTH} height={VIEW_HEIGHT} onMouseMove={this.onMouseMove}>
            {this.renderImages()}
          </Stage>
        </div>
      </>
    );
  }

  setRandomPoints = () => {
    const ant = getRandomPoint();
    const house = getRandomPoint();
    const leafs = [];
    for (let i = 0; i < LEAFS_COUNT; i++) {
      leafs[i] = getRandomPoint();
    }
    this.setState(() => {
      return { ant, house: { ...this.state.house, ...house }, leafs }
    });
  }

  renderImages = () => {
    const { ant, house, leafs } = this.state;

    return <Layer>
      <Ant {...ant} />
      <House {...house} />
      {leafs.map((leaf, i) => {
        return <Leaf key={i} {...leaf} />
      })}
    </Layer>
  }

  findLeaf = async () => {
    const { ant, leafs } = this.state;
    const closestLeaf = getClosestLeaf(ant, leafs);

    while (true) {
      // MOVE
      this.setState(() => {
        return { ant: { ...calculateNewCoords(this.state.ant, closestLeaf.leaf) } }
      });
      await delaySeconds(TIMEOT_MILIS);

      // IF AT LEAF
      if (getDistance(this.state.ant, closestLeaf.leaf) <= CLOSEST_DISTANCE) {
        this.setState(() => {
          return {
            ...this.state,
            leafs: [...this.state.leafs.slice(0, closestLeaf.indx), ...this.state.leafs.slice(closestLeaf.indx + 1)]
          }
        })

        this.brain.popState();
        this.brain.pushState(this.goHome);
        break;
      }

      // IF RUN AWAY
      if (this.state.runAway.warning) {
        this.brain.pushState(this.runAway);
        break;
      }

    }
  }

  goHome = async () => {
    const { house } = this.state;

    while (true) {
      // MOVE
      this.setState(() => {
        return { ant: { ...calculateNewCoords(this.state.ant, house) } }
      });
      await delaySeconds(TIMEOT_MILIS);

      // IF AT HOME
      if (getDistance(this.state.ant, house) <= CLOSEST_DISTANCE) {
        this.setState(() => {
          return {
            ...this.state,
            house: { ...this.state.house, leafsCounter: this.state.house.leafsCounter + 1 }
          }
        });
        this.brain.popState();
        this.brain.pushState(this.findLeaf);
        break;
      }

      if (this.state.runAway.warning) {
        this.brain.pushState(this.runAway);
        break;
      }
    }
  }

  runAway = async () => {
    while (true) {

      // MOVE
      this.setState(() => {
        return { ant: { ...calculateAwayCoords(this.state.ant, this.state.runAway.mousePoint) } }
      });
      await delaySeconds(TIMEOT_MILIS);

      // GO TO WORK!!!
      if (getDistance(this.state.ant, this.state.runAway.mousePoint) >= 100) {
        this.setState(() => {
          return { ...this.state, runAway: { warning: false } }
        });

        this.brain.popState();
        this.brain.update();
        break;
      }
    }
  }

  onMouseMove = (event) => {
    const mousePoint = { x: event.evt.layerX, y: event.evt.layerY };
    const { ant, runAway: { warning } } = this.state;

    if (!warning && getDistance(ant, mousePoint) < 30) {
      this.setState(() => { return { ...this.state, runAway: { warning: true, mousePoint } } });
    }
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

}

export default Game;
