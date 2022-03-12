import type * as L from 'leaflet';
import {createMap} from './map.js';
import {createMarker} from './marker.js';
import {createPopup} from './popup.js';

declare global {
    var map : L.Map;
} 
globalThis.map = createMap();

let map = globalThis.map;

let townDataRequest = new XMLHttpRequest();
townDataRequest.onreadystatechange = handleTownDataRequest;
townDataRequest.open("GET", "towns.json", false);
townDataRequest.setRequestHeader("Content-Type", "application/json");
townDataRequest.send(null);

function handleTownDataRequest() : void{
    if(townDataRequest.readyState === XMLHttpRequest.DONE){
        switch(townDataRequest.status){
            case 500: break;
            case 404: break;
            case 200:
                let townData = JSON.parse(townDataRequest.responseText);
                populateMapMarkers(townData);
                break;
        }
    }
}

function populateMapMarkers(townData:any) : void {
    for (const town of townData) {
        let marker = createMarker(town.name, town.coordinates, map);
        //create a popup with or without description depending on whether it exists or not
        if(town.description === undefined){
            createPopup(marker, "<h3>" + town.name + "</h3>");
            continue;
        }
        createPopup(marker, "<h3>" + town.name + "</h3>" + town.description);
    }
}


map.on('click', addLocationToJson)

function addLocationToJson(e: L.LeafletMouseEvent) : void{
    console.log(e.latlng.lat, e.latlng.lng);   
}