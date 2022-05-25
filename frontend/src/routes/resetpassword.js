import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router-dom';
import * as Auth from './../services/auth'
import swal from 'sweetalert';
import * as AuthProvider from './../config/authProvider'

export default function ResetPasswordPage() {
    let navigate = useNavigate();
    let authContext = AuthProvider.useAuth();
    let token = new URLSearchParams(useLocation().search).get("token");
    let [password, setPassword] = useState("")
    let [confirmPassword, setConfirmPassword] = useState("")
    let [loading, setLoading] = useState("")

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
            let resetPassword = await Auth.resetPassword({token, password});
            setLoading(false)
            if (resetPassword.status === "OK"){
                swal({
                    title: "Success!",
                    buttons: false,
                    timer: 1000,
                    icon: "success",
                    text: "Your password has been reset. Proceed to login...",
                }).then(()=>{
                    let token = resetPassword.token;
                    authContext.signIn(token, () => {
                        navigate('/login');
                    });
                })
            } else if (resetPassword.password) {
				let errorMessage = resetPassword.password[0];
                if(errorMessage) swal("Error!", errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1), "error");
			} else if (resetPassword.detail) {
				let errorMessage = "You can't reset your password twice using the same link.";
                if(errorMessage) swal("Error!", errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1), "error");
			} else {
				let errorMessage = resetPassword;
                if(errorMessage) swal("Error!", errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1), "error");
			};
        } 
    }

    let validateForm = () => {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation-resetpassword')
        var error = false;

        const confirmPasswordField = document.getElementById("confirmPassword");
        if(password !== confirmPassword){
            confirmPasswordField.setCustomValidity("New password and confirm password do not match");
        } else{
            confirmPasswordField.setCustomValidity("")
        }

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
                        <div className="titleText mb-2">Reset Password</div>
                        <form className="needs-validation-resetpassword ml-0" noValidate>
                            <label htmlFor="newPassword" className="form-label labelText">New Password</label>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" name="newPassword" value={password} onChange={(e)=>setPassword(e.target.value)} disabled={loading} required minLength={8}/>
                                <div className="invalid-feedback">Password should be at least 8 characters.</div>
                            </div>
                            <label htmlFor="confirmPassword" className="form-label labelText">Confirm Password</label>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} disabled={loading} required/>
                                <div className="invalid-feedback">New password and confirm password do not match.</div>
                            </div>
                            <button type="submit" className="btn primaryButton mt-1" style={{width:"100%"}} onClick={handleSubmit} disabled={loading}>{ loading ? "Loading..." : "Continue" }</button>
                        </form>
                    </div>
                </div>
                <div className="row col-12 justify-content-center p-0 m-0 mt-3">
                    <p className="detailSubText">Don't have an account? <Link to="/signup" className={`tonedTextOrange`}>Sign Up</Link></p>
                </div>
            </div>
        </main>
    );
}