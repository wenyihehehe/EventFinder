import CreateOrganizerProfileForm from "../components/CreateOrganizerProfileForm";
import { useNavigate, useLocation } from 'react-router-dom';

export default function CreateOrganizerProfilePage() {
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  return (
    <main className="container-fluid row justify-content-center mt-4"  style={{width: "50%", minWidth:"700px", marginLeft:"auto", marginRight:"auto", padding: "0"}}>
        <CreateOrganizerProfileForm navigate={navigate} from={from}/>
    </main>
  );
}