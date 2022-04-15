import React from 'react';
import style from '../index.module.css';

class PasswordForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ratings: []
        };
    }

    render(){
        return (
            <div className={`${style.box}`}>
            <p className="secondaryTitleText">Change Password</p>
            <form className="needs-validation" noValidate>
                <label htmlFor="currentPassword" className="form-label labelText">Current Password</label>
                <div className="input-group mb-3">
                    <input type="password" className="form-control" name="currentPassword" required />
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <label htmlFor="newPassword" className="form-label labelText">New Password</label>
                <div className="input-group mb-3">
                    <input type="password" className="form-control" name="newPassword" required minLength={8}/>
                    <div className="invalid-feedback">Password should be at least 8 characters.</div>
                </div>
                <label htmlFor="currentPassword" className="form-label labelText">Current Password</label>
                <div className="input-group mb-3">
                    <input type="password" className="form-control" name="password" required/>
                    <div className="invalid-feedback">New password and confirm password do not match.</div>
                </div>
                <button type="submit" className="btn primaryButton mt-1">Save Change</button>
            </form>
            </div>
        );
    }
}

export default PasswordForm;