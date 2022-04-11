import './index.css';
import React from 'react'
import * as Auth from '../../services/auth';
import swal from 'sweetalert';

class SignUpModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            contactNumber: "",
            email: "",
            password: "",
            privacy: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event){
        event.preventDefault()
        let error = this.validateForm(); 
        if(!error){
            let signup = await Auth.signup({
                email: this.state.email, 
                password: this.state.password, 
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                contactNumber: this.state.contactNumber
            });
            if (signup.status === "OK"){
                console.log("sign up successfully")
            } else {
                let errorMessage = Object.values(signup.detail)[0][0];
                if(signup.detail.email) swal("Error!", errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1), "error");
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
            
        if(!this.state.privacy){
            document.querySelector(".checkmark").classList.add('invalid');
        }

        return error;
    }
    

    render(){
        return (
        <div className="d-flex justify-content-center mt-2">
            <div className="content">
                <div className="title">Sign up with email</div>
                <div className="description mt-1 mb-2">Already have an account? Sign In</div>
                <form className="needs-validation" noValidate>
                    <label htmlFor="firstName" className="form-label label">First Name</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} required maxLength={50} />
                        <div className="invalid-feedback">This field is required.</div>
                    </div>
                    <label htmlFor="lastName" className="form-label label">Last Name</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} required maxLength={50}/>
                        <div className="invalid-feedback">This field is required.</div>
                    </div>
                    <label htmlFor="contactNumber" className="form-label label">Contact Number</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" name="contactNumber" value={this.state.contactNumber} onChange={this.handleInputChange} required maxLength={11}/>
                        <div className="invalid-feedback">This field is required.</div>
                    </div>
                    <label htmlFor="email" className="form-label label">Email Address</label>
                    <div className="input-group mb-3">
                        <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleInputChange} required/>
                        <div className="invalid-feedback">Please provide a valid email.</div>
                    </div>
                    <label htmlFor="password" className="form-label label">Password</label>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleInputChange} required minLength={8}/>
                        <div className="invalid-feedback">Password should be at least 8 characters.</div>
                    </div>
                <label className="checkboxcontainer">
                    I agree to the Terms of Service and Privacy Policy
                    <input type="checkbox" className="form-control" name="privacy" checked={this.state.privacy} onChange={this.handleInputChange} required/>
                    <div className="invalid-feedback">You must agree to Terms of Service and Privacy Policy.</div>
                <span className="checkmark"></span>
                </label>
                <button type="submit" className="btn primaryButton mt-1" style={{width:"100%"}} onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
        )
    }
}

export default SignUpModal;