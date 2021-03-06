import { Outlet, NavLink, useParams, useNavigate, Link } from "react-router-dom";

export default function EventDashboardTemplate() {
    let params = useParams();
    let navigate = useNavigate();
    let eventId = parseInt(params.eventId, 10);

    const navs = [
        {icon: "bi bi-grid-1x2-fill", link: "/", display: "Dashboard"}, 
        {icon: "bi bi-pencil-square", link: "/edit", display: "Edit event"},
        {icon: "bi bi-list-ol", link: "/registration", display: "Manage registration"},
        {icon: "bi bi-people-fill", link: "/attendee", display: "Manage attendee"},
        {icon: "bi bi-graph-up-arrow", link: "/performance", display: "View performance"},
    ];

    let navBarHeight = document.getElementById('navBar').offsetHeight;

    const navStyle = {
        color: "#FFFFFF",
        backgroundColor: "#0659A8",
        padding: "0",
        margin: "0",
    };

    return (
      <main className="container-fluid row" style={{padding: "0", margin: "0",height: window.innerHeight - navBarHeight - 0.5}}>
        <nav className="col-2" style={navStyle}>
            <div className="detailMainText navTextClamp" style={{paddingLeft: "1.5rem", lineHeight: "60px", boxShadow: "inset 0px -0.5px 0px #E5E5E5"}} onClick={()=> navigate("/dashboard")}>
                <i className="bi bi-chevron-left mr-3"></i>
                My Events
            </div>
            <div className="detailMainText navTextClamp" style={{paddingLeft: "1.5rem", lineHeight: "50px"}}>
               Event Dashboard
            </div>
            {navs.map((nav) => (
            <NavLink
                className="detailMainText navTextClamp"
                style={({ isActive }) => {
                return {
                    lineHeight: "60px",
                    display: "block",
                    color: isActive ? "#0F0A49" : "#FFFFFF",
                    backgroundColor: isActive ? "#FDFDFD" : "inherit",
                    paddingLeft: "1.5rem",
                };
                }}
                to={`/dashboard/manage/${eventId}${nav.link}`}
                key={nav.link}><i className={`${nav.icon} mr-3`}></i>{nav.display}</NavLink>
            ))}
            <div style={{position: "absolute", bottom: "1rem"}}>
                <Link to='/doc/help' target="_blank" className="detailSubText mb-2 whiteText" style={{paddingLeft: "1.5rem", width:"100%"}}>
                    Need help?
                </Link>
                <br/>
                <Link to='/doc/faq' target="_blank" className="detailSubText whiteText" style={{paddingLeft: "1.5rem", width:"100%"}}>
                    FAQ
                </Link>
            </div>
        </nav>
        <Outlet/>
      </main>
    );
}