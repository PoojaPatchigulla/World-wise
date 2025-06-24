
import { useNavigate,useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
import { useMapEvents,MapContainer,TileLayer,Marker,Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import {useCities} from "../contexts/CitiesContext"
import { useMap } from 'react-leaflet';
import { useGeoLocation } from '../hooks/useGeolocation';
import useUrlPosition from '../hooks/useUrlPosition';
import Button from './Button'
import L from 'leaflet';  

const redMarkerIcon = L.divIcon({  
    className: 'red-marker',  
    html: `<svg height="40" width="20">  
             <circle cx="10" cy="30" r="8" fill="red" />  
           </svg>`,  
    iconSize: [20, 40],  
  });  

function Map() {
    const {cities} = useCities();
    
    const [mapPosition,setMapPosition] = useState([40,0])
    const {isLoading:isLoadingPosition, position:geoLocationPosition, getPosition} = useGeoLocation();  

    
    const [mapLat,mapLng] = useUrlPosition();
    useEffect(function(){
       if(mapLat&&mapLng){
        
        setMapPosition([mapLat,mapLng])
       }
       
    },[mapLat,mapLng])
    
    useEffect(function(){
        
      if(geoLocationPosition){
       
        setMapPosition([geoLocationPosition.lat,geoLocationPosition.lng])}
    },[geoLocationPosition])

    return (
        <div className={styles.mapContainer} >
            <Button type="position" onClick={getPosition}>
                {isLoadingPosition?'Loading...':'use you position'}
            </Button>
           <MapContainer className={styles.map} center={mapPosition} zoom={6} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    {cities.map((city,_)=>{
        return (
       <Marker key={_} position={[city.position.lat,city.position.lng]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
        )
    })}

    {
        geoLocationPosition&&<Marker icon={redMarkerIcon} position={[geoLocationPosition.lat,geoLocationPosition.lng]}>
        <Popup>
          your current position
        </Popup>
        </Marker>
    }
    <ChangeCenter position={mapPosition} />
    <DetectClick/>
  </MapContainer>
        </div>
    )
}

function ChangeCenter({position}){
    //console.log(position);
 const map = useMap();
 map.setView(position);
 return null;
}

function DetectClick(){
    const navigate = useNavigate();
    useMapEvents({
        click: e=> navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
}

export default Map
