import React from 'react';
import style from './index.module.css';
import moment from 'moment'

class Ticket extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderDate: new Date(this.props.ticket.orderDateTime),
            eventStartDateTime: new Date(this.props.ticket.event.startDateTime),
        };
    }

    render(){
        const ticket = this.props.ticket;
        return (
        <div className={`${this.props.className} container row ${style.ticketBox} mb-4`} style={{marginLeft: "1rem"}}>
            <div className={`${style.topSection} col-12 row justify-content-between`}>
                <div className="col">
                    <p className="labelText">{ticket.event.title}</p>
                    <p className="detailSubText">{ticket.event.organizer}</p>
                    <p className="detailSubText tonedTextOrange">{moment(this.state.eventStartDateTime).format('MMM Do, dddd [at] LT')}</p>
                </div>
                <p className={`col-4 titleText ${style.date} tonedTextOrange `}>{moment(this.state.eventStartDateTime).format('MMM DD')}</p>
            </div>
            <div className={`${style.bottomSection} col-12 row`}>
                <div className={`${style.borderRight} col-lg-2`}>
                    <p className={`detailMainText`}>OrderID:</p>
                    <p className={`detailSubText`}>#{ticket.id}</p>
                </div>
                <div className={`${style.borderRight} col-lg-4`}>
                    <p className={`detailMainText`}>Ordered at:</p>
                    <p className={`detailSubText`}>{moment(this.state.orderDate).format('MMM Do, dddd [at] LT')}</p>
                </div>
                <div className={`${style.borderRight} col-lg-4`}>
                    <p className={`detailMainText`}>Tickets:</p>
                    {ticket.ticketInfo.map(ticketItem => (
                        <p className={`detailSubText ${style.ticketDetail}`} key={ticketItem.name}>{ticketItem.name} <span>x{ticketItem.amount}</span></p>
                    ))}
                </div>
                <div className={`col-lg-2`}>
                    <button type="button" className="btn primaryButton" style={{borderRadius: "0px"}} onClick={()=> this.props.navigate('/ticket/' + ticket.id)}>More Info</button>
                </div>
            </div>
        </div>
        )
    }
}

export default Ticket;