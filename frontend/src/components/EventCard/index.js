import React from 'react';
import { Link } from "react-router-dom";
import style from './index.module.css';
import moment from 'moment'

class EventCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            eventStartDateTime: new Date(this.props.event.startDateTime),
        };
    }

    render(){
        const event = this.props.event;
        return (
            <div className={`${this.props.className} card ${style.card}  mb-3 mr-4`} style={{ padding:"0"}}>
                <img src={event.coverImage} className="card-img-top" alt="..." />
                <div className="card-body">
                    <p className="card-subtitle detailMainText mainYellow mb-1">{moment(this.state.eventStartDateTime).format('MMM Do, dddd [at] LT')}</p>
                    <p className={`card-title headingText mb-1 ${style.cardTitle}`}>{event.title ?? "Event title not available"}</p>
                    <p className={`card-text detailSubText subTextColor mb-1 ${style.cardDetail}`}>{event.location ?? "Location not available"}</p>
                    <p className="card-text detailSubText subTextColor">{event.pricing ? "Starts from " + event.pricing : "Ticket not available"}</p>
                    <div className="row m-0">
                        <img className={`${style.profileImage} col-auto p-0 mr-2`} src={event.organizerProfileImage} alt="event"></img>
                        <p className="card-text detailMainText col-auto p-0" style={{lineHeight: "1.5"}}>{event.organizerName}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default EventCard;