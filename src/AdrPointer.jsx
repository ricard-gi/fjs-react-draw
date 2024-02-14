import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';




export default ({ adrState, placeState }) => {


    const [address, setAddress] = adrState;

    const [place, setPlace] = placeState;
    const [center, setCenter] = useState([place.lat, place.long]);


    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(coords);
        }
    }

    function coords(position) {

        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setCenter([lat, long]);
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`)
            .then(response => response.json())
            .then(data => {
                setAddress(data);
                setPlace({ "adr": data.display_name, lat:lat, long: long })
            });
    }

    useEffect(() => {
        console.log("buscant geoloc", place)
        if(!place.lat || !place.long){
            getLocation();
        }
    }, [])


    useEffect(() => {
        console.log("place canviada:", place)
        if(place.lat || place.long){

            setCenter([place.lat, place.long]);
        }
    }, [place])



    function GestioEventsMapa() {
        const map = useMapEvents({
            click: (e) => {
                const { lat, lng } = e.latlng;
                coords({ coords: { latitude: lat, longitude: lng } })
            },
            locationfound: (location) => {
                //console.log('location found:', location)
            },
        })
        return null
    }

    const CentraMapa = ({ centre }) => {
        const map = useMap();
        useEffect(() => {
            map.setView(centre);
        }, centre);
        return null;
    }


    return (

        <MapContainer
            className="el-mapa"
            center={center}
            zoom={10}
            scrollWheelZoom={true}
        >
            <CentraMapa centre={center} />
            <GestioEventsMapa />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={center}>
                <Popup>
                    {place.adr}
                </Popup>
            </Marker>
        </MapContainer>
    )
}