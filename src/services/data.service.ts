import {injectable} from "tsyringe";

@injectable()
export class DataService {
    getData(): Array<string> {
        return [
            'https://qgis-server.rat-adv.com:8443/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=roadsPublicProvince&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WMSNAME=roadsPublicProvince&GRAPHICELEMENT=%5Bobject%20Object%5D&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=2387281.2674026247,6966165.009797822,2426417.0258846353,7005300.768279835',
            'https://qgis-server.rat-adv.com:8443/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=roadsPublicProvince&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WMSNAME=roadsPublicProvince&GRAPHICELEMENT=%5Bobject%20Object%5D&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=2348145.508920615,7044436.526761846,2387281.2674026247,7083572.285243856', '\n' +
            'https://qgis-server.rat-adv.com:8443/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=roadsPublicProvince&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WMSNAME=roadsPublicProvince&GRAPHICELEMENT=%5Bobject%20Object%5D&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=2309009.7504386045,7044436.526761846,2348145.508920615,7083572.285243856'
        ]
    }
}