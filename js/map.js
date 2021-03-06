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
	

	const map3 = new Map({
		basemap: "arcgis-imagery"
	})
	const view3 = new MapView({
		map: map3,
		center: [110, 34.207],
		zoom: 3,
		container: "viewDiv3"
	});
	const map4 = new Map({
		basemap: "arcgis-imagery"
	})
	const view4 = new MapView({
		map: map4,
		center: [110, 34.207],
		zoom: 3,
		container: "viewDiv4"
	});
	view.on(["pointer-down", "pointer-move", "mouse-wheel"], function (evt) {
		var viewdiv = document.getElementById("viewDiv");
		var width = viewdiv.offsetWidth;
		var left = view.toMap({ x: 0, y: 0 });
		var right = view.toMap({ x: width, y: 0 });
		var g = right.longitude - left.longitude;
		lon2 = view.center.longitude + g;
		lat2 = view.center.latitude;
		center2 = [lon2, lat2];
		// view2.center = center2;
	});
	view4.on(["pointer-down", "pointer-move", "mouse-wheel"], function (evt) {
		view.center = view4.center;
		view.scale = view4.scale;
		view3.center = view4.center;
		view3.scale = view4.scale;
		var viewdiv = document.getElementById("viewDiv");
		var width = viewdiv.offsetWidth;
		var left = view.toMap({ x: 0, y: 0 });
		var right = view.toMap({ x: width, y: 0 });
		var g = right.longitude - left.longitude;

		lon2 = view.center.longitude + g;
		lat2 = view.center.latitude;
		center2 = [lon2, lat2];
		// view2.center = center2;
	});
	
	document.getElementById("div1").addEventListener("dblclick", function () {
		var mm = map.basemap;
		map.basemap = map3.basemap;
		map3.basemap = mm;
	});
	//????????????--------------------------------------------------------------------------------
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

	



	//?????????????????????????????????-------------------------------------------------------------------------------------------------
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

	//???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
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
		if (confirm("?????????????????????")) {
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
		if (confirm("?????????????????????")) {
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
		if (confirm("?????????????????????")) {
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
		if (confirm("?????????????????????")) {
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
	//????????????
	var farther = document.getElementById("JWD");
	var coord = document.createElement("div");
	farther.appendChild(coord);
	function JWD(pt) {
		var coords = "????????????" + pt.longitude.toFixed(2) + "," + pt.latitude.toFixed(2);
		coord.innerHTML = coords;
	}
	view.on(["pointer-down", "pointer-move"], function (evt) {
		JWD(view.toMap({ x: evt.x, y: evt.y }));
	});
	view4.on(["pointer-down", "pointer-move"], function (evt) {
		JWD(view.toMap({ x: evt.x, y: evt.y }));
	});
	//?????????
	var scale = document.getElementById("scale");
	var scalee = document.createElement("div");
	scale.appendChild(scalee);
	view.on(["pointer-down", "mouse-wheel", "pointer-move"], function (evt) {
		var scale = view.scale.toFixed(0);
		scalee.innerHTML = "????????????" + "1:" + scale;
	});
	view4.on(["pointer-down", "mouse-wheel", "pointer-move"], function (evt) {
		var scale = view.scale.toFixed(0);
		scalee.innerHTML = "????????????" + "1:" + scale;
	});
	view3.on("pointer-move", function(event){
		var query = Layer5.createQuery();
		query.geometry = view.toMap(event);  // the point location of the pointer
		query.distance = 2;
		query.units = "miles";
		query.spatialRelationship = "intersects";  // this is the default
		query.returnGeometry = true;
		query.outFields = [ "POPULATION" ];
	  
		featureLayerView.queryFeatures(query)
		  .then(function(response){
			// returns a feature set with features containing the
			// POPULATION attribute and each feature's geometry
		  });
	  });
	// var queryURL = "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/CHN_Boundaries_2020/FeatureServer/3/?token=TOKmSIRV_iknR6yjQ-wg8dxkvetluLZk2Rk3fMpSSsACqohq_JFDZXdHoPML5-eNFteN-97fg7BjLpATlLtIbq1QgP6NH9h3QVwfXN5VcvHZmA_tonTCsThLo8DipRKzmCfDNFCaDT6x-OmeB4GbUZX5-jjkj7teotnB0p3Q3XqEK0TV6TP8AP2AYAY_017HTTS7M8IhtqzEyhy7la3oxJ_RPX-T-ZybB3hvPF2RsEMNCASGC8GQ00dlE8pzYlWHO4jajhiuTU2py4O54qRxVld98tpGpCjevDZF3qX_0ZxHNOApDfOb3Aeqxl5Q8zXQ"
	// var qt = new QueryTask({
	// 	url: queryURL
	// });
	// var q = new Query();
	// q.returnGeometry = true;
	// q.outFields = ["*"];
	// q.where = "NAME = 'Wuchang District'";
	// view.on("click", function (evt) {
	// 	qt.execute(q).then(function (result) {
	// 		console.log(result)
	// 		var g_wuchang = result.features[0];
	// 		g_wuchang.symbol = {
	// 			type: "simple-fill",  // autocasts as new SimpleFillSymbol()
	// 			color: [51, 51, 204, 0.1],
	// 			style: "solid",
	// 			outline: {  // autocasts as new SimpleLineSymbol()
	// 				color: "white",
	// 				width: 1
	// 			}
	// 		};
	// 		g_wuchang.popupTemplate = {
	// 			title: "{Name}",
	// 			content: "{Description}"
	// 		}
	// 		g_wuchang.attributes = {
	// 			Name: "Graphic",
	// 			Description: "Name"
	// 		}
	// 		view.graphics.add(g_wuchang);
	// 	})
	// })


	// ??????DIV????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
	window.onload = function () {
		var disX = disY = 0;                         // ????????????div????????????????????????
		var div1 = document.getElementById("div1");  // ??????div1??????

		// ????????????div1???
		div1.onmousedown = function (e) {
			var evnt = e || event;                   // ??????????????????
			disX = evnt.clientX - div1.offsetLeft;   // ??????????????? - div1???left
			disY = evnt.clientY - div1.offsetTop;    // ??????????????? - div1???top

			// ???????????????
			document.onmousemove = function (e) {
				var evnt = e || event;
				var x = evnt.clientX - disX;
				var y = evnt.clientY - disY;
				var window_width = document.documentElement.clientWidth - div1.offsetWidth;
				var window_height = document.documentElement.clientHeight - div1.offsetHeight;

				x = (x < 0) ? 0 : x;                          // ???div1?????????????????????
				x = (x > window_width * 1 - 100) ? window_width * 1 : x;    // ???div1?????????????????????
				y = (y < 0) ? 0 : y;                          // ???div1?????????????????????
				y = (y > window_height) ? window_height : y;  // ???div1?????????????????????

				div1.style.left = x + "px";
				div1.style.top = y + "px";
			};

			// ???????????????
			document.onmouseup = function () {
				document.onmousemove = null;
				document.onmouup = null;
			};

			return false;
		};
	};
	
})
function window2() 
{
	var divone = document.getElementById("div1");//?????????
	var left = divone.offsetLeft;
	var top = divone.offsetTop - 50 ;
	var width1 = divone.offsetWidth;
	var height1 = divone.offsetHeight;
	var right = left + width1;
	var bottom = top + height1;
	// console.log(top);	
	// console.log(right);
	// console.log(bottom);
	// console.log(left);
	document.getElementById("viewDiv3").style.clip = "rect(" + top +"px," + right +"px,"+ bottom + "px,"+ left + "px)";

}

