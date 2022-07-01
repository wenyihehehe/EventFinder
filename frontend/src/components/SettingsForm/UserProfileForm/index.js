import React from 'react';
import style from '../index.module.css';
import * as User from '../../../services/user';
import swal from 'sweetalert';

class UserProfileForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            profileImage: "",
            firstName: "",
            lastName: "",
            email: "",
            contactNumber: "",
            profileImageInput: "",
        };
        this.getData = this.getData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.onFileSelected = this.onFileSelected.bind(this);
    }

    async getData(){
        let userProfile = await User.getUserProfile()
        let data = userProfile[0]
        this.setState({
            profileImage: data.profileImage,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            contactNumber: data.contactNumber,
        })
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
            let update = await User.updateUserProfile({
                firstName: this.state.firstName, 
                lastName: this.state.lastName, 
                profileImage: this.state.profileImageInput ? this.state.profileImageInput : "", 
                contactNumber: this.state.contactNumber, 
            });
            if (update.data.status === "OK"){
                window.location.reload()
            } else {
                let errorMessage = update.data.detail;
                swal("Error!", errorMessage,  "error");
            }
        } 
    }

    validateForm(){
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation-user-profile')
        var error = false;

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
        .forEach(function (form) {
                if (!form.checkValidity()) error = true;
                form.classList.add('was-validated')
            });

        return error;
    }

    onFileSelected(e) {
        let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = e => {
            this.setState({
                profileImage: e.target.result,
                profileImageInput: image
            });
		};
	}

    componentDidMount(){
        this.getData()
    }

    render(){
        return (
            <div className={`${style.box}`}>
            <p className="secondaryTitleText">My Profile</p>
            <form className="needs-validation-user-profile" noValidate>
                <label htmlFor="profileImage" className="form-label labelText">Profile Image</label>
                <div className="input-group mb-3">
                    <div className="col-12" style={{padding: "0"}}>
                        <img className={`${style.profileImage} img`} src={this.state.profileImage} alt="profileimage"></img>
                    </div>
                    <input type="file" className="form-control-file" name="profileImage" accept="image/*" onChange={this.onFileSelected} />
                </div>
                <label htmlFor="firstName" className="form-label labelText">First Name</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} required/>
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <label htmlFor="lastName" className="form-label labelText">Last Name</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} required/>
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <label htmlFor="contactNumber" className="form-label labelText">Contact Number</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="contactNumber" value={this.state.contactNumber} onChange={this.handleInputChange} required maxLength={11} pattern="[0-9]+"/>
                    <div className="invalid-feedback">This field is invalid.</div>
                </div>
                <label htmlFor="email" className="form-label labelText">Email Address</label>
                <div className="input-group mb-3">
                    <input type="email" className="form-control" name="email" value={this.state.email} disabled/>
                </div>
                <button type="submit" className="btn primaryButton mt-1" onClick={this.handleSubmit}>Save Change</button>
            </form>
            </div>
        );
    }
}

export default UserProfileForm;