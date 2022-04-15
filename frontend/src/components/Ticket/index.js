import React from 'react';
import style from './index.module.css';
import moment from 'moment'

class UserProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderDate: new Date(this.props.ticket.orderDateTime),
            eventStartDateTime: new Date(this.props.ticket.event.startDateTime),
        };
    }

    render(){
        return (
        <div className={`${this.props.className} container row ${style.ticketBox} mb-5`} style={{marginLeft: "1rem"}}>
            <div className={`${style.topSection} col-12 row justify-content-between`}>
                <div className="col-4">
                    <p className="labelText">{this.props.ticket.event.title}</p>
                    <p className="detailSubText">{this.props.ticket.event.organizer}</p>
                    <p className="detailSubText tonedTextOrange">{moment(this.state.eventStartDateTime).format('MMM Do, dddd, LT')}</p>
                </div>
                <p className={`col-4 titleText ${style.date} tonedTextOrange `}>{moment(this.state.eventStartDateTime).format('MMM DD')}</p>
            </div>
            <div className={`${style.bottomSection} col-12 row`}>
                <div className={`${style.borderRight} col-lg-2`}>
                    <p className={`detailMainText`}>OrderID:</p>
                    <p className={`detailSubText`}>#{this.props.ticket.id}</p>
                </div>
                <div className={`${style.borderRight} col-lg-4`}>
                    <p className={`detailMainText`}>Ordered at:</p>
                    <p className={`detailSubText`}>{moment(this.state.orderDate).format('MMM Do, dddd, LT')}</p>
                </div>
                <div className={`${style.borderRight} col-lg-4`}>
                    <p className={`detailMainText`}>Tickets:</p>
                    {this.props.ticket.ticketInfo.map(ticket => (
                        <p className={`detailSubText ${style.ticketDetail}`} key={ticket.name}>{ticket.name} <span>x{ticket.amount}</span></p>
                    ))}
                </div>
                <div className={`col-lg-2`}>
                    <button type="button" className="btn primaryButton" style={{borderRadius: "0px"}}>More Info</button>
                </div>
            </div>
        </div>
        )
    }
}

export default UserProfile;