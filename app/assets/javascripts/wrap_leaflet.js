Maps = function(element) {
    var listener,
        drawnItems = new L.FeatureGroup(),
        lowaState = new L.LatLng(42.020855, -93.63639),
        map = new L.Map(element, {center: lowaState, zoom: 7});

    init();
    function init() {
        var layers = { 'Roadmap': googleLayer('ROADMAP'), 
                       'Hybrid': googleLayer('HYBRID'),
                       'Terrain': googleLayer('TERRAIN') 
        };

        var soil = L.tileLayer.wms("http://devgis.iowammp.com/geoserver/ssurgo/gwc/service/wms", {
            layers: 'ssurgo:mupolygon',
            format: 'image/png',
            transparent: true,
	    opacity: 0.3,
            attribution: "Weather data © 2012 IEM Nexrad"
        });

        //soil.addTo(map);

        map.addControl(new L.Control.Layers(layers, {}));
        map.addLayer(drawnItems); 
        map.on('draw:created', onCreateDraw);
        map.on('draw:deleted', onDeleteDraw);
        map.addLayer(layers['Hybrid']);
        
        var drawControls = { position: 'topleft' };
        drawControls.draw = {
            marker: false,
            polygon: {
                title: 'Draw polygon!',
                allowIntersection: false,
                drawError: {
                    color: '#b00b00',
                    timeout: 1000
                },
                shapeOptions: {
                    color: '#bada55'
                },
                showArea: true
            },
            polyline: {
                metric: false
            },
            circle: {
                shapeOptions: {
                    color: '#662d91'
                }
            }
        };

        drawControls.edit = {
            featureGroup: drawnItems
        };

        map.addControl(new L.Control.Draw(drawControls)); 

        function onCreateDraw(e) {
            var type = e.layerType,
                layer = e.layer;

            drawnItems.addLayer(layer);
            listener.onCreateDraw(layer);
        }

        function onDeleteDraw(e) {
            var type = e.layerType,
                layers = e.layers._layers

            listener.onDeleteDraw(layers);
        }
    }

    function googleLayer(name) {
        var styles = [ {
            featureType: 'all', 
                stylers: [{hue: '#ff0000'}]
        } ];

        var options = { mapOptions: { styles: styles } };
        return new L.Google(name, options); 
    }

    //------------------------------------------------------------------------------------------------------------------------------------------------
    var api = {};

    api.addListener = function(obj) {
        listener = obj;
    }

    api.zoomTo = function(jsonFeature) {
        var feature = L.geoJson(jsonFeature);
        map.setView(feature.getBounds().getCenter(), 10);
    }

    api.drawFeatures = function(features) {
        if (features) {
            var layer = L.geoJson(features, {}).addTo(map);
            angular.forEach(layer._layers, function(item) {
              drawnItems.addLayer(item);
            })
        }
    }

    return api;
}
