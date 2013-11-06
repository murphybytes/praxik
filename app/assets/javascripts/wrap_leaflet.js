Maps = function(element) {
    var listener,
        drawnItems = new L.FeatureGroup(),
        lowaState = new L.LatLng(42.020855, -93.63639),
        map = new L.Map(element, {center: lowaState, zoom: 7});

    init();
    function init() {
        var layers = { 'Roadmap': googleLayer('ROADMAP'), 
                       'Hybrid': googleLayer('HYBRID'),
                       'Terrain': googleLayer('TERRAIN') };

        map.addControl(new L.Control.Layers(layers, {}));
        map.addLayer(drawnItems); 
        map.on('draw:created', onCreateDraw);
        map.addLayer(layers['Hybrid']);
        
        var drawControls = {};
        drawControls.draw = {
            position: 'topleft',
            polygon: {
                title: 'Draw a sexy polygon!',
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

            if (type === 'marker') {
                layer.bindPopup('A popup!');
            }

            drawnItems.addLayer(layer);
            notify(layer);
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

    function notify(data) {
        listener.onCreateDraw(data);
    }


    var api = {};

    api.addListener = function(obj) {
        listener = obj;
    }

    api.zoomTo = function(jsonFeature) {
        var feature = L.geoJson(jsonFeature);
        console.log(feature, feature.getBounds());
        //map.fitBounds(feature.getBounds());
        map.setView(feature.getBounds().getCenter(), 10);
    }

    api.drawFeatures = function(features) {
        L.geoJson(features, {}).addTo(map);
    }

    return api;
}
