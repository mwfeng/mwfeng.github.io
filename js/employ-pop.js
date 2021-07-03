require([
	"esri/config",
	"esri/Map",
	"esri/views/MapView",
	"esri/widgets/Locate",
	"esri/widgets/Track",
	"esri/Graphic",
	"esri/layers/FeatureLayer",
	"esri/widgets/Search",

], function (
	esriConfig,
	Map,
	MapView,
	Locate,
	Track,
	Graphic,
	FeatureLayer,
	Search,

) {
	esriConfig.apiKey = "AAPK5067984744a84d2384da027ddfa80ce8RZonR4G8lDlC88I5gs7vJBrdh-u6flR0MqOQHsgL3rzjjr7dtVU4638ZtVDz9DA1";
	const map = new Map({
		basemap: "dark-gray-vector"
	})
	const map2 = new Map({
		basemap: "dark-gray-vector"
	})
	const view = new MapView({
		map: map,
		center: [110, 34.207],
		zoom: 3,
		container: "viewDiv"
	});
	// const Webmap = new WebMap({
	// 	portalItem: {  
	// 		id: "104c320d7d4e46d89350a672da89b657"
	// 	}
	// });
	const view2 = new MapView({
		map: map2,
		center: [110, 34.207],
		zoom: 3,
		container: "viewDiv2"
	});
	//底图切换--------------------------------------------------------------------------------
	document.getElementById("bmap1").addEventListener("click", function () {
		map.basemap = "arcgis-streets-night";
		map2.basemap = "arcgis-streets-night";
	});
	document.getElementById("bmap4").addEventListener("click", function () {
		map.basemap = "arcgis-nova";
		map2.basemap = "arcgis-nova";
	});
	const locate = new Locate({
		view: view,
		useHeadingEnabled: false,
		goToOverride: function (view, options) {
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
	// var search = new Search({
	// 	view: view
	// });
	// view.ui.add(search, "top-right");
	//专题图显示、隐藏与删除-------------------------------------------------------------------------------------------------


	const Layer5 = new FeatureLayer({
		title: "pop2010",
		portalItem: {  // autocasts as esri/portal/PortalItem
			id: "a32f577a36ed448fa0e47a3e5a1ba66b"
		}
	});

	const Layer4 = new FeatureLayer({
		portalItem: {  
			id: "6defee646f6e4aee8b712e029fd8f42c"
		}
	});
	const Layer2 = new FeatureLayer({
		portalItem: {  
			id: "ebb461bab64b475091c3fa520425ee8a"
		}
	});

	const Layer6 = new FeatureLayer({
		portalItem: {  // autocasts as esri/portal/PortalItem
			id: "13ed893ae1b540138986c74c7b82f5c3"
		}
	});

	const Layer7 = new FeatureLayer({
		portalItem: {  
			id: "d35bd486e57c4f189f2840dddcb8ab80"
		}
	});
	const Layer8 = new FeatureLayer({
		portalItem: {  
			id: "194936c7046944bf9c8af5c04a5c797c"
		}
	});

	//图层显示、隐藏与删除———————————————————————————————————————————————————————————————————————————————————————
	var checkbox6 = this.document.getElementById('m6');
	checkbox6.onclick = (function () {
		if (checkbox6.checked) {
			map2.add(Layer6);
		}
		else {
			view2.map.remove(Layer6);
		}
	});
	
	var checkbox7 = this.document.getElementById('m7');
	checkbox7.onclick = (function () {
		if (checkbox7.checked) {
			map2.add(Layer7);
		}
		else {
			view2.map.remove(Layer7);
		}
	});

	var checkbox8 = this.document.getElementById('m8');
	checkbox8.onclick = (function () {
		if (checkbox8.checked) {
			map2.add(Layer8);
		}
		else {
			view2.map.remove(Layer8);
		}
	});

	var checkbox3 = this.document.getElementById('imagery');
	checkbox3.onclick = (function () {
		if (checkbox3.checked) {
			map.add(Layer2);
		}
		else {
			view.map.remove(Layer2);
		}
	});
	
	var checkbox2 = this.document.getElementById('city');
	checkbox2.onclick = (function () {
		if (checkbox2.checked) {
			map.add(Layer4);
		}
		else {
			view.map.remove(Layer4);
		}
	});

	var checkbox4 = this.document.getElementById('china_B');
	checkbox4.onclick = (function () {
		if (checkbox4.checked) {
			map.add(Layer5);
		}
		else {
			view.map.remove(Layer5);
		}
	});
	
	//经纬度值
	var farther = document.getElementById("JWD");
	function JWD(pt) {
		var coords = "经纬度：" + pt.longitude.toFixed(2) + "," + pt.latitude.toFixed(2);
		farther.innerHTML = coords;
	}
	view.on(["pointer-down", "pointer-move"], function (evt) {
		JWD(view.toMap({ x: evt.x, y: evt.y }));
	});
	//比例尺
	var scale = document.getElementById("scale");
	var scalee = document.createElement("div");
	scale.appendChild(scalee);
	view.on(["pointer-down", "mouse-wheel", "pointer-move"], function (evt) {
		var scale = view.scale.toFixed(0);
		scalee.innerHTML = "比例尺：" + "1:" + scale;
	});
	const searchWidget2 = new Search({
		view: view2,
		allPlaceholder: "District or Senator",
		includeDefaultSources: false,
		sources: [

			{
				layer: Layer7,
				searchFields: ["NAME_1"],
				displayField: "NAME_1",
				exactMatch: false,
				outFields: ["NAME_1"],
				name: "教育程度",
				placeholder: "受教育程度，例如: 北京"
			},


		]
	});

	// Add the search widget to the top left corner of the view
	view2.ui.add(searchWidget2, {
		position: "top-right"
	});
	const searchWidget = new Search({
		view: view,
		allPlaceholder: "District or Senator",
		includeDefaultSources: false,
		sources: [
			{
				layer: Layer2,
				searchFields: ["employ_NAME"],
				displayField: "employ_NAME",
				exactMatch: false,
				outFields: ["employ_NAME"],
				name: "就业人口分布",
				placeholder: "例如: 北京"
			},

		]
	});

	// Add the search widget to the top left corner of the view
	view.ui.add(searchWidget, {
		position: "top-right"
	});
	
})
