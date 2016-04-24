var React = require('react');
var Firebase = require('firebase');
var _ = require('underscore');

var MapWrapper = React.createClass({
  getInitialState: function() {
    return {
      planet: 'mars',
      mapData: null
    };
  },
  componentDidMount: function() {
    let db = new Firebase("https://sweltering-heat-7890.firebaseio.com/");
    let _this = this;

    db.on("value", function(snapshot) {
      let data = _.findWhere(snapshot.val(), {planet: _this.state.planet});
      _this.setState({
        mapData: data
      });
    });
  },
  renderTiles: function(){
    if (this.state.mapData) {
      let tiles = [];

      _.each(this.state.mapData.tiles, (tile) => {

        let size = 100 / this.state.mapData.max_cols;

        let style = {
          backgroundColor: "rgba(256,0,0," + tile.gray_value + ")",
          width: size + "%"
        } 

        tiles.push(
          <div 
            className='map--tile'
            style={style} 
            key={tile.row + '-' + tile.col} >
            <div className='map--tile-height-spacer' />
          </div>
        );
      })
      return tiles;
    }
  },
  render: function() {
    return (
      <div className="map--wrapper">
        {this.renderTiles()}
      </div>
    );
  }

});

module.exports = MapWrapper;