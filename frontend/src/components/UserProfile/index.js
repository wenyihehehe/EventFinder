import React from 'react';
import style from './index.module.css';

class UserProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            profileImage: "https://www.giantbomb.com/a/uploads/scale_small/0/598/181848-maggie.gif",
            name: "Bryan",
            email: "bryan123@gmail.com",
            organize: "7",
            registration: "1"
        };

    }

    render(){
        return (
        <div className={`${this.props.className } ${style.box} container row mt-5 pb-3`}>
            <img className={`${style.profileImage} col-auto`} src={this.state.profileImage} alt="illustration"></img>
            <div className={`col-auto align-self-center`}>
                <p className="secondaryTitleText importantTextColor mb-1">{this.state.name}</p>
                <p className="headingText mb-2">{this.state.email}</p>
                <p className="detailMainText subTextColor">{this.state.organize} Organize | {this.state.registration} Registration</p>
            </div>
        </div>
        )
    }
}

export default UserProfile;