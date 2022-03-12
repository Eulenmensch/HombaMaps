import type * as L from 'leaflet';

export function createPopup(marker: L.Marker, content: string) : void{
    marker.bindPopup(content);
}