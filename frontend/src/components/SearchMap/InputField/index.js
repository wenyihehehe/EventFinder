import React from 'react';

class InputField extends React.Component {
    constructor(props) {
        super(props);
        this.clearSearchBox = this.clearSearchBox.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount({ map, mapApi } = this.props) {
        const options = {
            // restrict your search to a specific type of result
            // types: ['establishment','address'],
            // restrict your search to a specific country, or an array of countries
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
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        addplace(place, this.searchInput.value);
        this.searchInput.blur();
    };

    clearSearchBox() {
        this.searchInput.value = '';
    }

    handleKeyDown(e){
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    render() {
        return (
            <div>
                <input
                    id="locationField"
                    className="form-control"
                    ref={(ref) => {
                        this.searchInput = ref;
                    }}
                    type="text"
                    onFocus={this.clearSearchBox}
                    placeholder="Enter a location"
                    onKeyDown={this.handleKeyDown}
                    required />
                {/* <div className="invalid-feedback">This field is required.</div> */}
                <div className="invalid-location-feedback">This location is invalid.</div>
            </div>
        );
    }
}

export default InputField;