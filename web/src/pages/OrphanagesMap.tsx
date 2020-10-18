import React, { useEffect, useState } from 'react';
import {FiArrowRight, FiPlus} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

import imgMarkerMap from '../images/marker-map.svg';

import '../styles/pages/OrphanagesMap.css';

import mapIcon from '../utils/mapIcon';

import api from '../services/api';

interface Orphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

export default function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    console.log(orphanages);
    useEffect(()=>{
        api.get('/orphanages').then((response)=>{
            setOrphanages(response.data);
        });
    },[]);

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
                center={[-30.0453207,-51.2128707]} 
                zoom={15}
                style={{
                    width: '100%', height: '100%'
                }}>
                {/*<TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />*/}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>

                {
                    orphanages.map(orphanage => {
                        return (
                            <Marker 
                                key={orphanage.id}
                                position={[orphanage.latitude,orphanage.longitude]}
                                icon={mapIcon}>
                                <Popup closeButton={false} minWidth={240} maxWidth={240}  className="map-popup">
                                    {orphanage.name}
                                    <Link to={`/orphanages/${orphanage.id}`}>
                                        <FiArrowRight size={20} color="#FFF" />
                                    </Link>
                                </Popup>
                            </Marker>
                        );
                    })
                }
                
            </Map>
            <Link to="/orphanages/create" className="add-orphanage">
                <FiPlus size="34" color="white" />
            </Link>
        </div>
    );
}