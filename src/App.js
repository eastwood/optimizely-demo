import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'friend'
    };
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:9000/api/v1/hello');
    const msg = await response.json();
    this.setState({
      name: msg
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-container">
          <h1>Welcome to the nib optimizely training {this.state.name}!</h1>
          <hr/>
          <h2>First Step</h2>
          <p>The above name is generated from the API. The SDK is installed on the API serving the content. See if you can change the messaging and/or font-colour based on a variation.</p>
        </div>
      </div>
    );
  }
}

export default App;
