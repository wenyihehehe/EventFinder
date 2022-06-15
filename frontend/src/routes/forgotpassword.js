import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import * as Auth from './../services/auth'
import swal from 'sweetalert';

export default function ForgotPasswordPage() {
    let location = useLocation();
    let [email, setEmail] = useState("")
    let [loading, setLoading] = useState("")
    let [nextStep, setNextStep] = useState(false)

    let from = location.state?.from?.pathname || location.state?.from || "/";

    let contentStyle = {
        backgroundColor: '#FDFDFD',
        width: '540px',
        height: 'fit-content',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
        padding: '2.5rem 4rem'
    }

    let handleSubmit = async (event) => {
        event.preventDefault();
        let error = validateForm(); 
        if(!error){
            setLoading(true)
            let forgotPassword = await Auth.forgotPassword({email});
            setLoading(false)
            if (forgotPassword.status === "OK"){
                setNextStep(true);
            } else {
				let errorMessage = forgotPassword.email[0];
                if(errorMessage) swal("Error!", errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1), "error");
            };
        } 
    }

    let validateForm = () => {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation-forgotpassword')
        var error = false;

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
        .forEach(function (form) {
                if (!form.checkValidity()) error = true;
                form.classList.add('was-validated')
            });

        return error;
    }

    return (
        <main className="row justify-content-center mx-auto" style={{height:'90vh'}}>
            <div className="my-auto">
                <div className="row col-12 justify-content-center p-0 m-0 mb-4">
                    <Link to="/"><img className="logo mt-2" src="logo.png" alt="logo"></img></Link>
                </div>
                <div className="row col-12 justify-content-center p-0 m-0 mt-2">
                    <div style={contentStyle}>
                        {nextStep ?
                        <div>
                            <div className="titleText mb-2 text-center">Email Sent</div>
                            <div className="detailSubText mt-2 mb-2 text-center">Please check your inbox for the link to reset your password.</div>
                        </div>
                        :
                        <div>
                            <div className="titleText mb-2">Forgot Password</div>
                            <div className="detailSubText mt-2 mb-2">Enter the email address associated with your account and we'll send you a link to reset your password.</div>
                            <form className="needs-validation-forgotpassword ml-0" noValidate>
                                <label htmlFor="email" className="mt-2 mb-2 form-label labelText">Email Address</label>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} disabled={loading} required/>
                                    <div className="invalid-feedback">Please provide a valid email.</div>
                                </div>
                                <button type="submit" className="btn primaryButton mt-1" style={{width:"100%"}} onClick={handleSubmit} disabled={loading}>{ loading ? "Loading..." : "Continue" }</button>
                            </form>
                        </div>
                        }
                    </div>
                </div>
                <div className="row col-12 justify-content-center p-0 m-0 mt-3">
                    <p className="detailSubText">Don't have an account? <Link to="/signup" state={{ from: from }} className={`tonedTextOrange`}>Sign Up</Link></p>
                </div>
            </div>
        </main>
    );
}