import React from 'react';
import style from './index.module.css';

class UserProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            eventTitle: "How To DO THIS?",
            organizer: "Memory Malaysia",
            dateTime: "Nov 28th, Sun at 10.30am",
            BigDateTime: "Nov 28",
            orderId: "123456",
            orderTime: "Nov 11st, Thurs, 10.30am",
            tickets: {
                "normal entry" : 1,
                "special entry" : 1
            }
        };

    }

    render(){
        return (
        <div className={`${this.props.className} container row ${style.ticketBox} mb-5`} style={{marginLeft: "5rem"}}>
            <div className={`${style.topSection} col-12 row justify-content-between`}>
                <div className="col-10">
                    <p className="labelText">{this.state.eventTitle}</p>
                    <p className="detailSubText">{this.state.organizer}</p>
                    <p className="detailSubText tonedTextOrange">{this.state.dateTime}</p>
                </div>
                <p className={`col-2 titleText ${style.date} tonedTextOrange `}>{this.state.BigDateTime}</p>
            </div>
            <div className={`${style.bottomSection} col-12 row`}>
                <div className={`${style.borderRight} col-2`}>
                    <p className={`detailMainText`}>OrderID:</p>
                    <p className={`detailSubText`}>#{this.state.orderId}</p>
                </div>
                <div className={`${style.borderRight} col-4`}>
                    <p className={`detailMainText`}>Ordered at:</p>
                    <p className={`detailSubText`}>{this.state.orderTime}</p>
                </div>
                <div className={`${style.borderRight} col-4`}>
                    <p className={`detailMainText`}>Tickets:</p>
                    <p className={`detailSubText ${style.ticketDetail}`}>Normal Entry <span>x1</span></p>
                    <p className={`detailSubText ${style.ticketDetail}`}>Special Entry <span>x1</span></p>
                    
                </div>
                <div className={`col-2`}>
                    <button type="button" class="btn primaryButton" style={{borderRadius: "0px"}}>More Info</button>
                </div>
            </div>
        </div>
        )
    }
}

export default UserProfile;