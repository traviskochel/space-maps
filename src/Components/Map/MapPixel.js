var React = require('react');

var MapPixel = React.createClass({
  propTypes: {
    pixel: React.PropTypes.number,
    resolution: React.PropTypes.number
  },
  render: function() {
    let style = {
      width: (100 / this.props.resolution) + '%',
      backgroundColor: "rgba(256,0,0," + this.props.pixel + ")",
    };

    return (
      <div 
        style={style}
        className='map--pixel'>
        <div className='map--tile-height-spacer' />
      </div>
    );
  }

});

module.exports = MapPixel;