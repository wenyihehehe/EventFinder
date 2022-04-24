import TicketTypeTable from "../../../components/TicketTypeTable";
import { useState, useEffect } from "react";
import { Website } from "../../../config/domain";
import moment from 'moment'
import { useParams, Link } from "react-router-dom";
import * as Event from '../../../services/event'

export default function EventDashboardMain() {
  let params = useParams();
  let eventId = parseInt(params.eventId, 10);

  const [event, setEvent] = useState({
    ticketType: [],
    id: 1,
    title: "",
    startDateTime: "",
    type: "",
    status: "",
    organizerId: 1,
  })

  const sectionStyle={
    padding: "0rem 2rem",
  }

  const getData = async () =>{
    let event = await Event.getEventDashboard({eventId});
    let data = event.data;
    setEvent(data);
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <main className="pt-3 pl-5 col-10" style={{height: "90vh",overflowY: "scroll"}}>
      <div className="TopSection" style={sectionStyle}>
        <p className="titleText">{event.title ? event.title : 'NA'}</p>
        <p className="headingText subTextColor mb-1">{event.startDateTime ?  moment(event.startDateTime).format('MMM Do, dddd [at] LT') : 'NA'}</p>
        <p className="headingText subTextColor mb-1">{event.type ? event.type : 'NA'} event</p>
        <p className="headingText tonedTextOrange">{event.status}</p>
      </div>
      <hr/>
      <div style={sectionStyle}>
        <p className="headingText">Tickets</p>
        <TicketTypeTable ticketType={event.ticketType}/>
      </div>
      <hr/>
      <div style={sectionStyle}>
        <p className="headingText">Links</p>
        <div className="backgroundWhite" style={{marginLeft: "1rem", marginRight: "0"}}>
          <table className="table table-borderless" style={{padding: "1rem 2.5rem", border: "0.5px solid rgba(0,0,0,.1)"}}>
            <tbody>
              <tr>
              < td className="detailMainText" style={{width:"30%"}}>Your Event URL:</td>
                <td className="detailSubText"><Link to={`/event/${event.id}`}>{Website}event/{event.id}</Link></td>
              </tr>
              <tr>
                <td className="detailMainText" style={{width:"30%"}}>Organizer Profile URL:</td>
                <td className="detailSubText"><Link to={`/organizer/${event.id}`}>{Website}organizer/{event.organizerId}</Link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}