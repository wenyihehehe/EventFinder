import UserProfile from "../../components/UserProfile";
import Ticket from "../../components/Ticket";

export default function UserProfilePage() {
    return (
      <main className="container-fluid row justify-content-center" style={{minHeight: "100vh"}}>
        <div className="backgroundWhite mt-4" style={{minWidth: "1000px", height: "fit-content", minHeight: "500px"}}>
          <UserProfile />
          <hr/>
          <p className="secondaryTitleText pt-3 pb-1" style={{paddingLeft: "6rem"}}>My Registration</p>
          <Ticket />
        </div>
      </main>
    );
  }