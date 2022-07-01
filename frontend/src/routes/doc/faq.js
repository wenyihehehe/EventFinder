export default function FAQPage() {
    return (
        <main className="row justify-content-center mx-auto" style={{height:'90vh'}}>
          <div className="mt-5 pb-5" style={{width:'70vw'}}>
            <p className="smallText subTextColor">DOCUMENT</p>
            <p className="bigText tonedTextOrange mb-4">Frequently Asked Questions (FAQs)</p>
            <div className="accordion detailMainText" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            What is EventFinder?
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <p>EventFinder is a web application that:</p>
                        <ul>
                            <li><p>Helps users discover and register for local events.</p></li>
                            <li><p>Allows users to review and rate their attended events.</p></li>
                            <li><p>Acts as an event information site for event organizers to put in event details for registration and marketing purposes.</p></li>
                            <li><p>Enhance the process of event management by including ticketing registration, attendee management and analytic services.</p></li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        What are the services provided by EventFinder?
                    </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <p>Using EventFinder, you can:</p>
                        <ul>
                            <li><p>Discover events.</p></li>
                            <li><p>Rate and review events.</p></li>
                            <li><p>Create events.</p></li>
                            <li><p>Manage ticketing.</p></li>
                            <li><p>Manage attendees.</p></li>
                            <li><p>Analyze event performance.</p></li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Does it cost to use EventFinder?
                    </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <p>No, EventFinder is a free-to-use application.</p>
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        Can I use EventFinder for paid events?
                    </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <p>Currently, EventFinder supports free events only as it does not provide proper payment gateway. For paid events, the organizers will need to collect ticket amount themselves.</p>
                    </div>
                    </div>
                </div>
            </div>
          </div>
        </main>
      );
    }