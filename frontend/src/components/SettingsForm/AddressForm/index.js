import React from 'react';
import style from '../index.module.css';

class AddressForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ratings: []
        };
    }

    render(){
        return (
            <div className={`${style.box}`}>
            <p className="secondaryTitleText">Address</p>
            <form className="needs-validation" noValidate>
                <label htmlFor="Address1" className="form-label labelText">Address 1</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="Address1" />
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <label htmlFor="address2" className="form-label labelText">Address 2</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="address2" />
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <label htmlFor="city" className="form-label labelText">City</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="city" />
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <label htmlFor="postalCode" className="form-label labelText">Postal Code</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="postalCode" />
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <label htmlFor="state" className="form-label labelText">State</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="state" />
                    <div className="invalid-feedback">Please provide a valid email.</div>
                </div>
                <label htmlFor="country" className="form-label labelText">Country</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="country" />
                    <div className="invalid-feedback">Please provide a valid email.</div>
                </div>
                <button type="submit" className="btn primaryButton mt-1">Save Change</button>
            </form>
            </div>
        );
    }
}

export default AddressForm;