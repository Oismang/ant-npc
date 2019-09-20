import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './Start.css';

class Start extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount = () => {
  }

  render = () => {
    return (
      <div className={"start-root"}>
        <TextField
          label="name"
          error
        />
      </div>
    );
  }

}

export default Start;
