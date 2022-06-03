import React from 'react';
import style from './index.module.css';
import * as User from '../../services/user';
import { Link } from 'react-router-dom'

class UserProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            profileImage: "",
            firstName: "",
            lastName: "",
            email: "",
            events: "",
            registrations: ""
        };
        this.getData = this.getData.bind(this);
    }

    async getData(){
        let userProfile = await User.getUserProfileEventRegistrations()
        let data = userProfile.data[0]
        this.setState({
            profileImage: data.profileImage,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
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
                <p className="secondaryTitleText importantTextColor mb-1">{this.state.firstName} {this.state.lastName}&nbsp;<Link to='/settings/account'><i className="bi bi-pencil-fill" style={{fontSize: 'medium', verticalAlign: 'middle'}}></i></Link></p>
                <p className="headingText mb-2">{this.state.email}</p>
                <p className="detailMainText subTextColor">{this.state.events} Organize | {this.state.registrations} Registration</p>
            </div>
        </div>
        )
    }
}

export default UserProfile;