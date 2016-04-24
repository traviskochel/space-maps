var React = require('react');
var Firebase = require('firebase');
var _ = require('underscore');
var MapTile = require('./MapTile');

var MapWrapper = React.createClass({
  getInitialState: function() {
    return {
      planet: 'mars',
      mapData: null
    };
  },
  componentDidMount: function() {
    let db = new Firebase("https://space-maps.firebaseio.com/");
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
      let width = 100 / this.state.mapData.max_cols;
      _.each(this.state.mapData.tiles, (tile) => {
        tiles.push(
          <MapTile
            key={tile.row + '-' + tile.col} 
            resolution={this.state.mapData.resolution}
            width={width}
            tile={tile} />
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