import React from 'react';
import { Link } from "react-router-dom";
import style from './index.module.css';
import moment from 'moment'

class EventDescriptionBox extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }

    render(){
        const event = this.props.event;
        return (
            <div className={`${this.props.className} ${style.box} backgroundWhite row detailSubText`}>
                <div className={`col-lg-8 ${style.section}`} style={{borderRight:"0.5px solid #CCCCCC"}}>
                    <p className="headingText">Event Description</p>
                    <div dangerouslySetInnerHTML={{__html:event.description}} style={{lineHeight: "1.5"}}></div>
                </div>
                <div className={`col-lg-4 ${style.section}`}>
                    <div className="mb-3">
                        <p className="headingText">Date & Time</p>
                        <div className="row" style={{margin:"0"}}>
                            <i className="bi bi-clock col-1" style={{padding:"0"}}></i>
                            <p className="col" style={{padding:"0"}}>{moment(event.eventStartDateTime).format('MMM Do, dddd [at] LT')} to {moment(event.endDateTime).format('MMM Do, dddd [at] LT')}</p>
                        </div>
                    </div>
                    <div className="mb-3">
                        <p className="headingText">Location</p>
                        <p>{event.location}</p>
                    </div>
                    {event.images.length >0 && (
                    <div className="mb-3">
                        <p className="headingText">Image</p>
                        <div id="eventImageCarousel" className="carousel slide" data-ride="carousel">
                            <ol className="carousel-indicators">
                                {event.images.map((item, index) => {
                                    return <li key={index} data-target="#eventImageCarousel" data-slide-to={index} className={index === 0 ? "active" : ""}></li>
                                })}
                            </ol>
                            <div className="carousel-inner">
                                {event.images.map((item, index) => {
                                    return (
                                        <div key={index} className={`carousel-item ${index===0 ? "active" : ""}`}>
                                            <img src={item} className="d-block w-100" alt="..."/>
                                        </div>
                                    )
                                })}
                            </div>
                            <button className={`carousel-control-prev ${style.carouselButton}`} type="button" data-target="#eventImageCarousel" data-slide="prev">
                                <i className="bi bi-chevron-left"></i>
                            </button>
                            <button className={`carousel-control-next ${style.carouselButton}`} type="button" data-target="#eventImageCarousel" data-slide="next">
                                <i className="bi bi-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                     )}
                    <div>
                        <p className="headingText">Organized By</p>
                        <div className="row m-0 mb-2">
                            <img className={`${style.profileImage} col-auto p-0 mr-2`} src={event.organizerId.profileImage} alt="organizer profile"></img>
                            <p className="col-auto align-self-center detailMainText p-0">{event.organizerId.organizerName}</p>
                        </div>
                        {/* TODO: LINK TO ORGANIZER PAGE */}
                        <p className="detailMainText">About the organizer:</p>
                        <p className={`${style.descriptionText}`}>{event.organizerId.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default EventDescriptionBox;