import './index.css';
import React from 'react'

class SignUpModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            contactnumber: "",
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

    handleSubmit(event){
        
        this.validateForm();  
        console.log(this.state);
    }

    validateForm(){
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
            });
        
        if(!this.state.privacy){
            document.querySelector(".checkmark").classList.add('invalid');
        }
    }
    

    render(){
        return (
        <div className="d-flex justify-content-center mt-2">
            <div className="content">
                <div className="title">Sign up with email</div>
                <div className="description mt-1 mb-2">Already have an account? Sign In</div>
                <form className="needs-validation" noValidate>
                    <label htmlFor="firstname" className="form-label label">First Name</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" name="firstname" value={this.state.firstname} onChange={this.handleInputChange} required />
                    </div>
                    <label htmlFor="lastname" className="form-label label">Last Name</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" name="lastname" value={this.state.lastname} onChange={this.handleInputChange} required/>
                    </div>
                    <label htmlFor="contactnumber" className="form-label label">Contact Number</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" name="contactnumber" value={this.state.contactnumber} onChange={this.handleInputChange} required/>
                    </div>
                    <label htmlFor="email" className="form-label label">Email Address</label>
                    <div className="input-group mb-3">
                        <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleInputChange} required/>
                    </div>
                    <label htmlFor="password" className="form-label label">Password</label>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleInputChange} required/>
                    </div>
                <label className="checkboxcontainer">
                    I agree to the Terms of Service and Privacy Policy
                    <input type="checkbox" name="privacy" checked={this.state.privacy} onChange={this.handleInputChange} required/>
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