import * as L from 'leaflet'

export function createMap() : L.Map{
    let bounds = L.latLngBounds(L.latLng(-255,1), L.latLng(1,255));

    let map = L.map('map', {
        zoom: 1,
        zoomSnap: 0.1,
        center: [-128,128],
        crs: L.CRS.Simple,
        maxBounds: bounds
    });

    L.tileLayer('map/{z}/{x}/{y}.png', {
        minZoom: 1,
        maxZoom: 5,
        noWrap: true,
        bounds: bounds
    }).addTo(map);


    return map;
}