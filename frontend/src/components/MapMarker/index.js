import style from './index.module.css';

export default function MapMarker({isCurrentLocation, event=null, handleMarkerClick=null}){
    const handleClick = () => {
        if(!event) return;
        handleMarkerClick(event)
        var markers = document.querySelectorAll('.marker');
        [].forEach.call(markers, function(marker) {
            marker.classList.remove('active');
        });
        const markerName = "marker" + event.id
        const marker = document.getElementById(markerName);
        marker.classList.add('active')
    }
    return (
        <div>
            <div id={`marker${event ? event.id : 0}`} className={`${style.marker} ${isCurrentLocation? style.isCurrentLocation : ""} marker`} onClick={handleClick}>
            </div>       
        </div>
    );
}