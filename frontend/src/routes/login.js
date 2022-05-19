import LoginModal from "../components/LoginModal";
import { useNavigate, useLocation } from 'react-router-dom';
import * as AuthProvider from './../config/authProvider'

export default function LoginPage() {
  let navigate = useNavigate();
  let authContext = AuthProvider.useAuth();
  let location = useLocation();

  let from = location.state?.from?.pathname || location.state?.from || "/";

  return (
    <main className="container-fluid row" style={{minHeight: "100vh"}}>
      <div className="col-lg-6 pt-5 d-none d-lg-block" style={{backgroundColor : "#0659A8"}}>
        <img className="img-fluid pt-5" src="illustration.png" alt="illustration"></img>
      </div>
      <LoginModal className="col-lg-6 justify-content-center" navigate={navigate} authContext={authContext} from={from}/>
    </main>
  );
}