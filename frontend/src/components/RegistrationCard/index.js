import React from 'react';
import style from './index.module.css';
import moment from 'moment'

class RegistrationCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: 1,
            amount: 10,
            name: "John",
            email: "john123@gmail.com",
            orderDateTime: "2021-03-10T01:50:55+0200",
            tickets: [
                {
                    name: "Normal Entry",
                    quantity: "3",
                    amount: "0"
                }
            ]
        };
    }

    render(){
        const registration = this.props.registration;
        const tickets = registration.ticketType;
        return (
            <div className={`${this.props.className} container row ${style.ticketBox}`}>
                <div className={`${style.topSection}`}> 
                    <p className="secondaryTitleText tonedTextOrange">Order #{registration.id}</p>
                    <p className="detailSubText">Ordered by: <span className="tonedTextOrange">{registration.name} ({registration.email})</span></p>
                    <p className="detailSubText">Ordered at: <span className="tonedTextOrange">{moment(registration.orderDateTime).format('DD/MM/YYYY LT')}</span></p>
                </div>
                <div className="col-12" style={{padding:"0"}}>
                <table className={`table ${style.table} table-borderless backgroundWhite`} style={{border: "0.5px solid rgba(0,0,0,.1)", margin: "0"}}>
                    <thead>
                        <tr className="detailMainText" style={{boxShadow: "inset 0px -0.5px 0px #CCCCCC"}}>
                            <th scope="col" style={{paddingLeft: "1.5rem"}}>Tickets</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tickets.length > 0 && (
                        tickets.map((ticket, index) => (
                            <tr key={index} style={{boxShadow: "inset 0px -0.5px 0px #E5E5E5"}}>
                                <td className={`${style.verticalCenter}`} style={{paddingLeft: "1.5rem"}}>
                                    <p className="detailSubText">{ticket.name}</p>
                                </td>
                                <td className={`${style.verticalCenter}`}>
                                    <p className="detailSubText">{ticket.quantity}</p>
                                </td>
                                <td className={`${style.verticalCenter}`}>
                                    <p className="detailSubText">RM{ticket.amount}</p>
                                </td>
                            </tr>
                        ))
                    )}
                    <tr className="detailMainText">
                        <td colSpan="2" style={{textAlign: "end"}}>Total:</td>
                        <td colSpan="1">RM{registration.amount}</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}

export default RegistrationCard;