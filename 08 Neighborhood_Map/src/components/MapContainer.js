import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './Sidebar'
import axios from 'axios';
import {styles} from './Styles';
export default class MapContainer extends Component {

  state = {
    locations: [
                  {name: "Kazuko", location: {lat: 30.061187245779152, lng: 31.43708976572625}},
                  {name: "Turquoise Restaurant at Rixos Seagate Sharm", location: {lat: 28.037213119071858, lng: 34.4356470696589}},
                  {name: "The Bakery Shop (TBS)", location: {lat: 30.09103, lng: 31.323937}},
                  {name: "Paul - Maison de Qualité", location: {lat: 30.007102647353438, lng: 30.9735751517999}},
                  {name: "Zööba (زووبا)", location: {lat: 30.06124837014216, lng: 31.219262645315787}}
                ],
    markers: [],
    infowindow: new this.props.google.maps.InfoWindow()
  };
  gm_authFailure = () => {
    window.alert("Google Maps error!");
}
  componentDidMount() {
    this.loadMap();
    this.getData();
    window.gm_authFailure = this.gm_authFailure;
  };
//getting Data from the API
  getData = (query) => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
    const params = {
      client_id : 'CLTIH3IV2XFSLWYZBISQ12HK1KNHR5OKTJMTAIM5KBD4R3SM',
      client_secret : 'QTXDRKZCWVPXGOLVMI3B4SU05QPLBFT0BNQNK2XLENFGKEKE',
      ll: '30.049437,31.246935',
      query : 'food',
      near : 'Egypt',
      v: '20180323',
      limit: 30
    }
    axios.get(endPoint + new URLSearchParams(params))
    .then(response => {
      //console.log( response.data.response.groups[0].items) just for testing
    })
    .catch(error => {
      alert('sorry thtere is no data received')
    })
  }

  loadMap() {
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      const mapConfig = Object.assign({}, {
        center: {lat: 30.049437, lng: 31.246935},
        zoom: 6,
        styles : styles
      });
      this.map = new maps.Map(node, mapConfig)
      this.addMarkers()
    };
  };
  addMarkers = () => {
    const {google} = this.props
    let {infowindow} = this.state;
    this.state.locations.forEach((location, ind) => {
      const marker = new google.maps.Marker({
        position: {lat: location.location.lat, lng: location.location.lng},
        map: this.map,
        title: location.name,
        animation: google.maps.Animation.DROP
      });
      marker.addListener('click', () => {
        this.populateInfoWindow(marker, infowindow)
      })
      this.setState((state) => ({
        markers: [...state.markers, marker]
      }));
    })
  };

  //adding marker Drop functionality
  drop = marker => {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
    }
  };
  populateInfoWindow = (marker, infowindow) => {

    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {

      infowindow.marker = marker
      infowindow.setContent(`<h3>${marker.title}</h3>`)
      infowindow.open(this.map, marker)
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      //Making the marker bounce
        setTimeout(function() {marker.setAnimation(null);}, 900);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function () {
        infowindow.marker = null;
      });
    };
  };

  render() {
    return (
      <div>
        <div className="container">
          <Sidebar
            markers ={this.state.markers}
            locations= {this.state.locations}
            infowindow ={this.state.infowindow}
            populateInfoWindow = {this.populateInfoWindow}
          />
          <div role="application" className="map" ref="map">
            loading map...
          </div>
        </div>
      </div>
    )
  }
}