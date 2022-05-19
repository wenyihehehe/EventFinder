import SignUpModal from "../components/SignUpModal";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from 'react-router-dom';
import * as Auth from './../config/authProvider'

export default function SignUpPage() {
  let navigate = useNavigate();
  let authContext = Auth.useAuth();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  return (
    <main className="container">
      <Link to="/"><img className="logo mt-2" src="logo.png" alt="logo"></img></Link>
      <SignUpModal navigate={navigate} authContext={authContext} from={from}/>
    </main>
  );
}