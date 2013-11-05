
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

    addLayer("roadmap", google.maps.MapTypeId.ROADMAP);
    addLayer("terrain", google.maps.MapTypeId.TERRAIN);
    addLayer("hybrid", google.maps.MapTypeId.HYBRID);
    addLayer("satellite", google.maps.MapTypeId.SATELLITE);

    function render(label) {
        addControlLayers("label");

    }

    var drawLayer  = new OpenLayers.Layer.Vector("Draw layer", this.drawOptions);
    this.drawLayer = drawLayer; 

    this.drawControls = {
        stream: new OpenLayers.Control.DrawFeature(drawLayers('Stream'),
                OpenLayers.Handler.Path),
        buffer: new OpenLayers.Control.DrawFeature(drawLayers('Buffer'),
                OpenLayers.Handler.Path),
        polygon: new OpenLayers.Control.DrawFeature(drawLayers('Field'),
                OpenLayers.Handler.Polygon),
        field: new OpenLayers.Control.DrawFeature(drawLayers('Field'),
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

    function addLayer(label, type) {
        var options = {
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
                      options ));


        map.addLayers([layer]);
        return layer;
    }
}

GMap.prototype.drawOptions = {
    styleMap: new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            fillColor: "#7CC96E",
            fillOpacity: 0.5,
            strokeColor: "#209110",
            strokeOpacity: 1,
            strokeWidth: 2,
            cursor: "pointer",
            pointRadius: 6,
            label: "",
            fontColor:"#1F8E0F",
            fontWeight: "bold",
            labelOutlineColor: "#B4DCA8",
            labelOutlineWidth: 2, 
        }),
        "select": new OpenLayers.Style({
            fillColor: "#75CAB5",
            fillOpacity: 0.5,
            strokeColor: "#5FC2BA",
            strokeOpacity: 1,
            strokeWidth: 2,
            graphicZIndex: 2,
            cursor: "pointer",
            label: ""
        })
    })
};

GMap.prototype.zoomTo = function(featureSpecs) {
    this.drawFeatures(featureSpecs);
    //var vectors = new OpenLayers.Layer.Vector("vector", {isBaseLayer: false});
    //if ( featureSpecs ) {
    //     for(var i in featureSpecs) {
    //        var feature = new OpenLayers.Feature.Vector(OpenLayers.Geometry.fromWKT(featureSpecs[i]));
    //        vectors.addFeatures([feature]);
    //     } 

    //     console.log(vectors.getDataExtent());
    //     this.map.zoomToExtent(vectors.getDataExtent()); 
    //}

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

GMap.prototype.drawLayer = function(label) {
    if (!label) {
        label = 'default';
    }

    return this.drawLayers[label.toLowerCase()];
}

GMap.prototype.drawFeatures = function(featureSpecs, label) {
    var layer = this.drawLayer(label);

    if (featureSpecs) {
        var newFeatures = [];

        for(var i in featureSpecs) {
            newFeatures.push(
                    new OpenLayers.Feature.Vector(
                        OpenLayers.Geometry.fromWKT(featureSpecs[i])));
        }

        layer.addFeatures(newFeatures);
        this.map.zoomToExtent(layer.getDataExtent()); 
    }
}




