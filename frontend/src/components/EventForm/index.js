import React from 'react';
import style from './index.module.css';
import swal from 'sweetalert';
import * as Util from '../../services/util';
import * as Event from '../../services/event';
import moment from 'moment';
import RichTextEditor from '../RichTextEditor';
import TicketTypeTable from '../TicketTypeTable';

class EventForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categoryOption: [],
            title: "",
            coverImage: "",
            coverImageInput: "",
            category: "",
            description: "",
            images: [],
            imageInput: [],
            type: "physical", //default
            location: "",
            startDateTime: "",
            endDateTime: "",
            ticketType: [],
        };
        this.getData = this.getData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePublish = this.handlePublish.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.onCoverImageFileSelected = this.onCoverImageFileSelected.bind(this);
        this.onEventsImageFileSelected = this.onEventsImageFileSelected.bind(this);
        this.handleTextEditor = this.handleTextEditor.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
        this.handleTicketType = this.handleTicketType.bind(this);
    }

    async getData(){
        // Get category option
        let category = await Util.getCategory()
        let data = category.data;
        this.setState({
            categoryOption: data
        });
        // Get default cover image
        data = await Util.getDefaultCoverImage()
        this.setState({
            coverImage: data.data
        })
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handlePublish(event){
        event.preventDefault();
        let error = this.validateForm(); 
        if(!error){
            let create = await Event.createEvent({
                title: this.state.title,
                coverImage: this.state.coverImageInput ? this.state.coverImageInput : "",
                category: this.state.category,
                description: this.state.description,
                type: this.state.type,
                location: this.state.location,
                startDateTime: this.state.startDateTime,
                endDateTime: this.state.endDateTime,
                status: "Published",
            });
            if (create.data.status === "OK"){
                if(this.state.imageInput.length){
                    let createEventImage = await Event.createEventImage({
                        eventId: create.data.data.id,
                        images: this.state.imageInput
                    })
                }
                if(this.state.ticketType.length){
                    let createTicketType = await Event.createUpdateTicketType({
                        eventId: create.data.data.id,
                        ticketTypes: this.state.ticketType
                    })
                }
                this.props.navigate('/dashboard/manage/' + create.data.data.id)
            } else {
                let errorMessage = create.data.detail;
                swal("Error!", errorMessage,  "error");
            }
        } 
    }

    async handleSave(event){
        event.preventDefault();
        // Remove invalid feedback if any
        var forms = document.querySelectorAll('.needs-validation-event-form')
        Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.classList.remove('was-validated');
            });
        document.querySelector(".invalidFeedback").classList.remove('invalid');
        // Create event
        let create = await Event.createEvent({
            title: this.state.title,
            coverImage: this.state.coverImageInput ? this.state.coverImageInput : "",
            category: this.state.category,
            description: this.state.description,
            type: this.state.type,
            location: this.state.location,
            startDateTime: this.state.startDateTime,
            endDateTime: this.state.endDateTime,
        });
        if (create.data.status === "OK"){
            if(this.state.imageInput.length){
                let createEventImage = await Event.createEventImage({
                    eventId: create.data.data.id,
                    images: this.state.imageInput
                })
            }
            if(this.state.ticketType.length){
                let createTicketType = await Event.createUpdateTicketType({
                    eventId: create.data.data.id,
                    ticketTypes: this.state.ticketType
                })
            }
            this.props.navigate('/dashboard/manage/' + create.data.data.id)
        } else {
            let errorMessage = create.data.detail;
            swal("Error!", errorMessage,  "error");
        }
    }

    validateForm(){
        // Remove invalidFeedback
        document.querySelector(".invalidFeedback").classList.remove('invalid');

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation-event-form')
        var error = false;

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
        .forEach(function (form) {
                if (!form.checkValidity()) error = true;
                form.classList.add('was-validated')
            });

        if(!this.state.ticketType.length){
            document.querySelector(".invalidFeedback").classList.add('invalid');
            error = true;
        }

        return error;
    }

    onCoverImageFileSelected(e) {
        let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = e => {
            this.setState({
                coverImage: e.target.result,
                coverImageInput: image
            });
		};
	}

    onEventsImageFileSelected(e) {
        for (var i = 0; i < e.target.files.length; i++){
            let image = e.target.files[i];
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[i]);
            reader.onload = e => {
                this.setState(prevState => ({
                    images: [...prevState.images, e.target.result],
                    imageInput: [...prevState.imageInput, image]
                }))
            }
        }
    }

    deleteFile(deleteIndex) {
        const newImages = this.state.images.filter((item, index) => index !== deleteIndex);
        const newImageInput = this.state.imageInput.filter((item, index) => index !== deleteIndex);
        this.setState({
            images: newImages,
            imageInput: newImageInput
        })
    }

    handleTextEditor(data){
        this.setState({description: data})
    }

    handleTicketType(data){
        this.setState({
            ticketType: data
        });
        document.querySelector(".invalidFeedback").classList.remove('invalid');
    }

    componentDidMount(){
        this.getData()
    }

    render(){
        const minDate = moment().format("YYYY-MM-DDThh:mm");
        return (
            <div className={`${style.box}`}>
                <section>
                    <p className="secondaryTitleText">Basic Information</p>
                    <form className="needs-validation-event-form" noValidate>
                        <label htmlFor="title" className="form-label labelText">Event Title</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleInputChange} required />
                            <div className="invalid-feedback">This field is required.</div>
                        </div>
                        <label htmlFor="coverImage" className="form-label labelText">Event Cover Image</label>
                        <div className="input-group mb-3">
                            <div className="col-12" style={{padding: "0"}}>
                                <img className={`${style.coverImage} img`} src={this.state.coverImage} alt="coverImage"></img>
                            </div>
                            <input type="file" className=".form-control-file" name="coverImageInput" accept="image/*" onChange={this.onFileSelected} style={{backgroundColor: "transparent"}}/>
                        </div>
                        <label htmlFor="category" className="form-label labelText">Category</label>
                        <div className="input-group mb-3">
                            <select className="custom-select form-control" value={this.state.category} onChange={this.handleInputChange} required>
                                {this.state.categoryOption.map((option)=>(
                                    <option value={option} key={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </form>
                </section>
                <section>
                    <p className="secondaryTitleText">Description</p>
                    <form className="needs-validation-event-form" noValidate>
                        <label htmlFor="description" className="form-label labelText">Event Detail</label>
                        <div className="input-group mb-3">
                            <RichTextEditor handleEvent={this.handleTextEditor} value={this.state.description}/>
                        </div>
                        <label htmlFor="image" className="form-label labelText">Event images</label>
                        <div className="input-group mb-3">
                            <div className="form-group preview col-12 row" style={{padding:"0", margin:"0"}}>
                                {this.state.images.length > 0 &&
                                this.state.images.map((item, index) => {
                                    return (
                                    <div key={`${item + index}`} className="mb-3" style={{padding:"0", margin:"0", position:"relative"}}>
                                        <img className={`${style.eventImage} img`} src={item} alt="eventimages" />
                                        <br/>
                                        <button className={`btn ${style.removeButton}`} type="button" onClick={() => this.deleteFile(index)}><i className="bi bi-x"></i></button>
                                    </div>
                                    );
                                })}
                            </div>
                            <div className="form-group col" style={{padding:"0", margin:"0"}}>
                                <input type="file" disabled={this.state.images.length === 3} className=".form-control-file" accept="image/*"
                                onChange={this.onEventsImageFileSelected} style={{backgroundColor: "transparent"}} multiple/>
                            </div>
                        </div>
                    </form>
                </section>
                <section>
                    <p className="secondaryTitleText">Location</p>
                    <form className="needs-validation-event-form" noValidate>
                        <label htmlFor="type" className="form-label labelText">Type</label>
                        <div className="input-group mb-3">
                            <button className={`btn ${this.state.type === "physical" ? "primaryButton" : "outlinedButton"} mr-3 ${style.typeButton}`} type="button" value="physical" onClick={(e)=> this.setState({type: e.target.value})}>Physical</button>
                            <button className={`btn ${this.state.type === "online" ? "primaryButton" : "outlinedButton"} ${style.typeButton}`} type="button" value="online" onClick={(e)=> this.setState({type: e.target.value})}>Online</button>
                        </div>
                        <label htmlFor="location" className="form-label labelText">Location</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" name="location" value={this.state.location} onChange={this.handleInputChange} required />
                            <div className="invalid-feedback">This field is required.</div>
                        </div>
                    </form>
                </section>
                <section>
                    <p className="secondaryTitleText">Date and Time</p>
                    <form className="needs-validation-event-form" noValidate>
                        <label htmlFor="startDateTime" className="form-label labelText">Event Start Date</label>
                        <div className="input-group mb-3">
                            <input type="datetime-local" className="form-control" name="startDateTime" value={this.state.startDateTime} onChange={this.handleInputChange} required min={minDate}/>
                            <div className="invalid-feedback">This field is required.</div>
                        </div>
                        <label htmlFor="endDateTime" className="form-label labelText">Event End Date</label>
                        <div className="input-group mb-3">
                            <input type="datetime-local" className="form-control" name="endDateTime" value={this.state.endDateTime} onChange={this.handleInputChange} required min={this.state.startDateTime || minDate}/>
                            <div className="invalid-feedback">This field is required.</div>
                        </div>
                    </form>
                </section>
                <section className="mb-3">
                    <p className="secondaryTitleText">Ticket</p>
                    <TicketTypeTable ticketType={this.state.ticketType} handleTicketType={this.handleTicketType}/>
                    <div className="invalidFeedback" style={{marginLeft: "1rem"}}>At least one ticket type should be created.</div>
                </section>
                <button type="submit" className="btn secondaryButton mt-1 mr-3" onClick={this.handleSave}>Save as Draft</button>
                <button type="submit" className="btn primaryButton mt-1" onClick={this.handlePublish}>Publish Event</button>
            </div>
        );
    }
}

export default EventForm;