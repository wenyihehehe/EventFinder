import React from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import * as Auth from '../../services/auth';
import style from './index.module.css';

class LoginModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event){
        event.preventDefault()
        let error = this.validateForm(); 
        if(!error){
            let login = await Auth.login({
                email: this.state.email, 
                password: this.state.password, 
            });
            if (login.non_field_errors){
                let errorMessage = login.non_field_errors[0];
                if(errorMessage) swal("Error!", errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1), "error");
            } else {
                let token = login.token;
                Auth.storeTokenInCookie({ token });
                // TODO: Send back to previous location
                this.props.navigate('/');
                console.log("login successfully")
            };
        } 
    }

    validateForm(){
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')
        var error = false;

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
        .forEach(function (form) {
                if (!form.checkValidity()) error = true;
                form.classList.add('was-validated')
            });

        return error;
    }
    

    render(){
        return (
        <div className={this.props.className}>
            <Link to="/"><img className={ `logo ${style.content} mt-5` } src="logo.png" alt="logo"></img></Link>
            <div className={`${style.content} mt-5 `}>
                <div className="titleText pt-5">Log In</div>
                <div className="detailSubText mt-1 mb-5">Enter your email and password to start discover nearby events.</div>
                <form className="needs-validation" noValidate>
                    <label htmlFor="email" className="form-label labelText">Email Address</label>
                    <div className="input-group mb-3">
                        <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleInputChange} required />
                        <div className="invalid-feedback">This field is required.</div>
                    </div>
                    <label htmlFor="password" className="form-label labelText">Password</label>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleInputChange} required />
                        <div className="invalid-feedback">This field is required.</div>
                    </div>
                    <button type="submit" className="btn primaryButton mt-1 mb-3" style={{width:"100%"}} onClick={this.handleSubmit}>Sign In</button>
                </form>
                <div>
                    <div className="detailSubText mb-1">Don’t have an account? Sign Up</div>
                    <div className="detailSubText mb-1">Forgot Password?</div>
                </div>
            </div>
        </div>
        )
    }
}

export default LoginModal;