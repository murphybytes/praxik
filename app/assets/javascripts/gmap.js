
var app = angular.module("GoogleMap", ['ngResource']);

app.directive('map', function() {
    return {
      restrict: 'EA',
      //template: "<div ng-transclude> </div>",
      scope: { },
      //replace: true,
      //transclude: true,
      link: function(scope, element, attrs) {
//            map = new OpenLayers.Map(element[0], {});
            console.log("foo");

console.log("foo"+jQuery("#mapcontainer").length);

(function(){ 
//  if(jQuery("#mapcontainer").length) {
          console.log("foobar");
          var map;
          
            
      var keyStr = "ABCDEFGHIJKLMNOP" +
             "QRSTUVWXYZabcdef" +
             "ghijklmnopqrstuv" +
             "wxyz0123456789+/" +
             "=";
             
       function decode(input) {
         var output = "";
         var chr1, chr2, chr3 = "";
         var enc1, enc2, enc3, enc4 = "";
         var i = 0;
      
         // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
         var base64test = /[^A-Za-z0-9\+\/\=]/g;
         if (base64test.exec(input)) {
          alert("There was an error with the mapping software. Please contact the Webmaster.");
         }
         input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      
         do {
          enc1 = keyStr.indexOf(input.charAt(i++));
          enc2 = keyStr.indexOf(input.charAt(i++));
          enc3 = keyStr.indexOf(input.charAt(i++));
          enc4 = keyStr.indexOf(input.charAt(i++));
      
          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;
      
          output = output + String.fromCharCode(chr1);
      
          if (enc3 != 64) {
             output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
             output = output + String.fromCharCode(chr3);
          }
      
          chr1 = chr2 = chr3 = "";
          enc1 = enc2 = enc3 = enc4 = "";
      
         } while (i < input.length);
      
         return unescape(output);
        }
          
              //Set for Iowa
      var bounds = new OpenLayers.Bounds(
        -10757866.4085138, 4920674.43409749,
        -10034363.897346, 5388559.04380514 );
                
          var drawoptions = {
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
                        
          function init(){
            
              
      //Pink tile avoidance
      OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;
      
      //Make OL compute scale according to WMS spec
      OpenLayers.DOTS_PER_INCH = 25.4 / 0.28;

      var resarray = [
        156543.03390625,    //0
        78271.516953125,    //1
        39135.7584765625,   //2
        19567.87923828125,  //3
        9783.939619140625,  //4
        4891.9698095703125, //5
        2445.9849047851562, //6
        1222.9924523925781, //7
        611.4962261962891,  //8
        305.74811309814453, //9
        152.87405654907226, //10
        76.43702827453613,  //11
        38.218514137268066, //12
        19.109257068634033, //13
        9.554628534317017,  //14
        4.777314267158508,  //15
        2.388657133579254,  //16
        1.194328566789627,  //17
        0.5971642833948135, //18
        0.2985821416974068, //19
        0.1492910708487034, //20
        0.0746455354243517, //21
        0.0373227677121758, //22
        0.0186613838560879, //23
        0.009330691928044,  //24
        0.004665345964022,  //25
        0.002332672982011,  //26
        0.0011663364910055, //27
        0.0005831682455027, //28
        0.0002915841227514, //29
        0.0001457920613757  //30
      ];

        
      var mapoptions = {
        //controls: [],  //removes all the default controls
        maxExtent: bounds,
        restrictedExtend: bounds,
        resolutions: resarray,
        serverResolutions: resarray,
        minZoomLevel: 7,
        projection: "EPSG:3857",
        units: "m",
        theme: "css/libs/map.css"
      };
      
      //Initial map creation call
      map = new OpenLayers.Map( "map", mapoptions );
            
                
      map.events.register("zoomend", map, zoom_level_change);

      function zoom_level_change(){
        zoom_level = map.getZoom();
          if (zoom_level > 6){
          jQuery("#button-soil-icon").show();
          }else{
          jQuery("#button-soil-icon").hide();
          }
      }
      ;
            
              
      //---------Setup Google layers-----------//
      var googleoptions = {
        buffer: 0,
        maxExtent: bounds,
        tileOrigin: new OpenLayers.LonLat( -20037508.34, -20037508.34 ),
        tileSize: new OpenLayers.Size( 256, 256 ),
        displayOutsideMaxExtent: false,
        isBaseLayer: true,
        wrapDateLine: false
      };          

      var googlelayers = {
        terrain: new OpenLayers.Layer.Google(
          "terrain",
          jQuery.extend(
          {
            type: google.maps.MapTypeId.TERRAIN,
            maxZoomLevel: 15
          },
          googleoptions ) ),
        roadmap: new OpenLayers.Layer.Google(
          "roadmap",
          jQuery.extend(
          {
            type: google.maps.MapTypeId.ROADMAP,
            maxZoomLevel: 17
          },
          googleoptions ) ),
        hybrid: new OpenLayers.Layer.Google(
          "hybrid",
          jQuery.extend(
          {
            type: google.maps.MapTypeId.HYBRID,
            maxZoomLevel: 17
          },
          googleoptions ) ),
        satellite: new OpenLayers.Layer.Google(
          "satellite",
          jQuery.extend(
          {
            type: google.maps.MapTypeId.SATELLITE,
            maxZoomLevel: 17
          },
          googleoptions ) )
      };
      
      map.addLayers(
        [
          googlelayers[ "terrain" ],
          googlelayers[ "roadmap" ],
          googlelayers[ "hybrid" ],
          googlelayers[ "satellite" ]
        ] );

      //Initialize the default map view
      change_map_view("hybrid");        
      //---------END Setup Google layers-----------//
    
            
              
      //------------Setup SSURGO Layers-----------//
      var ssurgoparams = {
        format: "image/png",
        transparent: true,
        tiled: true,
        styles: "", //Defined on WMS server...I think
      };
      
      var ssurgooptions ={
        buffer: 0,
        maxExtent: bounds,
        tileOrigin: new OpenLayers.LonLat( -20037508.34, -20037508.34 ),
        tileSize: new OpenLayers.Size( 256, 256 ),
        displayOutsideMaxExtent: false,
        isBaseLayer: false,
        yx : { projection : false }
      };
    
      var ssurgolayers = {
        sapolygon: new OpenLayers.Layer.WMS(
          "sapolygon", decode("aHR0cDovL2lvd2FtbXAuY29tL2dpcy9nZW9zZXJ2ZXIvc3N1cmdvL2d3Yy9zZXJ2aWNlL3dtcw=="),
          jQuery.extend(
          {
            layers: "ssurgo:sapolygon",
          },
          ssurgoparams ),
          jQuery.extend(
          {
            visibility: true,
            opacity: 0.5
          },
          ssurgooptions ) ),
        mupolygon: new OpenLayers.Layer.WMS(
          "mupolygon", decode("aHR0cDovL2lvd2FtbXAuY29tL2dpcy9nZW9zZXJ2ZXIvc3N1cmdvL2d3Yy9zZXJ2aWNlL3dtcw=="),
          jQuery.extend(
          {
            layers: "ssurgo:mupolygon",
          },
          ssurgoparams ),
          jQuery.extend(
          {
            visibility: false,
            maxResolution: resarray[ 14 ],
            minResolution: resarray.slice( -1 ).pop(),
            opacity: 0.3
          },
          ssurgooptions ) ),
          
      };
      
      map.addLayers(
        [
          ssurgolayers[ "sapolygon" ],
          ssurgolayers[ "mupolygon" ],
        ] );    
      //------------END Setup SSURGO Layers-----------//
        
            
            //------------Setup Draw Layers-----------//
            
            var drawlayers ={
              userfeature: new OpenLayers.Layer.Vector(
                "userfeature",
                jQuery.extend(
                {
          
                },
                drawoptions ) ),
              muintersect: new OpenLayers.Layer.Vector(
                "Mupolygon Intersect",
                jQuery.extend(
                {
          
                },
                drawoptions ) )
            };
            
            map.addLayers(
              [
                drawlayers[ "userfeature" ],
                drawlayers[ "muintersect" ]
              ] );
            //------------END Setup Draw Layers-----------//
              
              
              
      //------------Setup Draw Controls-----------//
      var draw_controls ={
        points: new OpenLayers.Control.DrawFeature(
          drawlayers[ "userfeature" ],
          OpenLayers.Handler.Point,
          {
            displayClass: "olControlDrawFeaturePoint",
            title: "points"
          } ),
        path: new OpenLayers.Control.DrawFeature(
          drawlayers[ "userfeature" ],
          OpenLayers.Handler.Path,
          {
            displayClass: "olControlDrawFeaturePath",
            title: "path"
          } ),
        square: new OpenLayers.Control.DrawFeature(
          drawlayers[ "userfeature" ],
          OpenLayers.Handler.RegularPolygon,
          {
            displayClass: "olControlDrawFeatureBox",
            title: "square",
            handlerOptions:
            {
              irregular: true
            }
          } ),
        poly: new OpenLayers.Control.DrawFeature(
          drawlayers[ "userfeature" ],
          OpenLayers.Handler.Polygon,
          {
            displayClass: "olControlDrawFeaturePoly",
            title: "poly",
            handlerOptions:
            {
              freehand: false,
              freehandToggle: null,
              stopDown: false,
              stopUp: false
            }
          } ),
        freepoly: new OpenLayers.Control.DrawFeature(
          drawlayers[ "userfeature" ],
          OpenLayers.Handler.Polygon,
          {
            displayClass: "olControlDrawFeatureFreePoly",
            title: "freepoly",
            handlerOptions:
            {
              freehand: true,
              freehandToggle: null
            }
          } ),
        triangle: new OpenLayers.Control.DrawFeature(
          drawlayers[ "userfeature" ],
          OpenLayers.Handler.RegularPolygon,
          {
            displayClass: "olControlDrawFeatureTriangle",
            title: "triangle",
            handlerOptions:
            {
              sides: 3
            }
          } ),
        circle: new OpenLayers.Control.DrawFeature(
          drawlayers[ "userfeature" ],
          OpenLayers.Handler.RegularPolygon,
          {
            displayClass: "olControlDrawFeatureCircle",
            title: "circle",
            handlerOptions:
            {
              sides: 40
            }
          } )
      };
      
      //Add each of the tools listed above to the map 
      for(var key in draw_controls) {
        map.addControl(draw_controls[key]);
      }
    ;
            
            
            //Add data to hidden field when a shape has been added
            drawlayers[ "userfeature" ].events.on({
              featureadded: function( event ){
                update_form_input();
                load_map_vars();
                change_map_mode('select');
              },
              featureremoved: function( event ){
                update_form_input();
                hide_map_vars();
              },
            });
            
            //The following only allows one shape to be drawn at a time
            drawlayers[ "userfeature" ].events.on({
              beforefeatureadded: function( event ){
                delete_all_features();
              }
            });
            //------------END Setup Draw Controls-----------//
            
            
              
      //------------Setup Manipulation Controls-----------//
      var manipulation_controls = {
        select: new OpenLayers.Control.SelectFeature(
          drawlayers[ "userfeature" ],
          {
            title: "select",
            clickout: true,
            onSelect: onFeatureSelect,
            onUnselect: onFeatureUnselect
          })
      };
      
      //Add each of the tools listed above to the map 
      for(var key in manipulation_controls) {
        map.addControl(manipulation_controls[key]);
      }
      //------------END Setup Manipulation Controls-----------//
      
            
                      
            //Draw any saved geometry and zoom as appropriate
            draw_geometry_and_zoom();
            
            //Change initial map mode from the default navigation to select
            change_map_mode('select');
            
          }
          
          jQuery(document).ready(function() {
            init();   
          });
                  
          //Change layer function definition
          function change_map_view(view_type){
            //Return layers in an array by name
            var new_layer = map.getLayersByName(view_type);
            
            //Only use first layer
            if(new_layer[0])
              map.setBaseLayer(new_layer[0]);
          };
          
          //Change draw mode function definition
          function change_map_mode(mode_type){
            var map_modes = ["select", "points", "square", "poly", "circle"];
            
            if(mode_type == "path"){
              jQuery("#draw-path-tutorial").show('fast'); 
            }else{
              jQuery("#draw-path-tutorial").hide('fast'); 
            }
            
            //Cycle through draw layers to deactivate all but selected
            for(var i =0; i < map_modes.length; i++){
              var control = map.getControlsBy('title',map_modes[i]);
              
              if(control[0]){
                if(mode_type == map_modes[i]){
                  jQuery("#button-" + map_modes[i] + "-icon").attr("src","/assets/" + map_modes[i] + "-icon-down.gif");
                  control[0].activate();
                }else{
                  jQuery("#button-" + map_modes[i] + "-icon").attr("src","/assets/" + map_modes[i] + "-icon-up.gif");
                  control[0].deactivate();
                }
              }
            }
          };
                  
            
      var selected_feature = null;
      //Function called when object is selected
      function onFeatureSelect( feature ){
        selected_feature = feature;
        jQuery("#controls").show("slow");         
      };
      
      //Function called when object is unselected
      function onFeatureUnselect( feature ){
        selected_feature = null;
        jQuery("#controls").hide("slow");
      };
      
      function delete_selected_feature(){
        var userfeature_layer = map.getLayersByName('userfeature');
      
        if(userfeature_layer[0] && selected_feature && confirm('Deleting a field area is undoable. Are you sure you wish to continue?')){
          userfeature_layer[0].removeFeatures(selected_feature);  
          jQuery("#controls").hide("slow");
        }
        
        selected_feature = null;    
      };
      
      
      function delete_all_features(){
        var userfeature_layer = map.getLayersByName('userfeature');
        if(!userfeature_layer[0]){
          return;
        }
        
        var features = userfeature_layer[0].features;
        for(i=0; i<features.length; i++){
          userfeature_layer[0].removeFeatures(features[i]); 
        }
      };
      
      //Respond to delete key event
      jQuery("html").keyup(function(e){
        if(e.keyCode == 46)
          delete_selected_feature();
      });
      
      function zoom_extents(){
        var serialized_features = jQuery("#map_coords").val();
        var userfeature_layer = map.getLayersByName('userfeature');
        
        //If there are no shapes to load or the userfeature layer was unavailable, default zoom to all of state
        if(!serialized_features || !userfeature_layer[0]){
          map.zoomToExtent( bounds ); 
        }else{
          map.zoomToExtent( userfeature_layer[0].getDataExtent() );   
        }
      }
    
          
              
      var show_soil_layers = false;
      function toggle_soil_layer(){
        
        var mupolygon_layer = map.getLayersByName('mupolygon');
        if(!mupolygon_layer[0]){
          return;
        }

        show_soil_layers = !show_soil_layers;
        if(show_soil_layers){
          mupolygon_layer[0].setVisibility(true);
          jQuery("#button-soil-icon").attr("src","/assets/soil-button-down.gif");
        }else{
          mupolygon_layer[0].setVisibility(false);
          jQuery("#button-soil-icon").attr("src","/assets/soil-button-up.gif");
        } 
        
        mupolygon_layer[0].redraw();
      }
    ;
          
          function draw_geometry_and_zoom(){
          
            var serialized_features = jQuery("#map_coords").val();
            var userfeature_layer = map.getLayersByName('userfeature');
            
            //If there are no shapes to load or the userfeature layer was unavailable, default zoom to all of state
            if(!serialized_features || !userfeature_layer[0]){
              map.zoomToExtent( bounds ); 
              return;
            }
            
            var feature_specs = JSON.parse(serialized_features);
            
            var new_features = [];
            for(i=0; i<feature_specs.length; i++){
              new_features.push(new OpenLayers.Feature.Vector(
                OpenLayers.Geometry.fromWKT(feature_specs[i])
              ));
            }
            
            update_field_label();
            
            userfeature_layer[0].addFeatures(new_features);
            map.zoomToExtent( userfeature_layer[0].getDataExtent() ); 
          };
          
          
          function update_form_input(){
            var userfeature_layer = map.getLayersByName('userfeature');
            if(!userfeature_layer[0]){
              return;
            }
            
            var features = userfeature_layer[0].features;
            
            var output = [];
            for(i=0; i<features.length; i++){
              var feature_geometry = features[i].geometry;  
              output.push(feature_geometry.toString());
            }
            
            jQuery("#map_coords").val(JSON.stringify(output));
          };
            
                
          //AJAX Handler
          function load_map_vars(){
            jQuery("#mapvars").html("Loading...");
            //jQuery("#mapvars_box").show("slow");
            var request = jQuery.ajax({
              url : '/wp-admin/admin-ajax.php',
              type: "POST",
              data : {action: "bin_field_data"},
            });
            
            request.done(function(msg){
              jQuery("#mapvars").html(msg.substr(0, msg.length-1));
            });
            
            request.fail(function(jqXHR, textStatus){
              jQuery("#mapvars").html("Could not load in field data from the server.");
            });
          };
          
          
          function hide_map_vars(){
            jQuery("#mapvars").html("");  
            //jQuery("#mapvars_box").hide("slow");
          } 
          
          
          function update_field_label(){
            var userfeature_layer = map.getLayersByName('userfeature');
            if(!userfeature_layer[0]){
              return;
            }
            userfeature_layer[0].styleMap.styles.default.defaultStyle.label = jQuery("#name").val();
            userfeature_layer[0].redraw();    
          }
    
          //Add dynamic field label
          jQuery("#name").on('change',function(e){
            update_field_label();
          });
                  
            
      jQuery("#county_selector").on('change', function(e){
        var county_id = jQuery("#county_selector").val();
        var request = OpenLayers.Request.GET({
          url:"/wp-content/plugins/kps-webspinner/reports/county_server.php",
          params: {county: county_id},
          callback: zoom_on_county
        });
      });
      
      function zoom_on_county(response){
        var geojson_format = new OpenLayers.Format.GeoJSON();
        var vectors = geojson_format.read(response.responseText)
        var bounds = vectors[0].geometry.getBounds();
        map.zoomToExtent(bounds);
      }
      
      jQuery("#button-select-icon").on("click",function() {
        change_map_mode('select');
      });
      jQuery("#button-square-icon").on("click", function() {
        change_map_mode('square');
      });

      jQuery(document).ready(function() {
        //jQuery("#county_selector"). 
      });
//  }
})();


            return;
        },
    };
});
