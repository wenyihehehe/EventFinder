import React from 'react';
import style from '../index.module.css';
import * as User from '../../../services/user';
import swal from 'sweetalert';

class PasswordForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
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
        event.preventDefault();
        let error = this.validateForm(); 
        if(!error){
            let update = await User.changePassword({
                currentPassword: this.state.currentPassword,
                newPassword: this.state.newPassword,
            });
            if (update.status === "OK"){
                window.location.reload();
            } else {
                let errorMessage = update.detail;
                swal("Error!", errorMessage,  "error");
            }
        } 
    }

    validateForm(){
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation-password-form')
        var error = false;

        const confirmPasswordField = document.getElementById("confirmPassword");
        if(this.state.newPassword !== this.state.confirmPassword){
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

    render(){
        return (
            <div className={`${style.box}`}>
            <p className="secondaryTitleText">Change Password</p>
            <form className="needs-validation-password-form" noValidate>
                <label htmlFor="currentPassword" className="form-label labelText">Current Password</label>
                <div className="input-group mb-3">
                    <input type="password" className="form-control" name="currentPassword" value={this.state.currentPassword} onChange={this.handleInputChange} required />
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <label htmlFor="newPassword" className="form-label labelText">New Password</label>
                <div className="input-group mb-3">
                    <input type="password" className="form-control" name="newPassword" value={this.state.newPassword} onChange={this.handleInputChange} required minLength={8}/>
                    <div className="invalid-feedback">Password should be at least 8 characters.</div>
                </div>
                <label htmlFor="confirmPassword" className="form-label labelText">Confirm Password</label>
                <div className="input-group mb-3">
                    <input type="password" className="form-control" name="confirmPassword" id="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInputChange} required/>
                    <div className="invalid-feedback">New password and confirm password do not match.</div>
                </div>
                <button type="submit" className="btn primaryButton mt-1" onClick={this.handleSubmit}>Save Change</button>
            </form>
            </div>
        );
    }
}

export default PasswordForm;