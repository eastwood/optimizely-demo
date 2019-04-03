import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'friend',
      isHidden: true
    };
  }

  async componentDidMount() {
    const id = window.localStorage.getItem('id');
    // this is just demo code, please don't do things this way
    const options = {};
    if (id) {
      options.headers = {
        "x-user-id": id
      }
    }
    const response = await fetch('http://localhost:9000/api/v1/hello', options);

    const msg = await response.json();
    const userId = msg.id;
    if (userId !== id) window.localStorage.setItem('id', userId);
    this.setState({
      name: msg.name,
      id: userId,
      experiment: msg.experiment
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
        </header>
        <div className="App-container">
          <h1 style={{textAlign: "center"}}>Welcome to the nib optimizely training {this.state.name}!</h1>
          <div className="page-container">
            <h2>First Step</h2>
            <hr/>
            <p>The above name is generated from the API. The SDK is installed on the API serving the content. See if you can get the SDK connected on the server to optimizely.</p>
            <h2>Second Step</h2>
            <hr/>
            <p>Your user id is <strong>{this.state.id ? this.state.id : '...'}</strong>, this is auto-generated on the server and saved in local storage on the browser. It is used to track your optimizely session and uniquely identify a user and their variation. Try clear your local storage to update it.</p>
            <p>When using optimizely full stack, it's our job to make sure that we keep track of the unique id of the user throughout the experience. Ideally, the user experience should be consistent, so make sure that the variation does not change for any particular userId. Also keep in mind that this user id is a naive number between 0 -> 1000</p>
            <h2>Third Step</h2>
            <hr/>
            <p>I have retrieved some statically defined variation data from the server, this looks like the following:</p>
            <code>
              {this.state.experiment ? JSON.stringify(this.state.experiment) : 'Loading...'}
            </code>
            <p>Using optimizely, create some new variations and try and get the optimizely SDK returning some more variation data to the frontend. Examples include:</p>
            <ul>
              <li>Change icon at the top</li>
              <li>Create a hero image</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
