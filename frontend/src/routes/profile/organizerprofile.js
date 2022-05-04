import OrganizerProfile from '../../components/OrganizerProfile';
import EventCardOrganizer from '../../components/EventCardOrganizer';
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
        <div className="row" style={{margin:"0"}}>
          {
            events.slice(i, i + 3)
              .map(event => (
                <EventCardOrganizer event={event} key={event.id}/>
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
                  <div className="col-6 mb-3">
                      <p className="secondaryTitleText">My Events </p>
                  </div>
                  <div className="col-12 row m-0 mb-3 ml-3 p-0 justify-content-between align-items-center">
                    <a className="btn mb-3 mr-1 col-auto" href="#carouselContent" role="button" data-slide="prev" style={{height: "fit-content"}}>
                      <i className="bi bi-chevron-left"></i>
                    </a>
                    <div className="col-auto">
                      <div id="carouselContent" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                          {eventsRender}  
                        </div>
                      </div>
                    </div>
                    <a className="btn mb-3 col-auto" href="#carouselContent" role="button" data-slide="next" style={{height: "fit-content"}}>
                      <i className="bi bi-chevron-right"></i>
                    </a>
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