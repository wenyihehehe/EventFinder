import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventForm from "../../../components/EventForm";

export default function EventDashboardEdit() {
  let navigate = useNavigate();
  let params = useParams();
  let eventId = parseInt(params.eventId, 10);

  const sectionStyle={
    padding: "0rem 2rem",
  }

  return (
      <main className="pt-3 pl-5 col-10" style={{height: "90vh",overflowY: "scroll"}}>
        <div style={sectionStyle}>
          <EventForm eventId={eventId} navigate={navigate}/>
        </div>
      </main>
    );
  }