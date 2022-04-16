import React from 'react';
import style from './index.module.css';
import * as User from '../../services/user';

class UserProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            profileImage: "",
            organizerName: "",
            description: "",
            events: "",
            registrations: ""
        };
        this.getData = this.getData.bind(this);
    }

    async getData(){
        let organizerProfile = await User.getOrganizerProfileEventRegistrations()
        let data = organizerProfile.data[0]
        this.setState({
            profileImage: data.profileImage,
            organizerName: data.organizerName,
            description: data.description,
            events: data.events,
            registrations: data.registrations,
        })
    }

    componentDidMount(){
        this.getData()
    }

    render(){
        return (
        <div className={`${this.props.className } ${style.box} container row mt-5 pb-3`} style={{width: "85%"}}>
            <img className={`${style.profileImage} col-auto`} src={this.state.profileImage} alt="illustration"></img>
            <div className={`col-auto align-self-center`}>
                <p className="secondaryTitleText importantTextColor mb-1">{this.state.organizerName}</p>
                <p className="headingText mb-1">Description:</p>
                <p className="detailMainText mb-2">{this.state.description ? this.state.description : "Not available"}</p>
                <p className="detailMainText subTextColor">{this.state.events} Organize | {this.state.registrations} Registration</p>
            </div>
        </div>
        )
    }
}

export default UserProfile;