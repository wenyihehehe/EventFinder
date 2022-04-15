import LoginModal from "../components/LoginModal";
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    let navigate = useNavigate();
    return (
      <main className="container-fluid row" style={{minHeight: "100vh"}}>
        <div className="col-lg-6 pt-5 d-none d-lg-block" style={{backgroundColor : "#0659A8"}}>
          <img className="img-fluid pt-5" src="illustration.png" alt="illustration"></img>
        </div>
        <LoginModal className="col-lg-6 justify-content-center" navigate={navigate}/>
      </main>
    );
  }