import React from 'react';
import style from './index.module.css';
import * as Event from '../../services/event';
import moment from 'moment'
import swal from 'sweetalert';

class DashboardTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            events: [],
        };
        this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
    }

    async handleDeleteEvent(id){
        let event = await Event.deleteEvent({id});
        if (event.data.status === "OK"){
            this.getData();
        } else {
            let errorMessage = event.data.detail;
            swal("Error!", errorMessage,  "error");
        }
    }

    render(){
        const events = this.props.organizingEvents;
        return (
        <div className={`this.props.className ${style.box} backgroundWhite`}>
            <table className={`table ${style.table} table-borderless`}>
                <thead>
                    <tr className="headingText" style={{boxShadow: "inset 0px -0.5px 0px #CCCCCC"}}>
                        <th scope="col" style={{paddingLeft: "1.5rem"}}>Event</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                {events.length > 0 && (
                    events.map(event => (
                        <tr key={event.id} style={{boxShadow: "inset 0px -0.5px 0px #E5E5E5"}}>
                            <td className={`row justify-content-start ${style.verticalCenter}`}>
                                <div className="col-auto">
                                    <p className={`titleText ${style.date} tonedTextOrange `}>{moment(event.startDateTime).format('MMM DD')}</p>
                                </div>
                                <div className="col-auto">
                                    <img className={`${style.image}`} src={event.coverImage} alt="event"/>
                                </div>
                                <div className="col-auto">
                                    <p className="labelText">{event.title}</p>
                                    <p className="detailSubText subTextColor mb-1">{moment(event.startDateTime).format('MMM Do, dddd, LT')}</p>
                                    <p className="detailSubText subTextColor">{event.location}</p>
                                </div>
                            </td>
                            <td className={`${style.verticalCenter}`}>
                                <p className="detailMainText">{event.status}</p>
                            </td>
                            <td className={`${style.verticalCenter}`}>
                                <div className="dropdown">
                                    <button className={`btn ${style.button}`} type="button" id="dropdownMenu" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-three-dots-vertical"></i>
                                    </button>
                                    <ul className={`dropdown-menu ${style.dropDownMenu}`} aria-labelledby='dropdownMenu'>
                                        <li><button className="dropdown-item detailMainText" type="button" onClick={()=>this.props.navigate('/dashboard/manage/' + event.id)}>Edit</button></li>
                                        <li><button className="dropdown-item detailMainText" type="button" onClick={()=>this.handleDeleteEvent(event.id)}>Delete</button></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))
                    )}
                    {events.length <= 0 && (
                    <tr>
                        <td colSpan="3" className="detailSubText" style={{paddingLeft: "1rem"}}>No event is found.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
        )
    }
}

export default DashboardTable;