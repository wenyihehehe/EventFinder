import React from 'react';
import GoogleMapReact from 'google-map-react';
import InputField from './InputField';
import MapMarker from '../MapMarker';

class SearchMap extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            mapApiLoaded: false,
            mapInstance: null,
            mapApi: null,
            places: [],
            center: [],
            zoom: 15,
            address: '',
            draggable: true,
            lat: null,
            lng: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.apiHasLoaded = this.apiHasLoaded.bind(this);
        this.addPlace = this.addPlace.bind(this);
        this.setCurrentLocation = this.setCurrentLocation.bind(this);
    }

    componentDidMount() {
        this.setCurrentLocation();
    }

    handleChange = ({ center, zoom }) => {
        this.setState({
            center: center,
            zoom: zoom,
        });
    }

    apiHasLoaded = (map, maps) => {
        this.setState({
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
        });
    };

    addPlace = (place, address) => {
        this.setState({
            places: [place],
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: address
        });
        let data = {
            location: address,
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
        }
        this.props.handleLocation(data)

    };

    // Get Current Location Coordinates
    setCurrentLocation() {
        if(this.props.location){
            console.log(this.props.latitude)
            console.log(this.props.longitude)
            this.setState({
                center: [this.props.latitude, this.props.longitude],
                lat: this.props.latitude,
                lng: this.props.longitude,
                address: this.props.location
            });
            return;
        }
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    center: [position.coords.latitude, position.coords.longitude],
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });
        }
    }

    render() {
        const {mapApiLoaded, mapInstance, mapApi} = this.state;

        return (
            <div className="mb-3" style={{height:"fit-content", width:"100%"}}>
                {mapApiLoaded && (
                    <div>
                        <InputField map={mapInstance} mapApi={mapApi} addplace={this.addPlace} location={this.props.location}/>
                    </div>
                )}
                <GoogleMapReact
                    center={this.state.center}
                    zoom={this.state.zoom}
                    draggable={this.state.draggable}
                    onChange={this.handleChange}
                    bootstrapURLKeys={{
                        key: 'AIzaSyBx34-6ciKW6FZzEK3sff3Ae56sSAOJicI',
                        libraries: ['places', 'geometry'],
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
                    style={{height:"400px", position:"relative", marginTop:"1rem"}}
                >
                    <MapMarker
                        text={this.state.address}
                        lat={this.state.lat}
                        lng={this.state.lng}
                    />
                </GoogleMapReact>
            </div >
        );
    }
}

export default SearchMap;