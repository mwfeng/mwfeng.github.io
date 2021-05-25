require([
	"esri/config",
	"esri/Map",
	"esri/views/MapView"
], function (
	esriConfig,
	Map,
	MapView
) {
	esriConfig.apiKey = "AAPK5067984744a84d2384da027ddfa80ce8RZonR4G8lDlC88I5gs7vJBrdh-u6flR0MqOQHsgL3rzjjr7dtVU4638ZtVDz9DA1";
	const map = new Map({
		basemap: "arcgis-navigation"
	})
	map.basemap = "topo-vector";
	
    const view = new MapView({
		map: map,
		center: [118.805, 34.207],
		zoom: 4,
		container: "column viewDiv"

	});
    const map2 = new Map({
		basemap: "arcgis-navigation"
	})
	map2.basemap = "topo-vector";
	
    const view2 = new MapView({
		map: map,
		center: [118.805, 34.207],
		zoom: 4,
		container: "column viewDiv2"

	});
	view01.on(["pointer-down","pointer-move"], function(evt) {
        LinkMap02();
      });
      
      function LinkMap02() {
      	view02.zoom=view01.zoom;
      	view02.center=view01.center;
      }
      
      view02.on(["pointer-down","pointer-move"], function(evt) {
        LinkMap01();
      });
      
      function LinkMap01() {
      	view01.zoom=view02.zoom;
      	view01.center=view02.center;
    }
});
