import React from "react";
import Modal from 'react-bootstrap/Modal';
import * as Attendee from '../../services/attendee'
import style from './index.module.css';
import swal from 'sweetalert';

class ReviewModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rating: 0,
            comment: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getRatings = this.getRatings.bind(this);
    }

    async handleSubmit(event){
        event.preventDefault()
        let error = this.validateForm(); 
        if(!error){
            let review = await Attendee.createReview({
                registrationId: this.props.registrationId,
                rating: this.state.rating,
                comment: this.state.comment
            });
            this.props.handleClose()
            swal({
                title: "Success!",
                buttons: false,
                timer: 3000,
                icon: "success",
                text: "Your review has been submitted.",
            })
        } 

    }

    validateForm(){
        // Remove invalidFeedback
        document.querySelector(".invalidFeedback").classList.remove('invalid');
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation-review-form')
        var error = false;

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
        .forEach(function (form) {
                if (!form.checkValidity()) error = true;
                form.classList.add('was-validated')
            });
        
        if(this.state.rating <= 0){
            document.querySelector(".invalidFeedback").classList.add('invalid');
            error = true;
        }

        return error;
    }

    getRatings(){
        let rating = this.state.rating;
        let ratings = [];
        for (var i = 0; i < 5; i += 1) {
            let value = i + 1;
            let item = <i  className={`${rating > 0 ? "bi bi-star-fill" : "bi bi-star"} ${style.star}`} key={i} onClick={()=>{this.setRating(value)}}></i>
            ratings.push(item);
            rating -= 1;
        }
        return ratings
    }

    setRating(value){
        // Remove invalidFeedback
        document.querySelector(".invalidFeedback").classList.remove('invalid');

        this.setState({
            rating: value
        })
    }

    render(){
        const title = this.props.event.title
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose} backdrop="static">
                <Modal.Header>
                    <div className="mx-auto">
                        <p className="modal-title headingText text-center">Review: {title}</p>
                    </div>
                    <button type="button" className="close ml-0" onClick={this.props.handleClose} aria-label="Close">
                        <i className="bi bi-x" aria-hidden="true"></i>
                    </button>
                </Modal.Header>
                <Modal.Body className="pl-5 pr-5">
                    <form className="needs-validation-review-form" noValidate style={{margin:"0"}}>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label detailMainText">Rate:</label>
                            <br/>
                            {this.getRatings()}
                            <div className="invalidFeedback">This field is required.</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="type" className="form-label detailMainText mb-2">Comment:</label>
                            <textarea className="form-control detailSubText" value={this.state.comment} style={{resize: "none", height: "10rem"}} onChange={(e)=> this.setState({comment: e.target.value})} required></textarea>
                            <div className="invalid-feedback ml-1">This field is required.</div>
                        </div>
                    </form>
                    <div className="mx-auto" style={{width:"fit-content"}}>
                        <button type="button" className="btn primaryButton" style={{width: "100px"}} onClick={this.handleSubmit}>Submit</button>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ReviewModal;