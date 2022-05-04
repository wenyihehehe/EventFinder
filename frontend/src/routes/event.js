import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as Event from '../services/event'
import EventDescriptionBox from "../components/EventDescriptionBox";
import EventCard from "../components/EventCard";

export default function EventPage() {
  let navigate = useNavigate();
  let params = useParams();
  let eventId = parseInt(params.eventId, 10);
  const [event, setEvent] = useState({})
  const [relatedEvents, setRelatedEvents] = useState({})

  const getData = async () =>{
    let event = await Event.getEventPage({eventId})
    setEvent(event.data)
    let relatedEvents = await Event.getRelatedEvents({eventId})
    setRelatedEvents(relatedEvents.data)
  }

  useEffect(() => {
    getData()
  },[])

  const imageStyle = {
    width: "100%",
    height: "480px",
    objectFit: "cover"
  }

  const sectionStyle = {
    width: "70%"
  }

  const eventsRender = [];
    
  for (var i = 0; i < relatedEvents.length; i += 3) {
    if(relatedEvents.length !== 0){
      eventsRender.push(
        <div className={`carousel-item ${i===0 ? "active" : ""}`} key={i}>
        <div className="row" style={{margin:"0"}}>
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
          <p className="secondaryTitleText col-auto mb-0 p-0" style={{lineHeight:"1.5"}}>{event.title}</p>
          <button className="btn primaryButton col-auto">Register Now</button>
        </div>
      </section>
      <section className="container-fluid row justify-content-center mt-4" style={{margin: "0", padding: "0"}}>
        <div style={sectionStyle} className="row justify-content-between">
          {event.title && (<EventDescriptionBox event={event}/>)}
        </div>
      </section>
      <section className="container-fluid row justify-content-center mt-4" style={{margin: "0", padding: "0"}}>
        <div style={{...sectionStyle, height:"350px"}} className="row justify-content-between">
          <p>Map</p>
        </div>
      </section>
      <section className="container-fluid row justify-content-center mt-4 mb-4" style={{margin: "0", padding: "0"}}>
        <div style={sectionStyle} className="row m-0 backgroundWhite">
          <div className="col-12 mb-3 mt-3">
            <p className="secondaryTitleText text-center">More Events </p>
          </div>
          <div className="col-12 row m-0 p-0 justify-content-between align-items-center">
            <a className="btn mb-3 mr-1 col-auto" href="#carouselContent" role="button" data-slide="prev" style={{height: "fit-content"}}>
              <i className="bi bi-chevron-left"></i>
            </a>
            <div className="col-auto">
              <div id="carouselContent" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  {eventsRender}  
                </div>
              </div>
            </div>
            <a className="btn mb-3 col-auto" href="#carouselContent" role="button" data-slide="next" style={{height: "fit-content"}}>
              <i className="bi bi-chevron-right"></i>
            </a>
          </div>
          <div className="mx-auto mb-3">
            <Link to="/search"><button className="btn primaryButton" style={{width:"100px"}}>More</button></Link>
          </div>
        </div>
      </section>
    </main>
  );
}