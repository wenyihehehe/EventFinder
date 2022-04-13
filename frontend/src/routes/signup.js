import SignUpModal from "../components/SignUpModal";
import { Link } from "react-router-dom";

export default function SignUpPage() {
    return (
      <main className="container">
        <Link to="/"><img className="logo mt-2" src="logo.png" alt="logo"></img></Link>
        <SignUpModal />
      </main>
    );
  }