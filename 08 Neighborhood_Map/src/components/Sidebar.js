import React, { Component } from 'react';
export default class Sidebar extends Component {

state ={
    query: ''
}
componentDidMount(){
    this.onclickLocation()
}
onclickLocation = () => {
    const displayInfowindow = (e) => {
      const markerInd =
        this.props.markers.findIndex(m => m.title.toLowerCase() === e.target.innerText.toLowerCase())
        this.props.populateInfoWindow(this.props.markers[markerInd], this.props.infowindow)
    }
    document.querySelector('.locations-list').addEventListener('click', function (e) {
      if (e.target && e.target.nodeName === "LI") {
        displayInfowindow(e)
      }
    })
  }
    handleValueChange = (e) => {
        this.setState({query: e.target.value})
      }

    render() {

    if (this.state.query) {
      this.props.locations.forEach((l, i) => {
        if (l.name.toLowerCase().includes(this.state.query.toLowerCase())) {
          this.props.markers[i].setVisible(true)
        } else {
          if (this.props.infowindow.marker === this.props.markers[i]) {
            // close the info window if marker removed
            this.props.infowindow.close()
          }
          this.props.markers[i].setVisible(false)
        }
      })
    } else {
      this.props.locations.forEach((l, i) => {
        if (this.props.markers.length && this.props.markers[i]) {
            this.props.markers[i].setVisible(true)
        }
      })
    }
        return (
            <div className="text-input">
            <input type='text'
                   placeholder="filter locations"
                   aria-label="Filter places"
                   value={this.value}
                   onChange={this.handleValueChange}/>
            <ul className="locations-list">
            {this.props.markers.filter(m => m.getVisible()).map((m, i) =>(
              <li 
              tabIndex="0"
              role="tab"
              key={i}>{m.title}
              </li>
              ))
            }</ul>
          </div>
         );
    }
}