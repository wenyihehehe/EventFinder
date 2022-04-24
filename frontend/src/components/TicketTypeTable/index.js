import React from 'react';
import style from './index.module.css';
import Modal from 'react-bootstrap/Modal';
import swal from 'sweetalert';

class TicketTypeTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            type: "",
            price: "",
            quantity: "",
            show: false,
            edit: false,
            index: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDeleteTicketType = this.handleDeleteTicketType.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.addUpdateTicketType = this.addUpdateTicketType.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAddShow = this.handleAddShow.bind(this);
        this.handleEditShow = this.handleEditShow.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    addUpdateTicketType(event){
        event.preventDefault();
        let error = this.validateForm(); 
        if (!error) {
            let ticketType = this.props.ticketType
            if(this.state.edit){
                let id = ticketType[this.state.index].id ?? null
                ticketType[this.state.index] = {
                    name: this.state.name,
                    type: this.state.type,
                    price: this.state.price,
                    quantity: this.state.quantity
                }
                if(id) ticketType[this.state.index].id = id
            } else {
                ticketType.push({
                    name: this.state.name,
                    type: this.state.type,
                    price: this.state.price,
                    quantity: this.state.quantity
                })
            }
            this.props.handleTicketType(ticketType)
            this.handleClose()
        }
    }

    validateForm(){
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation-ticketType-form')
        var error = false;

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
        .forEach(function (form) {
                if (!form.checkValidity()) error = true;
                form.classList.add('was-validated')
            });

        return error;
    }

    handleDeleteTicketType(deleteIndex){
        swal("Confirm delete this ticket type?", {
            buttons: {
              cancel: "Cancel",
              confirm: {
                  text: "Confirm",
                  value: "confirm"
              },
            },
          })
          .then((value) => {
            switch (value) {
              case "confirm":
                this.handleDelete(deleteIndex)
                break;
              default:
                swal.close()
            }
          });
        
    }

    handleDelete(deleteIndex){
        // TODO: For edit event, not create event, delete ticket type should check if event is published and any ticket is sold before deleting 
        // Delete ticket type for published event: remove from current ticket type, get ticketType and save to separate array, send delete request.
        // Parent page should have state to keep track if any deleted tickettype, then create delete request upon saving.
        // Else unsave and refresh page should return the original ticket type.
        const newTicketType = this.props.ticketType.filter((item, index) => index !== deleteIndex);
        this.props.handleTicketType(newTicketType)
    }

    handleClose = () =>{
        this.setState({
            name: "",
            type: "",
            price: "",
            quantity: "",
            show: false,
        })
    }

    handleAddShow = () =>{
        this.setState({
            show: true,
            edit: false
        })
    }

    handleEditShow = (ticket, index) =>{
        this.setState({
            name: ticket.name,
            type: ticket.type,
            price: ticket.price,
            quantity: ticket.quantity,
            show: true,
            edit: true,
            index: index
        })
    }

    render(){
        const ticketTypes = this.props.ticketType;
        return (
        <div className={`${this.props.className} row justify-content-end`} style={{marginLeft: "1rem", marginRight: "0"}}>
            <table className={`table ${style.table} table-borderless backgroundWhite`} style={{border: "0.5px solid rgba(0,0,0,.1)"}}>
                <thead>
                    <tr className="detailMainText" style={{boxShadow: "inset 0px -0.5px 0px #CCCCCC"}}>
                        <th scope="col" style={{paddingLeft: "1.5rem"}}>Ticket Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                {ticketTypes.length > 0 && (
                    ticketTypes.map((ticket, index) => (
                        <tr key={index} style={{boxShadow: "inset 0px -0.5px 0px #E5E5E5"}}>
                            <td className={`${style.verticalCenter}`} style={{paddingLeft: "1.5rem"}}>
                                <p className="detailSubText">{ticket.name}</p>
                            </td>
                            <td className={`${style.verticalCenter}`}>
                                <p className="detailSubText">{ticket.type}</p>
                            </td>
                            <td className={`${style.verticalCenter}`}>
                                <p className="detailSubText">RM{ticket.price}</p>
                            </td>
                            <td className={`${style.verticalCenter}`}>
                                <p className="detailSubText">{ticket.quantity}</p>
                            </td>
                            <td className={`${style.verticalCenter}`}>
                                <div className="dropdown">
                                    <button className={`btn ${style.button}`} type="button" id="dropdownMenu" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-three-dots-vertical"></i>
                                    </button>
                                    <ul className={`dropdown-menu ${style.dropDownMenu}`} aria-labelledby='dropdownMenu'>
                                        <li><button className="dropdown-item detailMainText" type="button" onClick={()=>this.handleEditShow(ticket, index)}>Edit</button></li>
                                        <li><button className="dropdown-item detailMainText" type="button" onClick={()=>this.handleDeleteTicketType(index)}>Delete</button></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))
                    )}
                    {ticketTypes.length <= 0 && (
                    <tr>
                        <td colSpan="3" className="detailSubText" style={{paddingLeft: "1rem"}}>No ticket is found.</td>
                    </tr>
                )}
                </tbody>
            </table>
            <button className="btn primaryButton" type="button" onClick={this.handleAddShow}>Add tickets</button>
            {/* Modal */}
            <Modal show={this.state.show} onHide={this.handleClose} backdrop="static">
                <Modal.Header>
                    <p className="modal-title secondaryTitleText">{this.state.edit ? " Edit Ticket Type" : "Add Ticket Type"}</p>
                    <button type="button" className="close" onClick={this.handleClose} aria-label="Close">
                        <i className="bi bi-x" aria-hidden="true"></i>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <form className="needs-validation-ticketType-form" noValidate style={{margin:"0"}}>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label labelText">Ticket Name:</label>
                            <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleInputChange} required/>
                            <div className="invalid-feedback">This field is required.</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="type" className="form-label labelText">Type:</label>
                            <input type="text" className="form-control" name="type" value={this.state.type} onChange={this.handleInputChange} required/>
                            <div className="invalid-feedback">This field is required.</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price" className="form-label labelText">Price(RM):</label>
                            <input type="number" className="form-control" name="price" value={this.state.price} onChange={this.handleInputChange} required min={0}/>
                            <div className="invalid-feedback">This field is required.</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity" className="form-label labelText">Quantity:</label>
                            <input type="number" className="form-control" name="quantity" value={this.state.quantity} onChange={this.handleInputChange} required min={1}/>
                            <div className="invalid-feedback">This field is required.</div>
                        </div>
                    </form> 
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={this.handleClose}>Close</button>
                    <button type="button" className="btn primaryButton" onClick={this.addUpdateTicketType}>Save changes</button>
                </Modal.Footer>
            </Modal>
        </div>
        )
    }
}

export default TicketTypeTable;