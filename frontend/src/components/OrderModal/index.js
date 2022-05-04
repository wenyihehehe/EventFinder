import React from "react";
import Modal from 'react-bootstrap/Modal';
import * as Event from '../../services/event'
import * as Attendee from '../../services/attendee'
import style from './index.module.css';
import swal from 'sweetalert';

class OrderModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: "How To Improve Your Memory - Talk by Sam Jonas & Andrew",
            organizerName: "Memory Malaysia",
            ticketType: [],
            num: Array.from({length: 10}, (_, i) => i + 1),
            order: []
        };
        this.getData = this.getData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getTotal = this.getTotal.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    async getData(){
        let event = await Event.getEventTicketType({eventId: this.props.eventId})
        this.setState({
            title: event.data.title,
            organizerName: event.data.organizerName,
            ticketType: event.data.ticketType
        })
    }

    handleChange(item, e){
        const quantity = parseInt(e.target.value);
        let orderExists = this.state.order.find((order) => order.id === item.id)
        if(!orderExists){
            let orderItem = {
                id: item.id,
                name: item.name,
                quantity: quantity,
                price: item.price,
            }
            this.setState(prevState => ({
                order: [...prevState.order, orderItem]
            }))
        } else if (quantity === 0){
            let currentOrder = this.state.order.filter((order) => order.id !== item.id);
            this.setState({
                order: currentOrder
            })
        } else {
            let index = this.state.order.findIndex((order => order.id === item.id));
            let currentOrder = this.state.order;
            currentOrder[index].quantity = quantity;
            this.setState({
                order: currentOrder
            })
        }
    } 

    getTotal(){
        const total = this.state.order.reduce(
            (totalValue, order) => totalValue + (order.quantity * order.price),
            0);
        return total;
    }

    async handleRegister(){
        if(this.state.order.length === 0){
            return;
        }
        let createRegistration = await Attendee.createRegistration({eventId: this.props.eventId})
        if (createRegistration.status === "OK"){
            await Attendee.createTicket({
                registrationId: createRegistration.data.id, 
                order: this.state.order
            })
            swal({
                title: "Success!",
                buttons: false,
                timer: 3000,
                icon: "success",
                text: "Your registration has been confirmed.",
            }).then(()=>{
                this.props.navigate('/ticket/'+ createRegistration.data.id);
            })
        } else {
            let errorMessage = createRegistration.detail;
            swal("Error!", errorMessage,  "error");
        }
    }

    componentDidMount(){
        this.getData()
    }

    render(){
        const ticketType = this.state.ticketType;
        const num = this.state.num;
        const order = this.state.order;
        // TODO: IF NO LOGIN, THEN MUST GO BACK LOGIN FIRST
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose} backdrop="static" size="lg">
                <Modal.Header>
                    <div className="mx-auto">
                        <p className="modal-title secondaryTitleText  text-center">{this.state.title}</p>
                        <p className="text-center">organized by: {this.state.organizerName}</p>
                    </div>
                    <button type="button" className="close ml-0" onClick={this.props.handleClose} aria-label="Close">
                        <i className="bi bi-x" aria-hidden="true"></i>
                    </button>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div className="row m-0">
                        <div className="col-lg-8 p-3 pl-4 pr-4" style={{boxShadow: "inset -0.5px 0px 0px #CCCCCC"}}>
                            <p className="headingText mb-3">Ticket Type</p>
                            {ticketType.length > 0 && (
                            ticketType.map((item,index) => (
                                <div key={item.id} className={`row m-0 ${index !== 0 ? "pt-3" : ""} pb-2`} style={index !== 0 ? {boxShadow: "inset 0px 0.5px 0px #CCCCCC"} : {}}>
                                    <div className="col">
                                        <p className="detailMainText">{item.name}</p>
                                        <p className="detailSubText subTextColor">{item.price === '0' ? "Free" : "RM" + item.price }</p>
                                    </div>
                                    <div className="col-auto">
                                        <select defaultValue={0} className={`form-select ${style.selectInput}`} onChange={(e)=>this.handleChange(item, e)}>
                                            <option key={0} value="0">0</option>
                                            {
                                                num.map(item => (
                                                    <option key={item} value={item}>{item}</option>
                                                    ))
                                                }
                                        </select>
                                    </div>
                                </div>
                            ))
                            )}
                        </div>
                        <div className="col-lg-4 p-3 pl-4 pr-4" style={{background:"#F8F8FA"}}>
                            <p className="headingText">Order Summary</p>
                            {order.length > 0 && (
                                <div className="pl-3 pr-3 pt-2 pb-2" style={{boxShadow: "inset 0px -0.5px 0px #CCCCCC"}}>
                                    {order.map(item => (
                                        <p key={item.id} className="detailMainText">{item.quantity} x {item.name} <span style={{float: "right"}}>RM{item.quantity*item.price}</span></p>
                                    ))}
                                </div>
                            )}
                            {order.length > 0 ? (
                                <p className="headingText p-3">Total <span style={{float:"right"}}>RM{this.getTotal()}</span></p>
                            ): <p className="detailSubText pl-3">Cart is empty</p>}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn primaryButton mx-auto" onClick={this.handleRegister}>Register Now</button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default OrderModal;