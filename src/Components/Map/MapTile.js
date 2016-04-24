var React = require('react');
var _ = require('underscore');
var MapPixel = require('./MapPixel');

var MapTile = React.createClass({
  propTypes: {
    resolution: React.PropTypes.number,
    width: React.PropTypes.number,
    tile: React.PropTypes.object
  },
  renderPixels: function(){
    var pixels = [];
    _.each(this.props.tile.pixels, (pixel, i) =>{
      pixels.push(
        <MapPixel
          key={'pixel-'+i}
          resolution={this.props.resolution}
          pixel={pixel} />
      );
    });
    return pixels;
  },
  render: function() {
    let style = {
      width: this.props.width + "%"
    } 
    return (
      <div 
        className='map--tile'
        style={style} >

        {this.renderPixels()}
      </div>
    );
  }

});

module.exports = MapTile;