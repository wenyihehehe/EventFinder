import DashboardTable from '../../components/DashboardTable';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as User from '../../services/user';

export default function DashboardPage() {
  let navigate = useNavigate();
  const [organizingEvents, setOrganizingEvents] = useState([])
  const [searchParams, setSearchParams] = useState("")
  const [page, setPage] = useState("1")
  const [maxPage, setMaxPage] = useState("1")

  const getData = async () =>{
    let organizingEvents = await User.getOrganizingEventsSearchPage({searchParams, page});
    let data = organizingEvents.data;
    setMaxPage(organizingEvents.max)
    setOrganizingEvents(data);
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
    <main className="container-fluid row justify-content-center mt-4" >
      <div style={{width: "85%", maxWidth: "900px"}} >
        <div className="row col-12 justify-content-between mb-3" style={{padding:"0", margin:"0"}}>
          <p className="titleText">My Events</p>
          <Link to="/dashboard/create"><button className="btn primaryButton">Create Event</button></Link>
        </div>
        <div className="col-12 mb-4 subTextColor" style={{padding:"0", margin:"0"}}>
          <span className="bi bi-search" style={{position:"absolute", top: "0.5rem", left:"1rem"}}></span>
          <input type="text" className="form-control detailMainText" placeholder="Search events" style={{textIndent:"2rem", height:"40px", border: "0.5px solid rgba(0,0,0,.1)"}} value={searchParams} onChange={(e)=> setSearchParams(e.target.value)}></input>
        </div>
        <DashboardTable className="col-12" navigate={navigate} organizingEvents={organizingEvents} getData={getData}/>
        <nav aria-label="Page navigation">
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
    </main>
    );
  }