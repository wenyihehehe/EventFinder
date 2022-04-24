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
        return (
            <div className={`${this.props.className} card ${style.card} col-auto mb-3 mr-4`} style={{ padding:"0"}}>
                <img src={this.props.event.coverImage} className="card-img-top" alt="..." />
                <div className="card-body">
                    <p className="card-subtitle detailMainText mainYellow mb-1">{moment(this.state.eventStartDateTime).format('MMM Do, dddd [at] LT')}</p>
                    <p className={`card-title headingText mb-1 ${style.cardTitle}`}>{this.props.event.title}</p>
                    <p className={`card-text detailSubText subTextColor mb-1 ${style.cardDetail}`}>{this.props.event.location}</p>
                    <p className="card-text detailSubText subTextColor">{this.props.event.pricing}</p>
                    <Link to={`/event/${this.props.event.id}`}><button href="/" className="btn primaryButton" style={{borderRadius: "0px"}}>More info</button></Link>
                </div>
            </div>
        )
    }
}

export default EventCard;