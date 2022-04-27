import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RegistrationTable from "../../../components/RegistrationTable";
import RegistrationCard from "../../../components/RegistrationCard";
import * as Event from "../../../services/event"

export default function EventDashboardRegistration() {
  let navigate = useNavigate();
  let params = useParams();
  let eventId = parseInt(params.eventId, 10);
  
  const [registrations, setRegistrations] = useState({})

  const sectionStyle={
    padding: "0rem 2rem",
  }

  const getData = async () =>{
    let registration = await Event.getEventRegistration({eventId})
    setRegistrations(registration.data)
  }

  useEffect(() => {
    getData()
  },[])

  const registrationsRender = [];

  for (var i = 0; i < registrations.length; i += 1) {
    if(registrations.length !== 0){
      registrationsRender.push(
        <div className={`carousel-item ${i===0 ? "active" : ""}`} key={i}>
          <RegistrationCard registration={registrations[i]} key={registrations[i].id}/>
      </div>
      );
    } else {
      registrationsRender.push(<p className="detailSubText" style={{paddingLeft: "7rem"}}>No recent registrations.</p>);
    }
  }

  return (
    <main className="pt-3 pl-5 col-10" style={{height: "90vh",overflowY: "scroll"}}>
      <section style={sectionStyle}>
        <p className="titleText">Recent Registration</p>
          <div className="container col-12 row align-items-center" style={{margin: "0"}}>
            <a className={`mb-3 mr-1 `} href="#anotherCarousell" role="button" data-slide="prev" style={{height: "fit-content", width: "fit-content", padding: "0"}}>
              <i className="bi bi-chevron-left"></i>
            </a>
            <div id="anotherCarousell" className="carousel slide col-xl-6" data-ride="carousel">
              <div className="carousel-inner">
                {registrationsRender}  
              </div>
            </div>
            <a className="mb-3" href="#anotherCarousell" role="button" data-slide="next" style={{height: "fit-content", padding: "0"}}>
              <i className="bi bi-chevron-right"></i>
            </a>            
          </div>
      </section>
      <hr/>
      <div style={sectionStyle}>
        <p className="titleText mb-3">All Registrations</p>
        <RegistrationTable eventId={eventId} navigate={navigate}/>
      </div>
    </main>
  );
}