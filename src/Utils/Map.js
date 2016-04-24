// just here to initialize the directory, and perhaps use as template

const GENERAL_SETTINGS = {
  mapWidthInDegree: 360.0,
  mapHeightInDegree: 180.0,
  mapStartLon: -180.0,
  mapStartLat: 90.0,
  pixelTileWidth: 256,
  pixelTileHeight: 256
}

const MAP_SETTINGS = {
  mars: {
    ...GENERAL_SETTINGS,
    maximumZoom: 5,
    elevationOffset: -8201,
    elevationScale: 115.4588,
    imgURL: 'https://api.nasa.gov/mars-wmts/catalog/Mars_MGS_MOLA_DEM_mosaic_global_463m_8/1.0.0/default/default028mm/'
  }, 
  vesta: {
    ...GENERAL_SETTINGS,
    maximumZoom: 4,
    elevationOffset: -43044,
    elevationScale: 317.8039,
    // need this
    imgURL: 'https://api.nasa.gov/vesta-wmts/catalog/Vesta_Dawn_HAMO_DTM_DLR_Global_48ppd8/1.0.0/default/default028mm/'
  }
}

module.exports = {
  planet: 'mars',
  setPlanet: function(planet) {
    if (planet) {
      this.planet = planet;
    }
  },
  settings: function() {
    return MAP_SETTINGS[this.planet];
  },
  getElevation: function(iLat, iLon){
    //get lat and lon input
    let settings = this.settings();

    if (iLat == -90)
            iLat = -89.9999;
    if (iLon == 180)
            iLon = 179.9999;

    //find tile row and col to compose URL to pull the tile image.
    let tileWidth = settings.mapWidthInDegree/Math.pow(2, settings.maximumZoom+1);
    let tileHeight = tileWidth;
    let col = Math.floor((iLon - settings.mapStartLon)/tileWidth);
    let row = Math.floor( (settings.mapHeightInDegree - (iLat + settings.mapStartLat)) /tileHeight);
    let imageURL = settings.imgURL +
            settings.maximumZoom + "/" + row + "/" + col + ".png";

    //calculate for pixel offsetX and offsetY  to pull pixel value from tile image.
    let lonRemainderDegree = (iLon - settings.mapStartLon) % tileWidth;
    let latRemainderDegree = (settings.mapHeightInDegree - (iLat + settings.mapStartLat)) % tileHeight;
    let offsetX = Math.round(lonRemainderDegree * (settings.pixelTileWidth/tileWidth));
    let offsetY = Math.round(latRemainderDegree * (settings.pixelTileHeight/tileHeight));

    // how to get this from react?
    let img = document.getElementById('my-image');
    // let img = new Image;
    img.crossOrigin = 'anonymous';
    // img.crossOrigin = '';

    img.addEventListener("load", () => {
      this.handleImgLoad(img, offsetX, offsetY)
    });
    img.src=imageURL;

    if ( img.complete || img.complete === undefined ) {
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = imageURL;
}
  },
  handleImgLoad: function(img, offsetX, offsetY){
    console.log('loaded')
    let canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

    let pixelData = canvas.getContext('2d').getImageData(offsetX, offsetY, 1, 1).data;

  //apply elevation scale and offset to find the elevation Value.

    let elevationValue = (pixelData[0] * settings.elevationScale) + settings.elevationOffset;
    alert(elevationValue + "m");
    img.removeEventListener("load", evtHandler);
  }
}

