import React from 'react';
import style from './index.module.css';
import swal from 'sweetalert';
import * as Util from '../../services/util';
import * as Event from '../../services/event';
import moment from 'moment';
import RichTextEditor from '../RichTextEditor';
import TicketTypeTable from '../TicketTypeTable';
import SearchMap from '../SearchMap';

class EventForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: "",
            categoryOption: [],
            title: "",
            coverImage: "",
            coverImageInput: "",
            category: "",
            description: "",
            images: [],
            imageInput: [],
            type: "Physical", //default
            location: "",
            latitude: "",
            longitude: "",
            startDateTime: moment().format("YYYY-MM-DDThh:mm"),
            endDateTime: moment().add(1, 'days').format("YYYY-MM-DDThh:mm"),
            ticketType: [],
            deleteTicketType : [],
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
        this.handleDeleteTicketType = this.handleDeleteTicketType.bind(this);
        this.getImagesToImageInput = this.getImagesToImageInput.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
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
        if(this.props.eventId){
            const eventId = this.props.eventId
            let event = await Event.getEvent({eventId})
            this.setState({
                id: event.id,
                title: event.title ?? "",
                coverImage: event.coverImage ?? "",
                category: event.category ?? "",
                description: event.description ?? "",
                images: event.images,
                type: event.type ?? "",
                location: event.location ?? "",
                latitude: event.latitude ?? "",
                longitude: event.longitude ?? "",
                startDateTime: moment(event.startDateTime).format("YYYY-MM-DDThh:mm"),
                endDateTime: moment(event.endDateTime).format("YYYY-MM-DDThh:mm"),
                ticketType: event.ticketType,
            }, () => {
                this.getImagesToImageInput()
            })
        }
    }

    async getImagesToImageInput(){
        const images= this.state.images
        for (var i = 0; i < images.length; i++){
            let image = await Util.fetchImage({imageUrl:images[i]})
            this.setState(prevState => ({
                imageInput: [...prevState.imageInput, image]
            }))
        }
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
            let create = await Event.createUpdateEvent({
                id: this.state.id,
                title: this.state.title,
                coverImage: this.state.coverImageInput ? this.state.coverImageInput : "",
                category: this.state.category,
                description: this.state.description,
                type: this.state.type,
                location: this.state.location,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                startDateTime: this.state.startDateTime,
                endDateTime: this.state.endDateTime,
                status: "Published",
            });
            if (create.data.status === "OK"){
                if(this.state.imageInput.length){
                    let createUpdateEventImage = await Event.createUpdateEventImage({
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
                if(this.state.deleteTicketType.length){
                    for (const id of this.state.deleteTicketType) { 
                        let deleteTicketType = await Event.deleteTicketType({id})
                    }
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
        let create = await Event.createUpdateEvent({
            id: this.state.id,
            title: this.state.title,
            coverImage: this.state.coverImageInput ? this.state.coverImageInput : "",
            category: this.state.category,
            description: this.state.description,
            type: this.state.type,
            location: this.state.location,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            startDateTime: this.state.startDateTime,
            endDateTime: this.state.endDateTime,
            status: "Draft"
        });
        if (create.data.status === "OK"){
            if(this.state.imageInput.length){
                let createUpdateEventImage = await Event.createUpdateEventImage({
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
            if(this.state.deleteTicketType.length){
                for (const id of this.state.deleteTicketType) { 
                    let deleteTicketType = await Event.deleteTicketType({id})
                }
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
        // Remove invalid-location-feedback
        document.querySelector(".invalid-location-feedback").classList.remove('invalid');

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation-event-form')
        var error = false;

        const locationField = document.getElementById("locationField");
        if(locationField.value.length === 0){
            locationField.setCustomValidity("This field is required.");
            document.querySelector(".invalid-location-feedback").classList.add('invalid');
            document.querySelector(".invalid-location-feedback").innerHTML = "This field is required."
        } else if (!this.state.location){
            locationField.setCustomValidity("This location is invalid.");
            document.querySelector(".invalid-location-feedback").classList.add('invalid');
            document.querySelector(".invalid-location-feedback").innerHTML = "This location is invalid."
        } else {
            locationField.setCustomValidity("")
        }

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

    handleDeleteTicketType(data){
        this.setState(prevState => ({
            deleteTicketType: [...prevState.deleteTicketType, data]
        }))
    }

    handleLocation(data){
        this.setState({
            location: data.location,
            latitude: data.latitude,
            longitude: data.longitude
        })
    }

    handleChangeType(e){
        let newValue = e.target.value;
        if(this.state.type !== newValue){
            this.setState({
                type: e.target.value, 
                location: "", 
                latitude: "", 
                longitude: ""
            })
        }
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
                        <label htmlFor="coverImage" className="form-label labelText mb-0">Event Cover Image</label>
                        <p className="detailSubText subTextColor">This image will be used as the cover image on your event page.</p>
                        <div className="input-group mb-3">
                            <div className="col-12" style={{padding: "0"}}>
                                <img className={`${style.coverImage} img`} src={this.state.coverImage} alt="coverImage"></img>
                            </div>
                            <input type="file" className=".form-control-file" name="coverImageInput" accept="image/*" onChange={this.onFileSelected} style={{backgroundColor: "transparent"}}/>
                        </div>
                        <label htmlFor="category" className="form-label labelText">Category</label>
                        <div className="input-group mb-3">
                            <select className="custom-select form-control" name="category" value={this.state.category} onChange={this.handleInputChange} required>
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
                                <input type="file" disabled={this.state.images.length >= 3} className=".form-control-file" accept="image/*"
                                onChange={this.onEventsImageFileSelected} style={{backgroundColor: "transparent"}}/>
                            </div>
                        </div>
                    </form>
                </section>
                <section>
                    <p className="secondaryTitleText mb-0">Location</p>
                    <p className="detailSubText subTextColor">Where will the event be hosted at?</p>
                    <form className="needs-validation-event-form" noValidate>
                        <label htmlFor="type" className="form-label labelText">Type</label>
                        <div className="input-group mb-3">
                            <button className={`btn ${this.state.type === "Physical" ? "primaryButton" : "outlinedButton"} mr-3 ${style.typeButton}`} type="button" value="Physical" onClick={this.handleChangeType}>Physical</button>
                            <button className={`btn ${this.state.type === "Online" ? "primaryButton" : "outlinedButton"} ${style.typeButton}`} type="button" value="Online" onClick={this.handleChangeType}>Online</button>
                        </div>
                        <label htmlFor="location" className="form-label labelText">Location</label>
                        {
                            this.state.type === "Physical" ?
                            ((this.props.eventId && this.state.id) || (!this.props.eventId)) && 
                            <SearchMap handleLocation={this.handleLocation} location={this.state.location} latitude={this.state.latitude} longitude={this.state.longitude}/>
                            :
                            <input type="text" className="form-control mb-3" name="location" value={this.state.location} onChange={this.handleInputChange} required ></input>
                        }
                        
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
                    <TicketTypeTable ticketType={this.state.ticketType} handleTicketType={this.handleTicketType} handleDeleteTicketType={this.handleDeleteTicketType}/>
                    <div className="invalidFeedback" style={{marginLeft: "1rem"}}>At least one ticket type should be created.</div>
                </section>
                <button type="submit" className="btn secondaryButton mt-1 mr-3" onClick={this.handleSave}>Save as Draft</button>
                <button type="submit" className="btn primaryButton mt-1" onClick={this.handlePublish}>Publish Event</button>
            </div>
        );
    }
}

export default EventForm;