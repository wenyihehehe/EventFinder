import { Link } from "react-router-dom";

export default function HelpPage() {
    return (
        <main className="row justify-content-center mx-auto" style={{height:'90vh'}}>
          <div className="mt-5 pb-5" style={{width:'70vw'}}>
            <p className="smallText subTextColor">DOCUMENT</p>
            <p className="bigText tonedTextOrange mb-3">Help Center</p>
            <p className="detailSubText mb-3">Still have questions? Email us at <span className="tonedTextOrange">eventfinder@email.com</span></p>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card">
                    <div className="card-body">
                        <p className="card-title titleText">Event Organizer</p>
                        <p className="detailSubText mb-3">Set up your event and manage registrations.</p>
                        <Link to='1' target="_blank" className='labelText helpText'><p className="mb-3">How to create an event</p></Link>
                        <Link to='2' target="_blank" className='labelText helpText'><p className="mb-3">How to edit your event</p></Link>
                        <Link to='3' target="_blank" className='labelText helpText'><p className="mb-3">How to delete your event</p></Link>
                        <Link to='4' target="_blank" className='labelText helpText'><p className="mb-3">How to share your event</p></Link>
                        <Link to='5' target="_blank" className='labelText helpText'><p className="mb-3">How to create new ticket type</p></Link>
                        <Link to='6' target="_blank" className='labelText helpText'><p className="mb-3">How to edit a ticket type</p></Link>
                        <Link to='7' target="_blank" className='labelText helpText'><p className="mb-3">How to delete a ticket type</p></Link>
                        <Link to='8' target="_blank" className='labelText helpText'><p className="mb-3">How to check ticket type availability</p></Link>
                        <Link to='9' target="_blank" className='labelText helpText'><p className="mb-3">How to mark a ticket type as "sold out"</p></Link>
                        <Link to='10' target="_blank" className='labelText helpText'><p className="mb-3">How to check registration for your event</p></Link>
                        <Link to='11' target="_blank" className='labelText helpText'><p className="mb-3">How to mark registrant as "attended"</p></Link>
                        <Link to='12' target="_blank" className='labelText helpText'><p className="mb-3">How to check event performance</p></Link>
                    </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card">
                    <div className="card-body">
                        <p className="card-title titleText">Event Attendee</p>
                        <p className="detailSubText mb-3">Discover nearby events and attend event.</p>
                        <Link to='13' target="_blank" className='labelText helpText'><p className="mb-3">How to search events</p></Link>
                        <Link to='14' target="_blank" className='labelText helpText'><p className="mb-3">How to register to an event</p></Link>
                        <Link to='15' target="_blank" className='labelText helpText'><p className="mb-3">Where to find your tickets</p></Link>
                        <Link to='16' target="_blank" className='labelText helpText'><p className="mb-3">How to edit/cancel your registration</p></Link>
                        <Link to='17' target="_blank" className='labelText helpText'><p className="mb-3">How to review registered event</p></Link>
                        <Link to='18' target="_blank" className='labelText helpText'><p className="mb-3">How to contact the event organizer</p></Link>
                        <Link to='19' target="_blank" className='labelText helpText'><p className="mb-3">How to join the event</p></Link>
                    </div>
                    </div>
                </div>
            </div>
          </div>
        </main>
    );
}
// how to create event
// how to register for event
// where to find your tickets
// can i request for refund
// how to contact the event organizer