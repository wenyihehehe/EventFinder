import { Outlet, NavLink, useParams, useNavigate } from "react-router-dom";

export default function EventDashboardTemplate() {
    let params = useParams();
    let navigate = useNavigate();
    let eventId = parseInt(params.eventId, 10);

    const navs = [
        {icon: "bi bi-grid-1x2-fill", link: "/", display: "Dashboard"}, 
        {icon: "bi bi-pencil-square", link: "/edit", display: "Edit event"},
        {icon: "bi bi-list-ol", link: "/registration", display: "Manage registration"},
        {icon: "bi bi-people-fill", link: "/attendee", display: "Manage attendee"},
        {icon: "bi bi-graph-up-arrow", link: "/performance", display: "Event performance"},
    ];

    const navStyle = {
        color: "#FFFFFF",
        backgroundColor: "#0659A8",
        padding: "0",
        height: "90vh",
        margin: "0",
    };

    return (
      <main className="container-fluid row" style={{padding: "0", margin: "0"}}>
        <nav className="col-2" style={navStyle}>
            <div className="detailMainText" style={{paddingLeft: "1.5rem", lineHeight: "60px", boxShadow: "inset 0px -0.5px 0px #E5E5E5"}} onClick={()=> navigate("/dashboard")}>
                <i className="bi bi-chevron-left mr-3"></i>
                My Events
            </div>
            <div className="detailMainText" style={{paddingLeft: "1.5rem", lineHeight: "50px"}}>
               Event Dashboard
            </div>
            {navs.map((nav) => (
            <NavLink
                className="detailMainText"
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
                {/* TODO: Add page and copywriting */}
                <div className="detailSubText mb-2" style={{paddingLeft: "1.5rem", width:"100%"}} onClick={()=> navigate("/")}>
                    Need help?
                </div>
                <div className="detailSubText" style={{paddingLeft: "1.5rem", width:"100%"}} onClick={()=> navigate("/")}>
                    FAQ
                </div>
            </div>
        </nav>
        <Outlet/>
      </main>
    );
}