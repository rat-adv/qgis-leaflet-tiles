import {lessonsRunInterface} from "../model/lesson-run-interface";
import {injectable} from "tsyringe";
import proj4 from "proj4";

// const myHttps: Array<string> = [
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=2504688.5428486555,6418264.391049678,2661231.576776697,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=2504688.5428486555,6731350.458905762,2661231.576776697,6887893.492833805',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=2504688.5428486555,6418264.391049678,2661231.576776697,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=2504688.5428486555,6418264.391049678,2661231.576776697,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=2504688.5428486555,6418264.391049678,2661231.576776697,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=2504688.5428486555,6418264.391049678,2661231.576776697,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=2504688.5428486555,6418264.391049678,2661231.576776697,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=2504688.5428486555,6418264.391049678,2661231.576776697,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=1878516.407136492,6418264.391049678,2035059.441064533,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=2504688.5428486555,6418264.391049678,2661231.576776697,6574807.424977722',
//   'https://qgis-server.rat-adv.com/ows/qgis_mapserv.fcgi?map=/data/qwc_demo.qgs&SERVICE=WMS&REQUEST=GetMap&LAYERS=rats_lasy_cache_pan&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX=2504688.5428486555,6418264.391049678,2661231.576776697,6574807.424977722',
// ]

@injectable()
export class FetchMapService implements lessonsRunInterface {

  run(): void {
    console.log(this.calculateTiles())
  }

  calculateTiles() {
      // Definiuje granice geograficzne Polski jako tablicę [minLon, minLat, maxLon, maxLat] w układzie współrzędnych EPSG:4326
      const bbox = [14.07, 49.00, 24.15, 54.85];

      // Określa poziom zoom
      const zoom = 6;

      // Określa rozmiar kafelka w pikselach
      const tileSize = 256;

      // Zdefiniuj obiekty projekcji dla EPSG:4326 i EPSG:3857
      // @ts-ignore
      const proj4326 = new proj4.Proj('+proj=longlat +datum=WGS84 +no_defs');
      // @ts-ignore
      const proj3857 = new proj4.Proj('+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs');

      // Definiuje funkcję do konwersji stopni na radiany
      const deg2rad = (deg: number) => deg * Math.PI / 180;

      // Definiuje funkcję konwertującą współrzędne kafelka z numeracji x, y na EPSG:3857
      const tile2proj = (x: number, y: number, z: number) => {
        // Oblicza rozdzielczość na danym poziomie zoom
        const resolution = 2 * Math.PI * 6378137 / tileSize / Math.pow(2, z);

        // Oblicza położenie początkowe kafelka
        const origin = -2 * Math.PI * 6378137 / 2.0;

        // Oblicza minx, miny, maxx, maxy obszaru kafelka
        const minx = origin + x * tileSize * resolution;
        const miny = origin + y * tileSize * resolution;
        const maxx = origin + (x + 1) * tileSize * resolution;
        const maxy = origin + (y + 1) * tileSize * resolution;

        // Zwraca obszar kafelka w EPSG:3857
        return [minx, miny, maxx, maxy];
      };

      const point2tile = (lon: number, lat: number, z: number) => {
        // Przekonwertuj koordynaty narożnika kafelka z EPSG:4326 na EPSG:3857
        const p = proj4.transform(proj4326, proj3857, [lon, lat]);

        // Oblicza rozdzielczość na danym poziomie zoom
        const resolution = 2 * Math.PI * 6378137 / tileSize / Math.pow(2, z);

        // Oblicza położenie początkowe kafelka
        const origin = -2 * Math.PI * 6378137 / 2.0;

        // Oblicz pierwszy i ostatni kafelek z zakresu kafelków mieszczących się na wylicznym obszarze
        const x = Math.floor((p.x - origin) / resolution / tileSize);
        const y = Math.floor((p.y - origin) / resolution / tileSize);

        console.log([x, y])
        // Zwróć pierwszy i ostatni kafelek
        return [x, y];
      };

      // Deklaracja arraya do przechowywania koordynatów kafelków w formacie EPSG:3857
      const tileExtents: number[][] = [];
      // Podziel granice polski na pojedyncze narożniki
      const [minLon, minLat, maxLon, maxLat] = bbox;
      // Wylicz górny lewy róg
      const [minX, minY] = point2tile(minLon, minLat, zoom);
      // Wylicz dolny prawy róg
      const [maxX, maxY] = point2tile(maxLon, maxLat, zoom);

      // Przeinteruj przez wszystkie kafelki z zakresu x i y, wylicz bbox dla każdego kafelka i zapisz w arrayu
      for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
          const tileExtent = tile2proj(x, y, zoom);
          tileExtents.push(tileExtent);
        }
      }

      // Zwraca koordynaty kafelków w formacie EPSG:3857
      return tileExtents
    }

  // // wykonaj cache na serwerze
  // run(): void {
  //   let count = 0;
  //   of(...myHttps2).pipe(
  //     bufferCount(16),
  //     map(item => ({data: item, count: count++})),
  //     concatMap(part => {
  //       console.log('run part:', part.count);
  //       return forkJoin([of(part.count), ...this.getBufferedFileFromNet(part.data)])
  //     })
  //   ).subscribe(([count]) => {
  //     console.log('processed part:', count);
  //   });
  // }
  //
  // getBufferedFileFromNet(urls: Array<string>): Array<Observable<any>> {
  //   return urls.map(url => fromPromise(axios({
  //     method: "get",
  //     responseType: 'arraybuffer',
  //     url: url,
  //   })))
  // }
}