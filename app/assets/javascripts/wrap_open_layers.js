
GMap = function(element, listener) {
    this.listener = listener;
    var _this = this;
    var bounds = new OpenLayers.Bounds(
            -10757866.4085138, 4920674.43409749,
            -10034363.897346, 5388559.04380514 );

    var mapOptions = {
        maxExtent: bounds,
        restrictedExtend: bounds,
        resolutions: [1.40625,0.703125,0.3515625,0.17578125,0.087890625,0.0439453125],
        numZoomLevels: 5,
        projection: "EPSG:3857",
        units: "m",
        theme: "assets/old_css/map.css"
    };

    var map = new OpenLayers.Map(element, mapOptions);
    this.map = map;

    gLayer("roadmap", google.maps.MapTypeId.ROADMAP);
    gLayer("terrain", google.maps.MapTypeId.TERRAIN);
    gLayer("hybrid", google.maps.MapTypeId.HYBRID);
    gLayer("satellite", google.maps.MapTypeId.SATELLITE);

    var drawLayer    = new OpenLayers.Layer.Vector("Draw layer");
    this.drawLayer = drawLayer; 

    this.drawControls = {
        line: new OpenLayers.Control.DrawFeature(drawLayer,
                OpenLayers.Handler.Path),
        polygon: new OpenLayers.Control.DrawFeature(drawLayer,
                OpenLayers.Handler.Polygon),
        box: new OpenLayers.Control.DrawFeature(drawLayer,
                OpenLayers.Handler.RegularPolygon, {
                    persist: true,
                    displayClass: "olControlDrawFeatureBox",
                    handlerOptions: { sides: 4, irregular: true }
                }),
        circle: new OpenLayers.Control.DrawFeature(drawLayer,
                  OpenLayers.Handler.RegularPolygon, {
                    persist: true,
                    displayClass: "olControlDrawFeatureCircle",
                    handlerOptions: { sides: 40, irregular: true }
                }),
        select: new OpenLayers.Control.SelectFeature(drawLayer,
                        { title: "select",
                          clickout: true,
                          onSelect: onFeatureSelect,
                          onUnselect: onFeatureUnSelect })

    };

    this.map.addLayers([drawLayer]);
    for(var key in this.drawControls) {
        this.map.addControl(this.drawControls[key]);
    }

    drawLayer.events.on({
        featureadded: function( e ) {
            _this.save();
            _this.toSelectMode();
        }
    });

    this.map.zoomToExtent(bounds); 

    function onFeatureSelect( feature ) {
      _this.selectedFeature = feature;
      _this.listener.onFeatureSelect();
    }

    function onFeatureUnSelect( feature ) {
      _this.selectedFeature = null;
      _this.listener.onFeatureUnSelecte();
    }

    return this;

    function gLayer(label, type) {
        var googleOptions = {
            buffer: 0,
            maxExtent: bounds,
            tileOrigin: new OpenLayers.LonLat( -20037508.34, -20037508.34 ),
            tileSize: new OpenLayers.Size( 256, 256 ),
            displayOutsideMaxExtent: false,
            isBaseLayer: true,
            wrapDateLine: false
        };

        var layer = new OpenLayers.Layer.Google(label, angular.extend(
                    { type: type,
                      maxZoomLevel: 15 },
                      googleOptions ));


        map.addLayers([layer]);
        return layer;
    }
}


GMap.prototype.deleteSelectedFeature = function() {
    if ( this.selectedFeature ) {
      this.drawLayer.removeFeatures(this.selectedFeature);  
      this.save();
    }
}

GMap.prototype.changeMapView = function(viewType) {
    var layer = this.map.getLayersByName(viewType);
    this.map.setBaseLayer(layer[0]);
}

GMap.prototype.toSelectMode = function() {
    for(key in this.drawControls) {
        var control = this.drawControls[key];
        control.deactivate();
    }
}

GMap.prototype.changeMapMode = function(modeType) {
    this.toSelectMode();
    this.drawControls[modeType].activate();
}

GMap.prototype.destroy = function() {
    this.map.destroy();
}

GMap.prototype.clean = function() {
    var features = this.drawLayer.features;

    for(var i in features) {
        console.log(features[i]);
        features[i].destroy();
    }
}

GMap.prototype.save = function() {
    var features = this.drawLayer.features;
    var featureSpecs = [];

    for(var i in features) {
        var geometry = features[i].geometry;  
        featureSpecs.push(geometry.toString());
    }

    if (this.listener.onUpdate) {
      this.listener.onUpdate(featureSpecs);
    }
}

GMap.prototype.drawFeatures = function(featureSpecs) {
    if (featureSpecs) {
        var newFeatures = [];

        for(var i in featureSpecs) {
            newFeatures.push(
                    new OpenLayers.Feature.Vector(
                        OpenLayers.Geometry.fromWKT(featureSpecs[i])));
        }

        this.drawLayer.addFeatures(newFeatures);
        //this.map.zoomToExtent(this.drawLayer.getDataExtent()); 
    }
}




