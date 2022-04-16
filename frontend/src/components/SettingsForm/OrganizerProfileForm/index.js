import React from 'react';
import style from '../index.module.css';
import * as User from '../../../services/user';
import swal from 'sweetalert';

class OrganizerProfileForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            profileImage: "",
            organizerName: "",
            contactNumber: "",
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
        let organizerProfile = await User.getOrganizerProfile()
        let data = organizerProfile[0]
        this.setState({
            profileImage: data.profileImage,
            organizerName: data.organizerName,
            contactNumber: data.contactNumber,
            description: data.description,
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
            let update = await User.updateOrganizerProfile({
                organizerName: this.state.organizerName, 
                profileImage: this.state.profileImageInput ? this.state.profileImageInput : "", 
                contactNumber: this.state.contactNumber, 
                description: this.state.description, 
            });
            console.log(update)
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
        var forms = document.querySelectorAll('.needs-validation-organizer-profile')
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
            <p className="secondaryTitleText">My Organizer Profile</p>
            <form className="needs-validation-organizer-profile" noValidate>
                <label htmlFor="profileImage" className="form-label labelText">Profile Image</label>
                <div className="input-group mb-3">
                    <div className="col-12" style={{padding: "0"}}>
                        <img className={`${style.profileImage} img`} src={this.state.profileImage} alt="profileimage"></img>
                    </div>
                    <input type="file" className="form-control" name="profileImage" accept="image/*" onChange={this.onFileSelected} />
                </div>
                <label htmlFor="organizerName" className="form-label labelText">Organizer Name</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="organizerName" value={this.state.organizerName} onChange={this.handleInputChange} required />
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <label htmlFor="contactNumber" className="form-label labelText">Contact Number</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="contactNumber" value={this.state.contactNumber} onChange={this.handleInputChange} required maxLength={11}/>
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <label htmlFor="description" className="form-label labelText">Description</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="description"value={this.state.description} onChange={this.handleInputChange}/>
                </div>
                <button type="submit" className="btn primaryButton mt-1" onClick={this.handleSubmit}>Save Change</button>
            </form>
            </div>
        );
    }
}

export default OrganizerProfileForm;