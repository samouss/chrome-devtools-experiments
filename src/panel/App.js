import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'experiments',
    };
  }

  render() {
    return (
      <div style={{ width: '980px', margin: '50px auto' }}>
        Hello from the panel {this.state.message}!
      </div>
    );
  }
}

export default App;
