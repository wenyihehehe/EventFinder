import React from 'react';

class MapSearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.clearSearchBox = this.clearSearchBox.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    componentDidMount({ map, mapApi } = this.props){
        const options = {
            componentRestrictions: { country: ['my'] },
        };
        this.autoComplete = new mapApi.places.Autocomplete(
            this.searchInput,
            options,
        );
        this.autoComplete.addListener('place_changed', this.onPlaceChanged);
        this.autoComplete.bindTo('bounds', map);
        if(this.props.location) this.searchInput.value = this.props.location;
    }

    componentWillUnmount({ mapApi } = this.props) {
        mapApi.event.clearInstanceListeners(this.searchInput);
    }

    onPlaceChanged = ({ map, addplace } = this.props) => {
        const place = this.autoComplete.getPlace();
        if (!place.geometry) return;
        map.setCenter(place.geometry.location);
        addplace(place);
        this.searchInput.blur();
    };

    clearSearchBox() {
        this.searchInput.value = '';
        this.props.clearLocation();
    }

    handleKeyDown(e){
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    handleOnClick(){
        this.props.setCurrentLocation()
        this.clearSearchBox()
    }

    render() {
        return (
            <div className="col subTextColor" style={{padding:"0", margin:"0"}}>
                <span className="bi bi-geo-alt" style={{position:"absolute", top: "0.5rem", left:"0.75rem"}}></span>
                <input 
                    ref={(ref) => {
                        this.searchInput = ref;
                    }}
                    type="text" 
                    className="form-control detailMainText" 
                    style={{textIndent:"1.75rem", height:"40px", border: "0.5px solid rgba(0,0,0,.1)", paddingRight: "1.75rem"}} 
                    value={this.props.location} 
                    onFocus={this.clearSearchBox}
                    placeholder="Enter a location"
                    onKeyDown={this.handleKeyDown}/>
                <span className="fas fa-location" style={{position:"absolute", top: "0.75rem", right:"0.5rem"}} onClick={this.handleOnClick}></span>
            </div>
        );
    }
}

export default MapSearchInput;