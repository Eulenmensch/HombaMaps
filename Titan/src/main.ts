import './style.css'

import * as L from 'leaflet';
import {createMap} from './map.js';
import {createMarker} from './marker.js';
import {createPopup} from './popup.js';

declare global {
    var map : L.Map;
} 
globalThis.map = createMap();

let map = globalThis.map;

//#region Populate Markers with Fetch
const Url='/get-towns/';
const params = {
    headers:{
        "content-type":"application/json; charset=UTF-8"
    },
    method:"GET"
}

fetch(Url, params)
    .then(response => response.json())
    .then(data => populateMapMarkers(data));

function populateMapMarkers(townData:any) : void {
    for (const town of townData) {
        let marker = createMarker(town.coordinates, map);
        //create a popup with or without description depending on whether it exists or not
        if(town.description === undefined){
            createPopup(marker, "<h3>" + town.name + "</h3>");
            continue;
        }
        createPopup(marker, "<h3>" + town.name + "</h3>" + town.description);
    }
}
//#endregion

map.on('click', addLocationToJson)

function addLocationToJson(e: L.LeafletMouseEvent) : void{
    console.log(e.latlng.lat, e.latlng.lng);   
}

