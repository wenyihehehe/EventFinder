import React from 'react';
import style from './index.module.css';
import * as User from '../../services/user';
import { Link } from 'react-router-dom'

class OrganizerProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            profileImage: "",
            organizerName: "",
            description: "",
            events: "",
            reviews: ""
        };
        this.getData = this.getData.bind(this);
    }

    async getData(){
        let organizerProfile; 
        let organizerId = this.props.organizerId;
        if(organizerId !== undefined){
            organizerProfile = await User.getOrganizerProfileEventReviewsNoAuth({organizerId})
        } else {
            organizerProfile = await User.getOrganizerProfileEventReviews()
        }
        let data = organizerProfile.data[0]
        this.setState({
            profileImage: data.profileImage,
            organizerName: data.organizerName,
            description: data.description,
            events: data.events,
            reviews: data.reviews,
        })
    }

    componentDidMount(){
        this.getData()
    }

    render(){
        return (
        <div className={`${this.props.className } ${style.box} container row mt-5 pb-3`} style={{width: "85%"}}>
            <img className={`${style.profileImage} col-auto`} src={this.state.profileImage} alt="illustration"></img>
            <div className={`col align-self-center`}>
                <p className="secondaryTitleText importantTextColor mb-1">{this.state.organizerName}&nbsp;{this.props.organizerId ? "" : <Link to='/settings/organizeraccount'><i className="bi bi-pencil-fill" style={{fontSize: 'medium',verticalAlign: 'middle'}}></i></Link>}</p>
                <p className="headingText mb-1">Description:</p>
                <p className="detailMainText mb-2 twoLineTextClamp">{this.state.description ? this.state.description : "Not available"}</p>
                <p className="detailMainText subTextColor">{this.state.events} Organize | {this.state.reviews} Review</p>
            </div>
        </div>
        )
    }
}

export default OrganizerProfile;