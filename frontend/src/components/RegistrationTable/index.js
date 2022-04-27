import React from 'react';
import style from './index.module.css';
import * as Event from '../../services/event';
import moment from 'moment'

class RegistrationTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            registrations: [],
            page: 1,
            maxPage: 1
        };
        this.getData = this.getData.bind(this)
        this.handlePageClickChange = this.handlePageClickChange.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
    }

    async getData(){
        let event = await Event.getEventRegistrations({eventId: this.props.eventId, page: this.state.page})
        this.setState({
            registrations: event.data,
            maxPage: event.max
        }, console.log(this.state))
    }

    handlePageClickChange(add){
        if(add){
            let pageNumber = parseInt(this.state.page)+1<=this.state.maxPage ? parseInt(this.state.page)+1 : parseInt(this.state.page)
            this.setState({
                page: pageNumber
            }, ()=> {
                this.getData()
            })
        } else {
            let pageNumber = parseInt(this.state.page)-1<1 ? 1 : parseInt(this.state.page)-1
            this.setState({
                page: pageNumber
            }, ()=> {
                this.getData()
            })
        }
    }

    handlePageChange(e){
        if (!e.target.value) {
            this.setState({
                page: e.target.value
            });
        } else if (e.target.value <= 0) {
            this.setState({
                page: 1
            }, ()=> {
                this.getData()
            });
        } else if (e.target.value <= parseInt(this.state.maxPage)){
            this.setState({
                page: e.target.value
            }, ()=> {
                this.getData()
            })
        } else {
            this.setState({
                page: this.state.maxPage
            }, ()=> {
                this.getData()
            })
        }
    }

    componentDidMount(){
        this.getData()
    }

    render(){
        const registrations = this.state.registrations;
        return (
        <div className={`${this.props.className}`} style={{marginLeft: "1rem"}}>
            <table className={`table ${style.table} table-borderless backgroundWhite`} style={{border: "0.5px solid rgba(0,0,0,.1)"}}>
                <thead>
                    <tr className="detailMainText" style={{boxShadow: "inset 0px -0.5px 0px #CCCCCC"}}>
                        <th scope="col" style={{paddingLeft: "1.5rem"}}>Order</th>
                        <th scope="col">Date</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Amount</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                {registrations.length > 0 && (
                    registrations.map(registration => (
                        <tr key={registration.id} style={{boxShadow: "inset 0px -0.5px 0px #E5E5E5"}}>
                            <td className={`${style.verticalCenter}`} style={{paddingLeft: "1.5rem"}}>
                                <p className="detailSubText">#{registration.id}</p>
                            </td>
                            <td className={`${style.verticalCenter}`}>
                                <p className="detailSubText">{moment(registration.orderDateTime).format("DD/MM/YYYY")}</p>
                            </td>
                            <td className={`${style.verticalCenter}`}>
                                <p className="detailSubText">{registration.name}</p>
                            </td>
                            <td className={`${style.verticalCenter}`}>
                                <p className="detailSubText">{registration.email}</p>
                            </td>
                            <td className={`${style.verticalCenter}`}>
                                <p className="detailSubText">RM{registration.amount}</p>
                            </td>
                            <td className={`${style.verticalCenter}`}>
                                <div className="dropdown">
                                    <button className={`btn ${style.button}`} type="button" id="dropdownMenu" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-three-dots-vertical"></i>
                                    </button>
                                    <ul className={`dropdown-menu ${style.dropDownMenu}`} aria-labelledby='dropdownMenu'>
                                        <li><button className="dropdown-item detailSubText" type="button" onClick={()=>this.props.navigate("/ticket/" + registration.id)}>View</button></li>
                                    </ul>
                                    {/* TODO: Add view complete information page, probably ticket page but with additional user information */}
                                </div>
                            </td>
                        </tr>
                    ))
                    )}
                    {registrations.length <= 0 && (
                    <tr>
                        <td colSpan="3" className="detailSubText" style={{paddingLeft: "1rem"}}>No registration is found.</td>
                    </tr>
                )}
                </tbody>
            </table>
            <nav aria-label="Page navigation">
            <ul className="pagination detailSubText justify-content-center">
                <li className="page-item">
                <button className="page-link" aria-label="Previous" onClick={(e)=> this.handlePageClickChange(false)}>
                    <span aria-hidden="true">&laquo;</span>
                </button>
                </li>
                <li className="page-item"><input type="number" className="page-link" style={{background:"#FFFFFF", color:"#FABA40", width: "3.5rem"}} value={this.state.page} onChange={this.handlePageChange} min="1" max={this.state.maxPage}></input></li>
                <li className="page-item">
                <button className="page-link" aria-label="Next" onClick={(e)=> this.handlePageClickChange(true)}>
                    <span aria-hidden="true">&raquo;</span>
                </button>
                </li>
            </ul>
            </nav>
        </div>
        )
    }
}

export default RegistrationTable;