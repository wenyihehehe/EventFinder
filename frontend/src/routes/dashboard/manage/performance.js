import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Event from '../../../services/event'
import AttendeePie from "../../../components/PerformanceChart/AttendeePie";
import SalesLine from "../../../components/PerformanceChart/SalesLine";

export default function EventDashboardPerformance() {
  let params = useParams();
  let eventId = parseInt(params.eventId, 10);
  
  const [event, setEvent] = useState({})

  const sectionStyle={
    padding: "0rem 2rem",
  }

  const getData = async () =>{
    let eventData = await Event.getEventPerformance({eventId})
    setEvent(eventData.data)
  }

  useEffect(() => {
    getData()
  },[])

  const boxStyle = {
    background: "#FDFDFD",
    border: "0.5px solid #C4C4C4",
    marginRight: "1rem",
    padding: "1rem"
  }

  return (
    <main className="pt-3 pl-5 col-10" style={{height: "90vh",overflowY: "scroll"}}>
      <div style={sectionStyle}>
        <p className="titleText">Event Performance</p>
        <p className="detailSubText subTextColor">Overall performance of your event.</p>
        <div className="row ml-3" style={{margin:"0",}}>
          <div className="col-3" style={boxStyle}>
            <p className="detailMainText">Page Views</p>
            <p className="secondaryTitleText">{event.pageView}</p>
          </div>
          <div className="col-3" style={boxStyle}>
            <p className="detailMainText tonedTextOrange">Tickets Sold</p>
            <p className="secondaryTitleText tonedTextOrange">{event.ticketSold}</p>
          </div>
          <div className="col-3" style={boxStyle}>
            <p className="detailMainText">Revenue</p>
            <p className="secondaryTitleText">{event.revenue}</p>
          </div>
        </div>
      </div>
      <hr/>
      <div style={sectionStyle}>
        <p className="titleText">Sales</p>
        <p className="detailSubText subTextColor">Ticket sales of your event</p>
        <div className="ml-3 mb-3" > 
          {event.ticketSales && (
            <SalesLine ticketSales={event.ticketSales}/>
          )}
        </div>
      </div>
      <hr/>
      <div style={sectionStyle}>
        <p className="titleText">Attendee</p>
        <p className="detailSubText subTextColor">Attendance of your event</p>
        <div className="ml-3 mb-3"> 
          {event.attendances && (
            <AttendeePie attendances={event.attendances}/>
          )}
        </div>
      </div>
    </main>
  );
}