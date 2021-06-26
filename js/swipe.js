require([
	"esri/config",
	"esri/Map",
	"esri/views/MapView",
	"esri/Graphic",
	"esri/layers/FeatureLayer",
	"esri/layers/TileLayer",
	"esri/tasks/QueryTask",
	"esri/tasks/support/Query",
	"esri/portal/PortalItem",
	"esri/layers/MapImageLayer",
	"esri/layers/CSVLayer",
	"esri/layers/Layer"
], function (
	esriConfig,
	Map,
	MapView,
	Graphic,
	FeatureLayer,
	TileLayer,
	QueryTask,
	Query,
	PortalItem,
	MapImageLayer,
	CSVLayer,
	Layer
) {
	esriConfig.apiKey = "AAPK5067984744a84d2384da027ddfa80ce8RZonR4G8lDlC88I5gs7vJBrdh-u6flR0MqOQHsgL3rzjjr7dtVU4638ZtVDz9DA1";
	const map = new Map({
		basemap: "osm-standard"
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
	view.on(["pointer-down", "pointer-move", "mouse-wheel"], function (evt) {
		view2.center = view.center;
		view2.scale = view.scale
	});
	view2.on(["pointer-down", "pointer-move", "mouse-wheel"], function (evt) {
		view.center = view2.center;
		view.scale = view2.scale;
	});

	let layer = new FeatureLayer
	({
		portalItem: {  // autocasts as esri/portal/PortalItem
			id: "ce7b243749604c7798da6a3ac9e75ee1"
		}
	});
	map.add(layer);

	// Layer.fromPortalItem({
	// 	portalItem: {
	// 		id: "25fc53ec333f43cfaab773ba0338dbf5",
	
	// 	}
	// }).then(function (layer) {
	// 	map.add(layer);
	// });



	window.onload = function () {
		var disX = disY = 0;                         // 鼠标距离div的左距离和上距离
		var div1 = document.getElementById("div1");  // 得到div1对象

		// 鼠标按下div1时
		div1.onmousedown = function (e) {
			var evnt = e || event;                   // 得到鼠标事件
			disX = evnt.clientX - div1.offsetLeft;   // 鼠标横坐标 - div1的left
			disY = evnt.clientY - div1.offsetTop;    // 鼠标纵坐标 - div1的top

			// 鼠标移动时
			document.onmousemove = function (e) {
				var evnt = e || event;
				var x = evnt.clientX - disX;
				var y = evnt.clientY - disY;
				var window_width = document.documentElement.clientWidth - div1.offsetWidth;
				var window_height = document.documentElement.clientHeight - div1.offsetHeight;

				x = (x < 0) ? 0 : x;                          // 当div1到窗口最左边时
				x = (x > window_width * 1 - 100) ? window_width * 1 : x;    // 当div1到窗口最右边时
				y = (y < 0) ? 0 : y;                          // 当div1到窗口最上边时
				y = (y > window_height) ? window_height : y;  // 当div1到窗口最下边时

				div1.style.left = x + "px";
				div1.style.top = y + "px";
			};

			// 鼠标抬起时
			document.onmouseup = function () {
				document.onmousemove = null;
				document.onmouup = null;
			};

			return false;
		};
	};
})
function Swipe() {
	var divone = document.getElementById("div1");//移动框
	var left = divone.offsetLeft;
	var width1 = divone.offsetWidth;

	var middle = left + width1;
	// var middle = event.clientX;
	document.getElementById("viewDiv2").style.clip = "rect(0px," + middle + "px,768px,0px)";
	document.getElementById("viewDiv").style.clip = "rect(0px, 1555px,768px," + middle + "px)";
}