import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Website } from "../../config/domain";
import * as User from "../../services/user";

export default function NavigationBar(props) {
  let navigate = useNavigate();
  let location = useLocation();
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({});

  const onSearch = () => {
    navigate('/search', {state: { searchParams: search} });
    setSearch("");
  }

  const getUser = async() => {
    if(!props.authContext.token) return;
    let user = await User.getUserProfile()
    setUser(user[0]);
  }

  useEffect(()=>{
    getUser();
  }, [props])

  const profileImageStyle = {
    borderRadius: "100%",
    width: "25px",
    height: "25px",
    paddingRight: "0.25rem",
    objectFit: "cover",
    boxSizing: "content-box",
  }

  const handleSignOut = () =>{
    props.authContext.signOut(()=>{
      navigate('/');
    })
  }

  return (
    <nav id="navBar" className="navbar navbar-light navbar-expand-lg detailMainText" style={{background: "#FDFDFD", paddingLeft: "3.5rem", paddingRight: "3.5rem"}}>
      <Link to="/" className="navbar-brand pr-5"><img className="logo" src={`${Website}/logo.png`} alt="logo"></img></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse row m-0 justify-content-between" id="navbarSupportedContent">
        {
          location.pathname === "/search" ? "" : 
          <div className="col-lg-6 col-12 p-0 row m-0 my-2 my-lg-0 subTextColor input-group" style={{width: "40vw"}}>
            <input type="text" className="col form-control detailMainText" placeholder="Search events" style={{height:"40px", border: "0.5px solid rgba(0,0,0,.1)"}} value={search} onChange={(e)=>setSearch(e.target.value)}></input>
            <div className="input-group-append">
              <span className="input-group-text" onClick={onSearch} style={{backgroundColor: "#FABA40", borderColor: "#FABA40", color: "#FEFEFE"}}>
                <i className="bi bi-search"></i>
              </span>
            </div>
          </div>
        }
        {
          props.authContext.token ? 
          <ul className="col-lg-auto col-12 p-0 navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" style={{color: "#FABA40"}} to="/dashboard/create">Create Event</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{color: "#FABA40"}} to="/profile/user/view#registrations">My Tickets</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" style={{color: "#0F0A49", display:"flex", alignItems: "center"}} id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                <img src={user.profileImage} alt="user profile" style={profileImageStyle}></img>
                <span className="usernameTextClamp">{user.firstName}</span>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/profile/user/view">User Profile</a>
                <a className="dropdown-item" href="/profile/organizer/view">Organizer Profile</a>
                <a className="dropdown-item" href="/dashboard">Event dashboard</a>
                <a className="dropdown-item" href="/settings/account">Settings</a>
                <p className="dropdown-item mb-0" onClick={handleSignOut}>Sign Out</p>
              </div>
            </li>
          </ul>
          :
          <ul className="col-lg-auto col-12 navbar-nav ml-auto">
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

