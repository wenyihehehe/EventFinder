import OrganizerProfile from '../../components/OrganizerProfile';
import EventCard from '../../components/EventCard';
import Review from '../../components/Review';
import * as User from '../../services/user';
import { useState, useEffect } from 'react';

export default function OrganizerProfilePage() {
  const [events, setEvents] = useState([])
  const [reviews, setReviews] = useState([])

  const getData = async () =>{
    let events = await User.getOrganizingEvents()
    setEvents(events.data)
    let reviews = await User.getReviews()
    setReviews(reviews)
  }

  useEffect(() => {
    getData()
  },[])

  const eventsRender = [];
    
  for (var i = 0; i < events.length; i += 3) {
    if(events.length !== 0){
      eventsRender.push(
        <div className={`carousel-item ${i===0 ? "active" : ""}`} key={i}>
        <div className="row">
          {
            events.slice(i, i + 3)
              .map(event => (
                <EventCard event={event} key={event.coverImage}/>
                ))
          }
        </div>
      </div>
      );
    } else {
      eventsRender.push(<p className="detailSubText" style={{paddingLeft: "7rem"}}>No event is found.</p>);
    }
  }

  return (
    <main className="container-fluid row justify-content-center mt-4" >
      <div className="backgroundWhite" style={{width: "85%", height: "fit-content", minHeight: "500px"}}>
        <OrganizerProfile />
        <hr/>
        <section className="pt-3">
          <div className="container"  style={{width: "85%"}}>
              <div className="row">
                  <div className="col-6">
                      <h3 className="secondaryTitleText">My Events </h3>
                  </div>
                  <div className="col-6 text-right">
                      <a className="btn primaryButton mb-3 mr-1" href="#carouselContent" role="button" data-slide="prev" style={{height: "fit-content"}}>
                        <i className="bi bi-chevron-left"></i>
                      </a>
                      <a className="btn primaryButton mb-3 " href="#carouselContent" role="button" data-slide="next" style={{height: "fit-content"}}>
                        <i className="bi bi-chevron-right"></i>
                      </a>
                  </div>
                  <div className="col-12">
                      <div id="carouselContent" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                          {eventsRender}  
                        </div>
                      </div>
                  </div>
              </div>
          </div>
        </section>
        <hr/>
        <section className="pt-3">
          <div className="container"  style={{width: "85%"}}>
            <p className="secondaryTitleText pt-3 pb-1">My Reviews</p>
            <div >
              {reviews.length > 0 && (
                reviews.map(review => (
                  <Review review={review} key={review.profileImage} />
                ))
              )}
              {reviews.length <= 0 && (
                <p className="detailSubText" style={{paddingLeft: "1rem"}}>No review is found.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
  }