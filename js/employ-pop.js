require([
	"esri/config",
	"esri/Map",
	"esri/views/MapView",
	"esri/widgets/Locate",
	"esri/widgets/Track",
	"esri/Graphic",
	"esri/layers/FeatureLayer",
	"esri/layers/TileLayer",
	"esri/tasks/QueryTask",
	"esri/tasks/support/Query",
	"esri/portal/PortalItem",
	"esri/layers/MapImageLayer"

], function (
	esriConfig,
	Map,
	MapView,
	Locate,
	Track,
	Graphic,
	FeatureLayer,
	TileLayer,
	QueryTask,
	Query,
	PortalItem,
	MapImageLayer
) {
	esriConfig.apiKey = "AAPK5067984744a84d2384da027ddfa80ce8RZonR4G8lDlC88I5gs7vJBrdh-u6flR0MqOQHsgL3rzjjr7dtVU4638ZtVDz9DA1";
	const map = new Map({
		basemap: "streets"
	})
	const view = new MapView({
		map: map,
		center: [110, 34.207],
		zoom: 3,
		container: "viewDiv"
	});

	//底图切换--------------------------------------------------------------------------------
	document.getElementById("bmap1").addEventListener("click", function () {
		map.basemap = "arcgis-streets-night";
	});
	document.getElementById("bmap2").addEventListener("click", function () {
		map.basemap = "streets";
	});
	document.getElementById("bmap3").addEventListener("click", function () {
		map.basemap = "osm-standard";
	});
	document.getElementById("bmap4").addEventListener("click", function () {
		map.basemap = "arcgis-nova";
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

	//专题图显示、隐藏与删除-------------------------------------------------------------------------------------------------
	const Layer1 = new FeatureLayer({
		title: "Military",
		url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Military/FeatureServer"
	});
	const Layer2 = new TileLayer({
		title: "World_Imagery",
		url: "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer"
	});
	const Layer3 = new FeatureLayer({
		title: "Earthquakes_Since1970",
		url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Earthquakes_Since1970/MapServer"
	});
	const Layer4 = new FeatureLayer({
		title: "SampleWorldCities",
		url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/SampleWorldCities/MapServer"
	});
	let Layer5 = new FeatureLayer
	({
		portalItem: {  // autocasts as esri/portal/PortalItem
			id: "a32f577a36ed448fa0e47a3e5a1ba66b"
		}
	});

	//图层显示、隐藏与删除———————————————————————————————————————————————————————————————————————————————————————
	var num = document.getElementById("num");
	var num1 = document.createElement("div");
	num.appendChild(num1);
	// Listen for any layer being added or removed in the Map
	view.map.allLayers.on("change", function (event) {
		var n = event.target.length-1;
		num1.innerHTML = "Visible number: " + n;
	});

	var checkbox1 = this.document.getElementById('Earthquakes');
	checkbox1.onclick = (function () {
		if (checkbox1.checked) {
			map.add(Layer3);
		}
		else {
			view.map.remove(Layer3);
		}
	});
	document.getElementById("button1").addEventListener("click", function () {
		if (confirm("确定要删除吗？")) {
			var div = document.getElementById("Earthquakes");
			var div2 = document.getElementById("earthquake2");
			var div3 = document.getElementById("button1");
			div.remove();
			div2.remove();
			div3.remove();
			view.map.remove(Layer3);
		} else {
			null;
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
	document.getElementById("button3").addEventListener("click", function () {
		if (confirm("确定要删除吗？")) {
			var div = document.getElementById("imagery");
			var div2 = document.getElementById("imagery2");
			var div3 = document.getElementById("button3");
			div.remove();
			div2.remove();
			div3.remove();
			view.map.remove(Layer2);
		} else {
			null;
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
	document.getElementById("button2").addEventListener("click", function () {
		if (confirm("确定要删除吗？")) {
			var div = document.getElementById("city");
			var div2 = document.getElementById("city2");
			var div3 = document.getElementById("button2");
			div.remove();
			div2.remove();
			div3.remove();
			view.map.remove(Layer4);
		} else {
			null;
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
	document.getElementById("button4").addEventListener("click", function () {
		if (confirm("确定要删除吗？")) {
			var div = document.getElementById("china_B");
			var div2 = document.getElementById("china_B2");
			var div3 = document.getElementById("button4");
			div.remove();
			div2.remove();
			div3.remove();
			view.map.remove(Layer5);
		} else {
			null;
		}
	});
	//经纬度值
	var farther = document.getElementById("JWD");
	var coord = document.createElement("div");
	farther.appendChild(coord);
	function JWD(pt) {
		var coords = "经纬度：" + pt.longitude.toFixed(2) + "," + pt.latitude.toFixed(2);
		coord.innerHTML = coords;
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

})
