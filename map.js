require([
		  "esri/config",
		  "esri/Map",
		  "esri/views/MapView",
		  "esri/widgets/Locate",        
		  "esri/widgets/Track",
		  "esri/Graphic",
		  "esri/widgets/BasemapToggle",
		  "esri/widgets/BasemapGallery",
		  "esri/layers/GraphicsLayer"

		], function(
			esriConfig,
			Map,
			MapView,
			Locate,       
			Track,
			Graphic,
			BasemapToggle,
			BasemapGallery,
			GraphicsLayer
		) {
	esriConfig.apiKey = "AAPK5067984744a84d2384da027ddfa80ce8RZonR4G8lDlC88I5gs7vJBrdh-u6flR0MqOQHsgL3rzjjr7dtVU4638ZtVDz9DA1";
	const map = new Map ({
		basemap:"arcgis-navigation" 
	})
	
	const view = new MapView({
		map:map,
		center:[118.805,34.207],
		zoom:2,
		container:"viewDiv"

	});
	
	const basemapToggle = new BasemapToggle({
		view: view,
		nextBasemap: "arcgis-imagery"
		});
	view.ui.add(basemapToggle,"bottom-right");
	
	const basemapGallery = new BasemapGallery({
		view: view,
		source: {
		query: {
		title: '"World Basemaps for Developers" AND owner:esri'
			  }
			}
	});
	view.ui.add(basemapGallery, "top-right"); // Add to the view
	
	const locate = new Locate({
		view: view,
		useHeadingEnabled: false,
		goToOverride: function(view, options) {
		options.target.scale = 1500;
		return view.goTo(options.target);
		}
	});
	view.ui.add(locate, "top-left");   
	
	const track = new Track({
		view: view,
		graphic: new Graphic({
		symbol: {
		type: "simple-marker",
		size: "12px",
		color: "green",
		outline: {
		color: "#efefef",
		width: "1.5px"
				}
			}
		}),
		useHeadingEnabled: false
	});
	view.ui.add(track, "top-left");
	
	const graphicsLayer = new GraphicsLayer();
	map.add(graphicsLayer);
	
	const point = { //Create a point
		type: "point",
		longitude: -118.80657463861,
		latitude: 34.0005930608889
	 };
	const simpleMarkerSymbol = {
		type: "simple-marker",
		color: [226, 119, 40],  // Orange
		outline: {
			color: [255, 255, 255], // White
			width: 1
		}
	 };
	const pointGraphic = new Graphic({
		geometry: point,
		symbol: simpleMarkerSymbol
	});
	graphicsLayer.add(pointGraphic);
		 // Create a line geometry
	const polyline = {
		  type: "polyline",
		  paths: [
			  [-118.821527826096, 34.0139576938577], //Longitude, latitude
			  [-118.814893761649, 34.0080602407843], //Longitude, latitude
			  [-118.808878330345, 34.0016642996246]  //Longitude, latitude
		  ]
	   };
	const simpleLineSymbol = {
		  type: "simple-line",
		  color: [26, 119, 40], // Orange
		  width: 2
	   };
	const polylineGraphic = new Graphic({
		   geometry: polyline,
		   symbol: simpleLineSymbol
		});
	graphicsLayer.add(polylineGraphic);
	
	// Create a polygon geometry
	const polygon = {
		type: "polygon",
		rings: [
				[-118.818984489994, 34.0137559967283], //Longitude, latitude
				[-118.806796597377, 34.0215816298725], //Longitude, latitude
				[-118.791432890735, 34.0163883241613], //Longitude, latitude
				[-118.79596686535, 34.008564864635],   //Longitude, latitude
				[-118.808558110679, 34.0035027131376]  //Longitude, latitude
			]
	};				
	const simpleFillSymbol = {
		type: "simple-fill",
		color: [227, 139, 79, 0.8],  // Orange, opacity 80%
		outline: {
			color: [255, 255, 255],
			width: 1
		}
	 };
	 const popupTemplate = {
			  title: "{Name}",
			  content: "{Description}"
	 }
	 const attributes = {
			  Name: "Graphic",
			  Description: "I am a polygon"
	 }
	const polygonGraphic = new Graphic({
		 geometry: polygon,
		 symbol: simpleFillSymbol,
		 attributes: attributes,
		 popupTemplate: popupTemplate

	});
	graphicsLayer.add(polygonGraphic);
	
});
