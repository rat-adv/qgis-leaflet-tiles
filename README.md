# qgis-leaflet-tiles
The purpose of the application is to generate a cache for the qgis wms server. Access to the server may be covered by the cache function. Thanks to this application that generates requests to such a server, the cache in front of the qgis server can save these requests.
This allows for less load on the qgis wms server


Most important places in code in leaflet component

LL start tiles from this point:

https://github.com/Leaflet/Leaflet/blob/c5334d7728cf2652ae1354548269a458f8e96d32/src/layer/tile/GridLayer.js#L652
_update(center)...

In this location, LL build URL link
https://github.com/Leaflet/Leaflet/blob/c5334d7728cf2652ae1354548269a458f8e96d32/src/layer/tile/TileLayer.WMS.js#L102
getTileUrl(coords)...

Bbox finder:
http://bboxfinder.com/#0.000000,0.000000,0.000000,0.000000
enable grid, lowest button on left toolbar