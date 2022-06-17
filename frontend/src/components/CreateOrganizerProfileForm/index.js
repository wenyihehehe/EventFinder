import React from 'react';
import style from './index.module.css';
import * as User from "../../services/user";
import * as Util from "../../services/util";
import swal from 'sweetalert';

class CreateOrganizerProfileForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            profileImage: "",
            organizerName: "",
            contactEmail: "",
            description: "",
            profileImageInput: ""
        };
        this.getData = this.getData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.onFileSelected = this.onFileSelected.bind(this);
    }

    async getData(){
        let data = await Util.getDefaultOrganizerProfileImage()
        this.setState({
            profileImage: data.data
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
            let create = await User.createOrganizerProfile({
                organizerName: this.state.organizerName, 
                profileImage: this.state.profileImageInput ? this.state.profileImageInput : "", 
                contactEmail: this.state.contactEmail, 
                description: this.state.description, 
            });
            if (create.data.status === "OK"){
                swal({
                    title: "Success!",
                    buttons: false,
                    timer: 3000,
                    icon: "success",
                    text: "Your organizer profile has been created.",
                }).then(()=>{
                    this.props.navigate(this.props.from, {replace: true});
                })
            } else {
                let errorMessage = Object.values(create.data.detail)[0][0];
                swal("Error!", errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1),  "error");
            }
        } 
    }

    validateForm(){
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation-create-organizer-profile')
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
            <div className={`${style.box}`} >
            <p className="secondaryTitleText">Create Organizer Profile</p>
            <form className="needs-validation-create-organizer-profile" noValidate>
                <label htmlFor="profileImage" className="form-label labelText">Profile Image</label>
                <div className="input-group mb-3">
                    <div className="col-12" style={{padding: "0"}}>
                        <img className={`${style.profileImage} img`} src={this.state.profileImage} alt="profileimage"></img>
                    </div>
                    <input type="file" className=".form-control-file" name="profileImage" accept="image/*" onChange={this.onFileSelected} />
                </div>
                <label htmlFor="organizerName" className="form-label labelText">Organizer Name</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="organizerName" value={this.state.organizerName} onChange={this.handleInputChange} required />
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <label htmlFor="contactEmail" className="form-label labelText">Contact Email</label>
                <div className="input-group mb-3">
                    <input type="email" className="form-control" name="contactEmail" value={this.state.contactEmail} onChange={this.handleInputChange} required/>
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <label htmlFor="description" className="form-label labelText">Description</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="description"value={this.state.description} onChange={this.handleInputChange} maxLength={500} required/>
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <button type="submit" className="btn primaryButton mt-1" onClick={this.handleSubmit}>Create Profile</button>
            </form>
            </div>
        );
    }
}

export default CreateOrganizerProfileForm;