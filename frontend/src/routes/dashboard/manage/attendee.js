import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EventDashboardAttendee() {
  let params = useParams();
  let eventId = parseInt(params.eventId, 10);
  
  const [event, setEvent] = useState({})

  const sectionStyle={
    padding: "0rem 2rem",
  }

  const getData = () =>{
  }

  useEffect(() => {
    getData()
  },[])

    return (
      <main className="pt-3 pl-5 col-10" style={{height: "90vh",overflowY: "scroll"}}>
        <div style={sectionStyle}>
          <p className="titleText">Manage Attendee</p>
        </div>
      </main>
    );
  }