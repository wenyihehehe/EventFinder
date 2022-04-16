import React from 'react';
import style from '../index.module.css';
import * as User from '../../../services/user';
import swal from 'sweetalert';

class AddressForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            address: "",
            address2: "",
            city: "",
            postalCode: "",
            state: "",
            country: "",
        };
        this.getData = this.getData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    async getData(){
        let address = await User.getAddress();
        let data = address[0];
        if(data){
            this.setState({
                address: data.address,
                address2: data.address2,
                city: data.city,
                postalCode: data.postalCode,
                state: data.state,
                country: data.country,
            });
        }
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
            let update = await User.createUpdateAddress({
                address: this.state.address,
                address2: this.state.address2,
                city: this.state.city,
                postalCode: this.state.postalCode,
                state: this.state.state,
                country: this.state.country,
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
        var forms = document.querySelectorAll('.needs-validation-address-form')
        var error = false;

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
        .forEach(function (form) {
                if (!form.checkValidity()) error = true;
                form.classList.add('was-validated')
            });

        return error;
    }

    componentDidMount(){
        this.getData()
    }

    render(){
        return (
            <div className={`${style.box}`}>
            <p className="secondaryTitleText">Address</p>
            <form className="needs-validation-address-form" noValidate>
                <label htmlFor="address" className="form-label labelText">Address</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="address" value={this.state.address} onChange={this.handleInputChange} required />
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <label htmlFor="address2" className="form-label labelText">Address 2</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="address2" value={this.state.address2} onChange={this.handleInputChange} required />
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <label htmlFor="city" className="form-label labelText">City</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="city" value={this.state.city} onChange={this.handleInputChange} required />
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <label htmlFor="postalCode" className="form-label labelText">Postal Code</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="postalCode" value={this.state.postalCode} onChange={this.handleInputChange} required />
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <label htmlFor="state" className="form-label labelText">State</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="state" value={this.state.state} onChange={this.handleInputChange} required />
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <label htmlFor="country" className="form-label labelText">Country</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="country" value={this.state.country} onChange={this.handleInputChange} required />
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <button type="submit" className="btn primaryButton mt-1" onClick={this.handleSubmit}>Save Change</button>
            </form>
            </div>
        );
    }
}

export default AddressForm;