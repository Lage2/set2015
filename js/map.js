//$(document).onLoad(function(){

	console.log("[map.js]: loading OpenStreetMap maps...");

	// create a map in the "map" div, set the view to a given place and zoom
	var map = L.map('map', {scrollWheelZoom:false}).setView([38.7425995, -9.3019505], 13);

	// add an OpenStreetMap tile layer
	L.tileLayer(
	    'http://{s}.tile.osm.org/{z}/{x}/{y}.png', 
	    {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

	// add a marker in the given location, attach some popup content to it and open the popup
	L.marker([38.7425995, -9.3019505]).addTo(map)
	    .openPopup();
//});