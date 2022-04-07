import { Link } from "react-router-dom";
import './index.css';

export default function NavigationBar() {
  return (
    <div>
      EventFinder
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/login">login</Link> |{" "}
        <Link to="/signup">signup</Link> |{" "}
        <Link to="/search">search</Link> |{" "}
        <Link to="/event/1">event</Link> |{" "}
        <Link to="/ticket/1">ticket</Link> |{" "}
        <Link to="/profile/user/view">profile/user/view</Link> |{" "}
        <Link to="/profile/organizer/view">profile/organizer/view</Link> |{" "}
        <Link to="/settings/account">settings/account</Link> |{" "}
        <Link to="/settings/organizeraccount">settings/organizeracccount</Link> |{" "}
        <Link to="/dashboard">dashboard</Link> |{" "}
        <Link to="/dashboard/create">dashboard/create</Link> |{" "}
        <Link to="/dashboard/manage/1">dashboard/manage/1</Link> |{" "}
        <Link to="/dashboard/manage/1/edit">dashboard/manage/1/edit</Link> |{" "}
        <Link to="/dashboard/manage/1/registration">dashboard/manage/1/registration</Link> |{" "}
        <Link to="/dashboard/manage/1/attendee">dashboard/manage/1/attendee</Link> |{" "}
        <Link to="/dashboard/manage/1/performance">dashboard/manage/1/performance</Link> |{" "}
        <Link to="/notfound">notfound</Link> 
      </nav>
    </div>
  );
}

