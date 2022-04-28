import React from 'react';
import style from './index.module.css';
import * as Attendee from '../../services/attendee';
import swal from 'sweetalert';

class AttendanceTable extends React.Component{
    constructor(props){
        super(props);
        this.toggleAttend = this.toggleAttend.bind(this);
        this.handleToggleAttend = this.handleToggleAttend.bind(this);
    }

    toggleAttend(id){
        const tickets = this.props.tickets;
        let attendingTicket = tickets.find((ticket) => ticket.id === id)
        if (attendingTicket.status){
            swal("Confirm unattend this attendee?", {
                buttons: {
                  cancel: {
                    text:"Cancel",
                    value: "cancel",
                    className: "secondaryButton",
                    visible: true,
                    closeModal: true
                  },
                  confirm: {
                    text: "Confirm",
                    value: "confirm"
                  },
                },
                icon: "warning"
              })
              .then((value) => {
                switch (value) {
                  case "confirm":
                    this.handleToggleAttend(id, !attendingTicket.status)
                    break;
                  default:
                    swal.close()
                }
              });
        } else {
            this.handleToggleAttend(id, !attendingTicket.status)
        }
    }

    async handleToggleAttend(id, status){
        await Attendee.updateAttendance({id, status})
        this.props.getData()
    }

    render(){
        const tickets = this.props.tickets;
        return (
        <div className={`${this.props.className} backgroundWhite`}style={{border: "0.5px solid rgba(0,0,0,.1)", padding:"0"}}>
            <table className={`table table-borderless`} style={{margin: "0"}}>
                <thead>
                    <tr className="detailMainText" style={{boxShadow: "inset 0px -0.5px 0px #CCCCCC"}}>
                        <th scope="col" style={{paddingLeft: "1.5rem"}}>Order</th>
                        <th scope="col">Name</th>
                        <th scope="col">Ticket Type</th>
                        <th scope="col">Attendance</th>
                    </tr>
                </thead>
                <tbody>
                {tickets.length > 0 && (
                    tickets.map(ticket => (
                        <tr key={ticket.id} style={{boxShadow: "inset 0px -0.5px 0px #E5E5E5"}}>
                            <td className={`${style.verticalCenter}`} style={{paddingLeft: "1.5rem"}}>
                                <p className="detailSubText">#{ticket.registrationId}</p>
                            </td>
                            <td className={`${style.verticalCenter}`}>
                                <p className="detailSubText">{ticket.purchaser}</p>
                            </td>
                            <td className={`${style.verticalCenter}`}>
                                <p className="detailSubText">{ticket.ticketType}</p>
                            </td>
                            <td className={`${style.verticalCenter}`}>
                                <label className="checkboxcontainer" style={{marginBottom:"1.5rem"}}>
                                    <input type="checkbox" className="form-control" name="status" checked={ticket.status} onChange={()=> this.toggleAttend(ticket.id)}/>
                                <span className="checkmark"></span>
                                </label>
                            </td>
                        </tr>
                    ))
                    )}
                    {tickets.length <= 0 && (
                    <tr>
                        <td colSpan="4" className="detailSubText" style={{paddingLeft: "1rem"}}>No attendee is found.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
        )
    }
}

export default AttendanceTable;