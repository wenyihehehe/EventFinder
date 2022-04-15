import React from 'react';
import style from '../index.module.css';

class UserProfileForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ratings: []
        };
    }

    render(){
        return (
            <div className={`${style.box}`}>
            <p className="secondaryTitleText">My Profile</p>
            <form className="needs-validation" noValidate>
                <label htmlFor="profileImage" className="form-label labelText">Profile Image</label>
                <div className="input-group mb-3">
                    <img className="img" src="illustration.png" alt="profileimage"></img>
                    <input type="file" className="form-control" name="profileImage" />
                </div>
                <label htmlFor="firstName" className="form-label labelText">First Name</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="firstName" />
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <label htmlFor="lastName" className="form-label labelText">Last Name</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="lastName" />
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <label htmlFor="contactNumber" className="form-label labelText">Contact Number</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="contactNumber" />
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <label htmlFor="email" className="form-label labelText">Email Address</label>
                <div className="input-group mb-3">
                    <input type="email" className="form-control" name="email" disabled/>
                </div>
                <button type="submit" className="btn primaryButton mt-1">Save Change</button>
            </form>
            </div>
        );
    }
}

export default UserProfileForm;