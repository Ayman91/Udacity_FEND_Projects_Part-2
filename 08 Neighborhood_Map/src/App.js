import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import MapContainer from './components/MapContainer';
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="heading"> My favorite locations </h1>
        <MapContainer
              google={this.props.google}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBqeCAur3WuwLz9vaZyfuVA4WzfqSFjmiM'
})(App)