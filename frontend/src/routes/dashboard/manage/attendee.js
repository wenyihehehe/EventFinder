import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AttendanceTable from "../../../components/AttendanceTable";
import * as Attendee from '../../../services/attendee'

export default function EventDashboardAttendee() {
  let params = useParams();
  let eventId = parseInt(params.eventId, 10);
  const [attendees, setAttendees] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const [page, setPage] = useState("1");
  const [maxPage, setMaxPage] = useState("1");

  const sectionStyle={
    padding: "0rem 2rem",
  }

  const getData = async () =>{
    if(!page) return;
    let attendeesData = await Attendee.getEventAttendeesSearchPage({eventId, searchParams, page});
    setMaxPage(attendeesData.max)
    setAttendees(attendeesData.data);
  }

  useEffect(() => {
    getData();
  },[searchParams, page])

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
}

  return (
    <main className="pt-3 pl-5 col-10" style={{height: "90vh",overflowY: "scroll"}}>
      <div style={sectionStyle}>
        <p className="titleText">Manage Attendee</p>
        <div className="ml-3">
          <p className="headingText">Attendee list</p>
          <div className="col-12 mb-3 subTextColor" style={{padding:"0", margin:"0"}}>
            <span className="bi bi-search" style={{position:"absolute", top: "0.5rem", left:"1rem"}}></span>
            <input type="text" className="form-control detailMainText" placeholder="Search attendees" style={{textIndent:"2rem", height:"40px", border: "0.5px solid rgba(0,0,0,.1)"}} value={searchParams} onChange={(e)=> setSearchParams(e.target.value)}></input>
          </div>
          <AttendanceTable className="col-12 mb-3" tickets={attendees} getData={getData}/>
          <nav aria-label="Page navigation">
            <ul className="pagination detailMainText justify-content-center">
              <li className="page-item">
                <button className="page-link" aria-label="Previous" onClick={(e)=> setPage(parseInt(page)-1<1 ? 1 : parseInt(page)-1)}>
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              <li className="page-item"><input type="number" className="page-link" style={{background:"#FFFFFF", color:"#FABA40", width: "3.5rem"}} value={page} onChange={handlePageChange} min="1" max={maxPage}></input></li>
              {/* TODO: MODIFY PAGE ON CHANGE */}
              <li className="page-item">
                <button className="page-link" aria-label="Next" onClick={(e)=> setPage(parseInt(page)+1<=maxPage ? parseInt(page)+1 : parseInt(page))}>
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
        </nav>
        </div>
      </div>
    </main>
  );
}