import OrganizerProfile from '../components/OrganizerProfile';
import EventCard from '../components/EventCard';
import Review from '../components/Review';
import * as User from '../services/user';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function OrganizerPage() {
  const [events, setEvents] = useState([])
  const [reviews, setReviews] = useState([])
  const [reviewPage, setReviewPage] = useState("1")
  const [maxReviewPage, setMaxReviewPage] = useState("1")
  let params = useParams();
  let organizerId = parseInt(params.organizerId, 10);

  const getData = async () =>{
    let events = await User.getOrganizingEventsNoAuth({organizerId})
    setEvents(events.data)
    let reviews = await User.getOrganizedEventReviewsNoAuth({organizerId, page:reviewPage})
    setMaxReviewPage(reviews.max)
    setReviews(reviews.data)
  }

  useEffect(() => {
    getData()
  },[reviewPage])

  const handlePageChange = (e) =>{
    if (!e.target.value) {
      setReviewPage(e.target.value)
    } else if (e.target.value <= 0) {
      setReviewPage(1)
    } else if (e.target.value <= parseInt(maxReviewPage)){
      setReviewPage(e.target.value)
    } else {
      setReviewPage(maxReviewPage)
    }
  }

  const eventsRender = [];
    
  for (var i = 0; i < events.length; i += 3) {
    if(events.length !== 0){
      eventsRender.push(
        <div className={`carousel-item ${i===0 ? "active" : ""}`} key={i}>
        <div className="row justify-content-around" style={{margin:"0"}}>
          {
            events.slice(i, i + 3)
              .map(event => (
                <EventCard event={event} key={event.id}/>
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
      <div className="backgroundWhite pb-3" style={{width: "85%", height: "fit-content", minHeight: "500px"}}>
        <OrganizerProfile organizerId={organizerId}/>
        <hr/>
        <section className="pt-3">
          <div className="container"  style={{width: "85%"}}>
              <div className="row">
                  <div className="col-6">
                      <p className="secondaryTitleText">Events</p>
                  </div>
                  {events.length > 0 ?
                  <div className="col-12 row mt-3 m-0 mb-3 ml-3 p-0 justify-content-center align-items-center">
                    <a className="btn mb-3 mr-1" href="#carouselContent" role="button" data-slide="prev" style={{height: "fit-content"}}>
                      <i className="bi bi-chevron-left"></i>
                    </a>
                    <div>
                      <div id="carouselContent" className="carousel slide" data-ride="carousel" style={{width: "60vw"}}>
                        <div className="carousel-inner">
                          {eventsRender}  
                        </div>
                      </div>
                    </div>
                    <a className="btn mb-3" href="#carouselContent" role="button" data-slide="next" style={{height: "fit-content"}}>
                      <i className="bi bi-chevron-right"></i>
                    </a>
                  </div>
                  :<p className="detailSubText mb-3 col-12 m-0 pt-1" style={{paddingLeft: "2rem"}}>No event is found.</p>
                  }
              </div>
          </div>
        </section>
        <hr/>
        <section className="pt-3">
          <div className="container"  style={{width: "85%"}}>
            <p className="secondaryTitleText pt-3 pb-1">Reviews</p>
              {reviews.length > 0 && (
                <div>
                  {reviews.map(review => (
                    <Review review={review} key={review.id} />
                  ))}
                  <nav aria-label="Page navigation" className="mb-3">
                    <ul className="pagination detailMainText justify-content-center">
                      <li className="page-item">
                        <button className="page-link" aria-label="Previous" onClick={(e)=> setReviewPage(parseInt(reviewPage)-1<1 ? 1 : parseInt(reviewPage)-1)}>
                          <span aria-hidden="true">&laquo;</span>
                        </button>
                      </li>
                      <li className="page-item"><input type="number" className="page-link" style={{background:"#FFFFFF", color:"#FABA40", width: "3.5rem"}} value={reviewPage} onChange={handlePageChange} min="1" max={maxReviewPage}></input></li>
                      <li className="page-item">
                        <button className="page-link" aria-label="Next" onClick={(e)=> setReviewPage(parseInt(reviewPage)+1<=maxReviewPage ? parseInt(reviewPage)+1 : parseInt(reviewPage))}>
                          <span aria-hidden="true">&raquo;</span>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
              {reviews.length <= 0 && (
                <p className="detailSubText mb-3" style={{paddingLeft: "1rem"}}>No review is found.</p>
              )}
          </div>
        </section>
      </div>
    </main>
  );
  }