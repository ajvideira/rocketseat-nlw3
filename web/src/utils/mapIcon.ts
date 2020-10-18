import LeafLet from 'leaflet';

import imgMarkerMap from '../images/marker-map.svg';

const mapIcon = LeafLet.icon({
    iconUrl: imgMarkerMap,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
});

export default mapIcon;