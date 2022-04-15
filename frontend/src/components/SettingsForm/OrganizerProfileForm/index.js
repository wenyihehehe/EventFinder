import React from 'react';
import style from '../index.module.css';

class OrganizerProfileForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ratings: []
        };
    }

    render(){
        return (
            <div className={`${style.box}`}>
            <p className="secondaryTitleText">My Organizer Profile</p>
            <form className="needs-validation" noValidate>
                <label htmlFor="profileImage" className="form-label labelText">Profile Image</label>
                <div className="input-group mb-3">
                    <img className="img" src="illustration.png" alt="profileimage"></img>
                    <input type="file" className="form-control" name="profileImage" />
                </div>
                <label htmlFor="organizerName" className="form-label labelText">Organizer Name</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="organizerName" />
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <label htmlFor="contactNumber" className="form-label labelText">Contact Number</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="contactNumber" />
                    <div className="invalid-feedback">This field is required.</div>
                </div>
                <label htmlFor="description" className="form-label labelText">Description</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="description"/>
                </div>
                <button type="submit" className="btn primaryButton mt-1">Save Change</button>
            </form>
            </div>
        );
    }
}

export default OrganizerProfileForm;