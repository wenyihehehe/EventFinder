import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Website } from "../../config/domain";

export default function NavigationBar() {
  let navigate = useNavigate();
  let location = useLocation();
  const [search, setSearch] = useState("")
  const [login, setLogin] = useState(true)
  const onSearch = () => {
    navigate('/search?event=' + search);
    setSearch("");
  }

  return (
    <nav className="navbar navbar-light navbar-expand-lg detailMainText" style={{background: "#FDFDFD", paddingLeft: "3.5rem", paddingRight: "3.5rem"}}>
      <Link to="/" className="navbar-brand pr-5"><img className="logo" src={`${Website}/logo.png`} alt="logo"></img></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {
          location.pathname === "/search" ? "" : 
          <div className="row m-0 my-2 my-lg-0 position-relative subTextColor input-group" style={{width: "600px"}}>
            <input type="text" className="col form-control detailMainText" placeholder="Search events" style={{height:"40px", border: "0.5px solid rgba(0,0,0,.1)"}} value={search} onChange={(e)=>setSearch(e.target.value)}></input>
            <div className="input-group-append">
              <span className="input-group-text" onClick={onSearch} style={{backgroundColor: "#FABA40", borderColor: "#FABA40", color: "#FEFEFE"}}>
                <i className="bi bi-search"></i>
              </span>
            </div>
          </div>
        }
        {
          login ? 
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" style={{color: "#FABA40"}} to="/dashboard/create">Create Event</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{color: "#FABA40"}} to="/profile/user/view">My Tickets</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" style={{color: "#0F0A49"}} id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                Username
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/profile/user/view">User Profile</a>
                <a className="dropdown-item" href="/profile/organizer/view">Organizer Profile</a>
                <a className="dropdown-item" href="/dashboard">Event dashboard</a>
                <a className="dropdown-item" href="/settings/account">Settings</a>
              </div>
            </li>
          </ul>
          :
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" style={{color: "#FABA40"}} to="/dashboard/create">Create Event</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{color: "#FABA40"}} to="/faq">Learn More</Link>
              {/* TODO: Link to FAQ */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{color: "#0F0A49"}} to="/login">Log In</Link>
            </li>
          </ul>
        }
      </div>
    </nav>
  );
}

