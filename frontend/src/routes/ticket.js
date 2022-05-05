import { useState, useEffect} from "react";
import { Link, useParams} from 'react-router-dom';
import { Website } from '../config/domain';
import * as Attendee from '../services/attendee';
import moment from 'moment'
import ReviewModal from "../components/ReviewModal";

export default function Ticket() {
  let params = useParams();
  let registrationId = parseInt(params.registrationId, 10);
  const [order, setOrder] = useState({})
  const [showReview, setShowReview] = useState(false)

  const getData = async () =>{
    const registration = await Attendee.getRegistrationOrder({registrationId})
    if(registration.status === "OK"){
      setOrder(registration.data)
    }
    console.log(registration.data)
  }

  useEffect(() => {
    getData()
  },[])

  const handleClose = () => {
    setShowReview(false);
    getData();
  }

  const handleOpen = () => {
    setShowReview(true);
  }

  function sendMail() {
    var link = `mailto:${order.event.organizerEmail}?subject=INQUIRY: ${order.event.title}`;
    window.location.href = link;
  }

  const sectionStyle = {
    padding: "1rem",
    boxShadow: "inset 0px -0.5px 0px #CCCCCC"
  };

  return (
    <main className="container-fluid row justify-content-center mt-4" >
      {
        Object.keys(order).length !== 0 &&
        <div className="backgroundWhite" style={{width: "75%", height: "fit-content", minHeight: "500px", padding:"2rem 3.5rem"}}>
          <p className="secondaryTitleText tonedTextDark">Order ID: #{order.id}</p>
          <section style={sectionStyle}>
            <p className="headingText mb-3">Event Information</p>
            <div className="pl-3">
              <div className="mb-3">
                <p className="detailMainText">Event Title:</p>
                <p className="detailSubText">{order.event.title}</p>
                <p className="detailSubText">URL: <Link className="subTextColor" to={Website + 'event/' + order.event.id}>{Website + 'event/' + order.event.id}</Link></p>
              </div>
              <div className="mb-3">  
                <p className="detailMainText">Organizer:</p>
                <p className="detailSubText">{order.event.organizerName}</p>
                <p className="detailSubText">URL: <Link className="subTextColor" to={Website + 'organizer/' + order.event.organizerId}>{Website + 'organizer/' + order.event.organizerId}</Link></p>
              </div>
              <div className="mb-3">  
                <p className="detailMainText">Date & Time:</p>
                <p className="detailSubText">{moment(order.event.startDateTime).format('MMM Do, dddd [at] LT')} to {moment(order.event.endDateTime).format('MMM Do, dddd [at] LT')}</p>
              </div>
              <div>  
                <p className="detailMainText">Location:</p>
                <p className="detailSubText">{order.event.location}</p>
              </div>
            </div>
          </section>
          <section style={sectionStyle}>
            <p className="headingText mb-3">Order Information</p>
            <div className="pl-3">
              <div className="mb-3">  
                <p className="detailMainText">Ordered at:</p>
                <p className="detailSubText">{moment(order.orderDateTime).format('MMM Do, dddd [at] LT')}</p>
              </div>
              <div>  
                <p className="detailMainText">Tickets:</p>
                <table className={`table table-borderless backgroundWhite`} style={{border: "0.5px solid rgba(0,0,0,.1)", margin: "0", width: "100%"}}>
                    <thead style={{backgroundColor: "#F8F8FA"}}>
                        <tr className="detailMainText" style={{boxShadow: "inset 0px -0.5px 0px #CCCCCC"}}>
                            <th scope="col" style={{paddingLeft: "1.5rem"}}>Tickets</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      order.tickets.map((ticket, index) => (
                          <tr key={index} style={{boxShadow: "inset 0px -0.5px 0px #E5E5E5"}}>
                              <td style={{paddingLeft: "1.5rem"}}>
                                  <p className="detailSubText">{ticket.name}</p>
                              </td>
                              <td>
                                  <p className="detailSubText">{ticket.quantity}</p>
                              </td>
                              <td>
                                  <p className="detailSubText">RM{ticket.amount}</p>
                              </td>
                          </tr>
                      ))
                    }
                    <tr className="detailMainText">
                        <td colSpan="2" style={{textAlign: "end"}}>Total:</td>
                        <td colSpan="1">RM{order.amount}</td>
                    </tr>
                    </tbody>
                </table>
              </div>
            </div>
          </section>
          <section>
            <div className="mx-auto" style={{width:"fit-content"}}>
              <button className="btn outlinedButton mt-3 mr-3" style={{width: "160px"}} onClick={sendMail} disabled={!order.event.organizerEmail}>Contact Organizer</button>
              <button className="btn primaryButton mt-3" style={{width: "160px"}} onClick={handleOpen} disabled={order.disableReview}>Create Review</button>
            </div>
          </section>
          <ReviewModal show={showReview} handleClose={handleClose} event={order.event} registrationId={registrationId}/>
        </div>
      }
    </main>
  );
}