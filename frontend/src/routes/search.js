import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Util from '../services/util';
import * as Event from '../services/event';
import HorizontalEventCard from "../components/HorizontalEventCard";
import EventMap from "../components/EventMap";
import MapSearchInput from "../components/MapSearchInput";

export default function Search() {
  let navigate = useNavigate();
  const [events, setEvents] = useState([])
  const [searchParams, setSearchParams] = useState("")
  const [category, setCategory] = useState("all")
  const [categoryOption, setCategoryOption] = useState([])
  const [type, setType] = useState("all")
  const [location, setLocation] = useState([])
  const [page, setPage] = useState("1")
  const [maxPage, setMaxPage] = useState("1")
  const [mapItem, setMapItem] = useState({
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
  });

  const getData = async() =>{
    let category = await Util.getCategory()
    setCategoryOption(category.data)
  }

  const getEvent = async() =>{
    let event = await Event.getEventSearchPage({ page, searchParams, category, type, location });
    setEvents(event.data)
    setMaxPage(event.max)
    var eventDiv = document.getElementById('eventDiv');
    eventDiv.scrollTop = 0;
  }

  const handlePageChange = (e) =>{
    if (!e.target.value) {
      setPage(e.target.value)
    } else if (e.target.value <= 0) {
      setPage(1)
    } else if (e.target.value <= parseInt(maxPage)){
      setPage(e.target.value)
    } else {
      setPage(maxPage)
    }
  };
  
  useEffect(() => {
    getData()
  },[]);

  useEffect(() => {
    setBound()
  },[events]);

  useEffect(() => {
    getEvent()
  },[page, searchParams, category, type, location]);

  const setBound = () => {
    if(!mapItem.mapInstance) return;
    const bounds = new window.google.maps.LatLngBounds();
    events.forEach((event, index) => {
        console.log(event.latitude, event.longitude)
        const position = new window.google.maps.LatLng(event.latitude, event.longitude);
        bounds.extend(position);
    });
    const position = new window.google.maps.LatLng(location[0], location[1]);
    bounds.extend(position);
    mapItem.mapInstance.fitBounds(bounds)
  }

  const addPlace = (place) => {
    setMapItem({
      ...mapItem,
      places: [place],
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    setLocation([place.geometry.location.lat(),place.geometry.location.lng()])
  };

  const handleChange = ({ center, zoom }) => {
    setMapItem({
      ...mapItem,
      center: center,
      zoom: zoom,
    });
  }

  const apiHasLoaded = (map, maps) => {
    console.log(map)
    console.log(maps)
    setMapItem({
      ...mapItem,
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
  };

  // Get Current Location Coordinates
  const setCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMapItem({
          ...mapItem,
          center: [position.coords.latitude, position.coords.longitude],
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocation([position.coords.latitude,position.coords.longitude])
      }, 
        () => {
          // Set default to sunway university geo point if can't get current position
          setMapItem({
            ...mapItem,
            center: [3.067891823231041, 101.60351894232923],
            lat: 3.067891823231041, 
            lng: 101.60351894232923
          });
          setLocation([3.067891823231041, 101.60351894232923])
        }
      );
    } 
  }

  const handleMarkerClick = (event) => {
    const element = document.getElementById(event.id);
    element.scrollIntoView();
    element.classList.toggle("animateZoom")
    setTimeout(()=> element.classList.toggle("animateZoom"), 1500);
    setMapItem({
      ...mapItem,
      center: [event.latitude, event.longitude],
    });
  }

  return (
    <main className="row m-0 p-0" style={{height: "90vh"}}>
      <div className="col-7 p-0 ml-4 mr-3 mt-2">
        <div className="mb-2">
          <div className="col-12 mb-2 subTextColor" style={{padding:"0", margin:"0"}}>
            <span className="bi bi-search" style={{position:"absolute", top: "0.5rem", left:"1rem"}}></span>
            <input type="text" className="form-control detailMainText" placeholder="Search events" style={{textIndent:"2rem", height:"40px", border: "0.5px solid rgba(0,0,0,.1)"}} value={searchParams} onChange={(e)=> setSearchParams(e.target.value)}></input>
          </div>
          <div className="row m-0">
            <select className="custom-select form-control col mr-2 detailMainText" style={{height: "40px"}} name="category" value={category} onChange={(e)=>setCategory(e.target.value)}>
              <option value={"all"}>All Categories</option>
              {categoryOption.map((option)=>(
                <option value={option} key={option}>{option}</option>
                ))}
            </select>
            <select className="custom-select form-control col mr-2 detailMainText" style={{height: "40px"}} name="type" value={type} onChange={(e)=>setType(e.target.value)}>
              <option value="all">All types</option>
              <option value="Physical">Physical</option>
              <option value="Online">Online</option>
            </select>
            {(mapItem.mapApiLoaded && mapItem.mapApi.places) && (
              <MapSearchInput location={location.location} map={mapItem.mapInstance} mapApi={mapItem.mapApi} addplace={addPlace} setCurrentLocation={setCurrentLocation}/>
            )}
          </div>
        </div>
        <div>
          <p className="headingText">Results</p>
          {events.length > 0 && (
            <div id="eventDiv" className="pr-2" style={{height: "70vh", overflowY: "scroll", scrollBehavior: "smooth", overflowX: "hidden"}} >
              <div>
              {
                events.map(event => (
                    <HorizontalEventCard event={event} key={event.id} id={event.id} navigate={navigate}/>
                  ))
              }
              </div>
              <nav aria-label="Page navigation" className="mb-3">
                <ul className="pagination detailMainText justify-content-center">
                  <li className="page-item">
                    <button className="page-link" aria-label="Previous" onClick={(e)=> setPage(parseInt(page)-1<1 ? 1 : parseInt(page)-1)}>
                      <span aria-hidden="true">&laquo;</span>
                    </button>
                  </li>
                  <li className="page-item"><input type="number" className="page-link" style={{background:"#FFFFFF", color:"#FABA40", width: "3.5rem"}} value={page} onChange={handlePageChange} min="1" max={maxPage}></input></li>
                  <li className="page-item">
                    <button className="page-link" aria-label="Next" onClick={(e)=> setPage(parseInt(page)+1<=maxPage ? parseInt(page)+1 : parseInt(page))}>
                      <span aria-hidden="true">&raquo;</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
          {events.length <= 0 && (
            <p className="detailSubText mb-3" style={{paddingLeft: "1rem"}}>No event is found.</p>
          )}
        </div>
      </div>
      <div className="col p-0">
        <div style={{height: "100%", width:"100%"}}>
          <EventMap map={mapItem} handleChange={handleChange} apiHasLoaded={apiHasLoaded} setCurrentLocation={setCurrentLocation} events={events} handleMarkerClick={handleMarkerClick}/>
        </div>
      </div>
    </main>
  );
}