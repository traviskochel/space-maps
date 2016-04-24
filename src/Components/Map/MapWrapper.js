const React = require('react');
const MapUtils = require('../../Utils/Map.js');

const MapWrapper = React.createClass({
  getElevation: function(){
    console.log('hi')
    MapUtils.getElevation(20, 30);
    // let lat = Number(document.getElementById('iLat').value);
    // let lon = Number(document.getElementById('iLat').value)
  },
  render: function() {
    return (
      <div>
        <div>
          lat: 
          <input 
            id="iLat" 
            type="text" 
            name="lat" 
            value="0" />
          lon: 
          <input 
            id="iLon" 
            type="text" 
            name="LastName" 
            value="0" />
          <button 
            type="button" 
            onClick={this.getElevation}>
            getElevation
          </button>
        </div>
        <img id="my-image" crossOrigin="anonymous" />
      </div>
    );
  }

});

module.exports = MapWrapper;