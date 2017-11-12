import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'experiments',
    };
  }

  render() {
    return (
      <div style={{ padding: '10px' }}>
        Hello from the panel {this.state.message}!
        <p>App: {this.props.name}</p>
        <p>Version: {this.props.version}</p>
      </div>
    );
  }
}

App.propTypes = {
  version: PropTypes.string,
  name: PropTypes.string,
};

App.defaultProps = {
  version: '',
  name: '',
};

export default App;
