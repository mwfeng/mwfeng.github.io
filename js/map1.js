require([
	"esri/config",
	"esri/Map",
	"esri/views/MapView",
	"esri/widgets/Locate",
	"esri/widgets/Track",
	"esri/Graphic",
	"esri/layers/GraphicsLayer",
	"esri/layers/FeatureLayer",
	"esri/layers/TileLayer",
	"esri/tasks/QueryTask",
	"esri/tasks/support/Query"
], function (
	esriConfig,
	Map,
	MapView,
	Locate,
	Track,
	Graphic,
	GraphicsLayer,
	FeatureLayer,
	TileLayer,
	QueryTask,
	Query
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
	const map2 = new Map({
		basemap: "arcgis-imagery"
	})
	const view2 = new MapView({
		map: map2,
		center: [110, 34.207],
		zoom: 3,
		container: "viewDiv2"
	});

	//联动
	// view.on(["click"],function (evt) {
	// 	map.basemap = map2.basemap		
	// })
	view.on(["pointer-down","pointer-move", "mouse-wheel"], function (evt) {		
		var viewdiv = document.getElementById("viewDiv");
		var width = viewdiv.offsetWidth;
		var left = view.toMap({x:0,y:0});
        var right = view.toMap({x:width,y:0});
		var g = right.longitude -left.longitude; 
		view2.scale = view.scale;
		lon2 = view.center.longitude + g;
		lat2 = view.center.latitude;
        center2 =[lon2,lat2];
		view2.center = center2;
	});
	view2.on(["pointer-down", "pointer-move", "mouse-wheel"], function (evt) {
		view.center = view2.center;
		view.scale = view2.scale;
	});

	//底图切换
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
	document.getElementById("bmap11").addEventListener("click", function () {
		map2.basemap = "arcgis-streets-night";
	});
	document.getElementById("bmap22").addEventListener("click", function () {
		map2.basemap = "streets";
	});
	document.getElementById("bmap33").addEventListener("click", function () {
		map2.basemap = "osm-standard";
	});
	document.getElementById("bmap44").addEventListener("click", function () {
		map2.basemap = "arcgis-imagery";
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

	const graphicsLayer = new GraphicsLayer({
		title: "Polygon",
	});
	map.add(graphicsLayer);
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
	//专题图显示、隐藏与删除
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
	const Layer5 = new FeatureLayer({
		title: "CHN_Boundaries",
		url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/CHN_Boundaries_2020/FeatureServer/3",
		popupTemplate: {
			title: "{NAME}",
			content: "population:{TOTPOP_CY}<br/>ID: {ID}"			
		  }
	});
	//图层显示、隐藏与删除———————————————————————————————————————————————————————————————————————————————————————
	var num = document.getElementById("num");
	var num1 = document.createElement("div");
	num.appendChild(num1);
	// Listen for any layer being added or removed in the Map
	view.map.allLayers.on("change", function (event) {
		var n = event.target.length - 2;
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
			// var p = Layer5.createPopupTemplate();
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
	view2.on(["pointer-down", "pointer-move"], function (evt) {
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
	view2.on(["pointer-down", "mouse-wheel", "pointer-move"], function (evt) {
		var scale = view.scale.toFixed(0);
		scalee.innerHTML = "比例尺：" + "1:" + scale;
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

	// document.getElementById("div1").addEventListener("click", function () {
		// map.add(Layer2);
		// var divone = document.getElementById("div1");
		// var xmin = divone.offsetLeft;
		// var ymin = divone.offsetHeight;
		// var xmax = xmin + divone.offsetWidth;
		// var ymax = ymin + divone.offsetHeight;
		// console.log(String(xmax));
		// var viewdiv = document.getElementById("viewDiv");
		// var wxmin = viewdiv.offsetLeft;
		// var wymin = viewdiv.offsetHeight;
		// var wxmax = wxmin + viewdiv.offsetWidth;
		// var wymax = wymin + viewdiv.offsetHeight;
		// console.log(String(wxmax));
	// });
	//浮动DIV————————————————————————————————————————————————————————————————————————————————
	// window.onload = function () {
	// 	var disX = disY = 0;                         // 鼠标距离div的左距离和上距离
	// 	var div1 = document.getElementById("div1");  // 得到div1对象

	// 	// 鼠标按下div1时
	// 	div1.onmousedown = function (e) {
	// 		var evnt = e || event;                   // 得到鼠标事件
	// 		disX = evnt.clientX - div1.offsetLeft;   // 鼠标横坐标 - div1的left
	// 		disY = evnt.clientY - div1.offsetTop;    // 鼠标纵坐标 - div1的top

	// 		// 鼠标移动时
	// 		document.onmousemove = function (e) {
	// 			var evnt = e || event;
	// 			var x = evnt.clientX - disX;
	// 			var y = evnt.clientY - disY;
	// 			var window_width = document.documentElement.clientWidth - div1.offsetWidth;
	// 			var window_height = document.documentElement.clientHeight - div1.offsetHeight;

	// 			x = (x < 0) ? 0 : x;                          // 当div1到窗口最左边时
	// 			x = (x > window_width * 0.41 - 100) ? window_width * 0.41 : x;    // 当div1到窗口最右边时
	// 			y = (y < 0) ? 0 : y;                          // 当div1到窗口最上边时
	// 			y = (y > window_height) ? window_height : y;  // 当div1到窗口最下边时

	// 			div1.style.left = x + "px";
	// 			div1.style.top = y + "px";
	// 		};

	// 		// 鼠标抬起时
	// 		document.onmouseup = function () {
	// 			document.onmousemove = null;
	// 			document.onmouup = null;
	// 		};

	// 		return false;
	// 	};
	// };
});
