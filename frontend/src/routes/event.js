import { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import * as Event from '../services/event'
import EventDescriptionBox from "../components/EventDescriptionBox";
import EventCard from "../components/EventCard";
import GoogleMapReact from 'google-map-react';
import MapMarker from "../components/MapMarker";
import OrderModal from "../components/OrderModal";
import * as AuthProvider from "../config/authProvider"
import Footer from "../components/Footer";

export default function EventPage() {
  let navigate = useNavigate();
  let location = useLocation()
  let params = useParams();
  let eventId = parseInt(params.eventId, 10);
  const [event, setEvent] = useState({})
  const [relatedEvents, setRelatedEvents] = useState({})
  const [showOrder, setShowOrder] = useState(false)
  let authContext = AuthProvider.useAuth();

  const getData = async () =>{
    let event = await Event.getEventPage({eventId})
    setEvent(event.data)
    let relatedEvents = await Event.getRelatedEvents({eventId})
    setRelatedEvents(relatedEvents.data)
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    if(location.state && location.state.showOrder) setShowOrder(location.state.showOrder)
  }

  useEffect(() => {
    getData()
  },[location])

  const imageStyle = {
    width: "100%",
    height: "480px",
    objectFit: "cover"
  }

  const sectionStyle = {
    width: "70%"
  }

  const handleClose = () => {
    setShowOrder(false);
  }

  const handleOpen = () => {
    setShowOrder(true);
  }

  const eventsRender = [];
    
  for (var i = 0; i < relatedEvents.length; i += 3) {
    if(relatedEvents.length !== 0){
      eventsRender.push(
        <div className={`carousel-item ${i===0 ? "active" : ""}`} key={i}>
        <div className="row justify-content-center" style={{margin:"0"}}>
          {
            relatedEvents.slice(i, i + 3)
              .map(event => (
                <EventCard event={event} key={event.id}/>
              ))
          }
        </div>
      </div>
      );
    } else {
      eventsRender.push(<p className="detailSubText" style={{paddingLeft: "7rem"}}>No event is found.</p>);
    }
  }

  return (
    <main>
      <section>
        <img style={imageStyle} src={event.coverImage} alt="event cover"></img>
      </section>
      <section className="container-fluid row justify-content-center mt-4" style={{margin: "0", padding: "0"}}>
        <div style={sectionStyle} className="row justify-content-between m-0">
          <p className="secondaryTitleText col-10 mb-0 p-0">{event.title}</p>
          <button className="btn primaryButton col-lg-2" style={{filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1))"}} onClick={handleOpen} disabled={event.status === 'Ended'}>Register Now</button>
        </div>
      </section>
      <section className="container-fluid row justify-content-center mt-4" style={{margin: "0", padding: "0"}}>
        <div style={sectionStyle} className="row justify-content-between">
          {event.title && (<EventDescriptionBox event={event}/>)}
        </div>
      </section>
      {
        event.type === "Physical" ? 
        <section className="container-fluid row justify-content-center mt-4" style={{margin: "0", padding: "0"}}>
          <div style={{...sectionStyle, height:"350px"}} className="row justify-content-between">
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyBx34-6ciKW6FZzEK3sff3Ae56sSAOJicI",libraries: ['places'],}}
            center={[event.latitude, event.longitude]}
            zoom={15}
            >
            <MapMarker
                lat={event.latitude}
                lng={event.longitude}
            />
          </GoogleMapReact>
          </div>
        </section>
        : <span></span>
      }
      <section className="container-fluid row justify-content-center mt-4 mb-4" style={{margin: "0", padding: "0"}}>
        <div style={{width: "70%", boxShadow:"0px 4px 15px rgba(0, 0, 0, 0.05)"}} className="row m-0 backgroundWhite">
          <div className="col-12 mb-3 mt-3">
            <p className="secondaryTitleText text-center">More Events </p>
          </div>
          <div className="col-12 row m-0 p-0 justify-content-center align-items-center">
            <a className="btn mb-3 mr-1" href="#carouselContent" role="button" data-slide="prev" style={{height: "fit-content"}}>
              <i className="bi bi-chevron-left"></i>
            </a>
            <div>
              <div id="carouselContent" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  {eventsRender}  
                </div>
              </div>
            </div>
            <a className="btn mb-3" href="#carouselContent" role="button" data-slide="next" style={{height: "fit-content"}}>
              <i className="bi bi-chevron-right"></i>
            </a>
          </div>
          <div className="mx-auto mb-3">
            <Link to="/search"><button className="btn primaryButton" style={{width:"100px"}}>More</button></Link>
          </div>
        </div>
      </section>
      <OrderModal show={showOrder} handleClose={handleClose} eventId={eventId} navigate={navigate} authContext={authContext} location={location}/>
      <Footer/>
    </main>
  );
}