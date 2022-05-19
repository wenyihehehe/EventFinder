import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Event from '../services/event';
import * as Util from '../services/util';
import EventCard from "../components/EventCard";
import moment from 'moment';

export default function Home() {
  let navigate = useNavigate();
  const [location, setLocation] = useState([])
  const [locationName, setLocationName] = useState("Nearby")
  const [category, setCategory] = useState("all")
  const [categoryOption, setCategoryOption] = useState([])
  const [carouselEvent, setCarouselEvent] = useState([])
  const [featuredEvent, setFeaturedEvent] = useState([])
  const [categoryEvent, setCategoryEvent] = useState([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation([position.coords.latitude,position.coords.longitude])
        setLocationName("Nearby")
      }, 
        () => {
          // Set default to sunway university geo point if can't get current position
          setLocation([3.067891823231041, 101.60351894232923])
          setLocationName("Bandar Sunway")
        }
      );
    }
  }

  const getFeaturedEvent = async() => {
    let event = await Event.getEventSearchPage({ page: 1, searchParams: "", category: "all", type: "all", location });
    setFeaturedEvent(event.data)
  }

  const getCategoryEvent = async() => {
    let event = await Event.getEventSearchPage({ page: page, searchParams: "", category, type: "all", location: [] });
    setCategoryEvent(event.data)
    setMaxPage(event.max)
  }

  const getCarouselEvent = async() => {
    let event = await Event.getEvents();
    setCarouselEvent(event.data)
  }

  const handleClickMore = async() => {
    if(page+1 <= maxPage) setPage(page => page + 1)
  }

  const getMoreEvent = async() => {
    if(page===1) return;
    let event = await Event.getEventSearchPage({ page: page, searchParams: "", category, type: "all", location: [] });
    setCategoryEvent(categoryEvent => [...categoryEvent, ...event.data])
  }

  const getCategory = async() => {
    let categories = await Util.getCategory()
    setCategoryOption(categories.data)
  }

  useEffect(()=> {
    getCurrentLocation()
    getCategory()
    getFeaturedEvent()
    getCarouselEvent()
  }, [])

  useEffect(()=>{
    getFeaturedEvent()
  }, [location])

  useEffect(()=>{
    getCategoryEvent()
  }, [category])

  useEffect(()=>{
    getMoreEvent()
  }, [page])

  const sectionStyle = {
    width: "90%"
  }

  const handleCategoryClick = (value) =>{
    setCategory(value)
    var categoryNavs = document.querySelectorAll('.category-nav');
    [].forEach.call(categoryNavs, function(categoryNav) {
      categoryNav.classList.remove('active');
    });
    const categoryName = "category-nav-" + value
    const categoryNav = document.getElementById(categoryName);
    categoryNav.classList.add('active')
  }

  const featuredEventsRender = [];
    
  for (var i = 0; i < featuredEvent.length; i += 4) {
    if(featuredEvent.length !== 0){
      featuredEventsRender.push(
        <div className={`carousel-item ${i===0 ? "active" : ""}`} key={i}>
        <div className="row" style={{margin:"0"}}>
          {
            featuredEvent.slice(i, i + 4)
              .map(event => (
                <EventCard event={event} key={event.id}/>
              ))
          }
        </div>
      </div>
      );
    } else {
      featuredEventsRender.push(<p className="detailSubText" style={{paddingLeft: "7rem"}}>No event is found.</p>);
    }
  }

  const categoryEventsRender = [];
    
  for (var j = 0; j < categoryEvent.length; j += 4) {
    if(categoryEvent.length !== 0){
      categoryEventsRender.push(
        <div className="row justify-content-center" style={{margin:"0"}} key={j}>
          {
            categoryEvent.slice(j, j + 4)
              .map(event => (
                <EventCard event={event} key={event.id}/>
              ))
          }
        </div>
      );
    } else {
      categoryEventsRender.push(<p className="detailSubText" style={{paddingLeft: "7rem"}}>No event is found.</p>);
    }
  }

  return (
      <main>
        <div>
          <div id="eventImageCarousel" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                  {carouselEvent.map((event, index) => {
                      return <li key={index} data-target="#eventImageCarousel" data-slide-to={index} className={index === 0 ? "active" : ""}></li>
                  })}
              </ol>
              <div className="carousel-inner">
                  {carouselEvent.map((event, index) => {
                      return (
                          <div key={index} className={`carousel-item ${index===0 ? "active" : ""}`} style={{background: `url(${event.coverImage})`, minHeight: "70vh", height: "480px", backgroundSize: "cover", backgroundPositionX: "center", backgroundPositionY: "center", boxShadow: "inset 0 0 0 2000px rgb(200 200 200 / 30%)"}}>
                            <div style={{float:"right",  minWidth: "30vw", maxWidth: "35vw", marginRight: "10vw", marginTop: "20vh", background: "#FDFDFD", borderRadius: "5px", padding: "1rem 1.5rem"}}>
                              <p className="titleText titleTextClamp">{event.title}</p>
                              <p className="secondaryTitleText tonedTextOrange">{moment(event.startDateTime).format('MMM Do, dddd [at] LT')}</p>
                              <p className="labelText secondaryTitleTextClamp subTextColor">{event.location}</p>
                              <p className="labelText secondaryTitleTextClamp subTextColor">{"Starts from " + event.pricing}</p>
                              <button className="btn primaryButton" onClick={()=> navigate('/event/' + event.id, {state: {showOrder: true}})}>Register Now</button>
                            </div>
                          </div>
                      )
                  })}
              </div>
              <button style={{background: "linear-gradient(to right, rgba(255,255,255,0.8) , rgba(255,255,255,0))", border: "none"}} className={`carousel-control-prev`} type="button" data-target="#eventImageCarousel" data-slide="prev">
                  <i className="bi bi-chevron-left"></i>
              </button>
              <button style={{background: "linear-gradient(to right, rgba(255,255,255,0) , rgba(255,255,255,0.8))", border: "none"}} className={`carousel-control-next`} type="button" data-target="#eventImageCarousel" data-slide="next">
                  <i className="bi bi-chevron-right"></i>
              </button>
          </div>
        </div>
        <section className="container-fluid row justify-content-center mt-4" style={{margin: "0", padding: "0"}}>
          <div style={sectionStyle} className="row m-0">
            <div className="mx-auto mb-3">
              <p className="secondaryTitleText">Featured Events happening in <span className="mainBlue">{locationName}</span></p>
            </div>
            <div className="col-12 row m-0 p-0 justify-content-between align-items-center">
              <a className="btn mb-3 mr-1" href="#carouselContent" role="button" data-slide="prev" style={{height: "fit-content"}}>
                <i className="bi bi-chevron-left"></i>
              </a>
              <div>
                <div id="carouselContent" className="carousel slide" data-ride="carousel">
                  <div className="carousel-inner">
                    {featuredEventsRender}  
                  </div>
                </div>
              </div>
              <a className="btn mb-3" href="#carouselContent" role="button" data-slide="next" style={{height: "fit-content"}}>
                <i className="bi bi-chevron-right"></i>
              </a>
            </div>
        </div>
        </section>
        <hr/>
        <section className="container-fluid row justify-content-center mt-4" style={{margin: "0", padding: "0"}}>
          <div style={sectionStyle} className="row m-0">
            <div className="col-12 row p-0 m-0">
              <div className="mx-auto">
                <p className="secondaryTitleText">More events</p>
              </div>
            </div>
            <div className="col-12 m-0 p-0">
              <ul className="nav nav-pills mx-auto" style={{width: "90%"}}>
                <li className="nav-item" onClick={()=>handleCategoryClick("all")}>
                  <p id="category-nav-all" className="nav-link category-nav active">All</p>
                </li>
                {categoryOption.map((category)=> (
                  <li key={category} className="nav-item" onClick={()=>handleCategoryClick(category)}>
                    <p id={`category-nav-${category}`}className="nav-link category-nav">{category}</p>
                  </li>
                ))}
            </ul>
            </div>
            <div className="col-12 p-0 m-0">
              {categoryEventsRender}
            </div>
            <div className="mx-auto mb-3">
              <button className="btn primaryButton" style={{width: "100px"}} onClick={handleClickMore}>More</button>
            </div>
          </div>
        </section>
      </main>
    );
}