import React from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from '../MapMarker';

class EventMap extends React.Component {
    componentDidMount() {
        this.props.setCurrentLocation();
    }

    render() {
        const map = this.props.map
        const events = this.props.events
        return (
            <div className="mb-3" style={{height:"100%", width:"100%"}}>
                <GoogleMapReact
                    ref={(ref) => { this.map = ref; }}
                    center={map.center}
                    zoom={map.zoom}
                    draggable={map.draggable}
                    onChange={this.props.handleChange}
                    bootstrapURLKeys={{
                        key: 'AIzaSyBx34-6ciKW6FZzEK3sff3Ae56sSAOJicI',
                        libraries: ['places'],
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => this.props.apiHasLoaded(map, maps)}
                >
                    <MapMarker
                        lat={map.lat}
                        lng={map.lng}
                        isCurrentLocation={true}
                    />
                    { events && (
                        events.map((event)=> 
                            <MapMarker
                                key={event.id}
                                lat={event.latitude}
                                lng={event.longitude}
                                isCurrentLocation={false}
                                event={event}
                                handleMarkerClick={this.props.handleMarkerClick}
                            />
                        )
                    )}
                </GoogleMapReact>
            </div >
        );
    }
}

export default EventMap;