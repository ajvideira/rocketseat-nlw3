import React from 'react';
import {FiPlus} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import {Map, TileLayer} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import imgMarkerMap from '../images/marker-map.svg';

import '../styles/pages/OrphanagesMap.css';

function OrphanagesMap() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={imgMarkerMap} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>Porto Alegre</strong>
                    <span>Rio Grande do Sul</span>
                </footer>
            </aside>
            <Map 
                center={[-30.0454033,-51.2133332]} 
                zoom={15}
                style={{
                    width: '100%', height: '100%'
                }}>
                {/*<TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />*/}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
            </Map>
            <Link to="#" className="add-orphanage">
                <FiPlus size="34" color="white" />
            </Link>
        </div>
    );
}

export default OrphanagesMap;