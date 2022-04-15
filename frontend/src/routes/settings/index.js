import { Outlet, NavLink } from "react-router-dom";

export default function SettingPage() {
    const navs = [
        {link: "account", display: "User Account"}, 
        {link: "organizeraccount", display: "Organizer Account"}
    ];

    const navStyle = {
        color: "white",
        backgroundColor: "#FDFDFD",
        padding: "1rem 0",
        marginTop: "2.5rem",
        height: "fit-content"
    };

    return (
      <main className="container-fluid row justify-content-center mt-4">
        <nav className="col-2 mr-5" style={navStyle}>
            {navs.map((nav) => (
            <NavLink
                className="headingText"
                style={({ isActive }) => {
                return {
                    lineHeight: "2.5rem",
                    display: "block",
                    color: isActive ? "#0F0A49" : "#241C33",
                    backgroundColor: isActive ? "#F1F5FA" : "inherit",
                    paddingLeft: "1.5rem"
                };
                }}
                to={`/settings/${nav.link}`}
                key={nav.link}>{nav.display}</NavLink>
            ))}
        </nav>
        <Outlet/>
      </main>
    );
}