import * as L from 'leaflet';

let placeIcon = L.icon({
    iconUrl: 'Marker.svg',
    iconSize: [30,60],
    iconAnchor: [15,60],
    popupAnchor: [-2, -55]
})

export function createMarker(location: [number, number], map: L.Map) : L.Marker{
    let marker = L.marker(location, {icon: placeIcon}).addTo(map);
    return marker;
}