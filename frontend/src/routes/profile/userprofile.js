import UserProfile from '../../components/UserProfile';
import Ticket from '../../components/Ticket';
import * as User from '../../services/user';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function UserProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [registrationPage, setRegistrationPage] = useState("1")
  const [maxRegistrationPage, setMaxRegistrationPage] = useState("1")

  const getData = async () =>{
    let registrations = await User.getRegistrations({page: registrationPage})
    setMaxRegistrationPage(registrations.max)
    setRegistrations(registrations.data)
  }

  useEffect(() => {
    getData();
    if (location.hash) {
      let element = document.getElementById(location.hash.slice(1))
      element.scrollIntoView(true);
    }
  },[])

  useEffect(() => {
    getData();
    let element = document.getElementById("registrations");
    element.scrollIntoView(true);
  },[registrationPage])

  const handlePageChange = (e) =>{
    if (!e.target.value) {
      setRegistrationPage(e.target.value)
    } else if (e.target.value <= 0) {
      setRegistrationPage(1)
    } else if (e.target.value <= parseInt(maxRegistrationPage)){
      setRegistrationPage(e.target.value)
    } else {
      setRegistrationPage(maxRegistrationPage)
    }
  }

  return (
    <main className="container-fluid row justify-content-center mt-4" >
      <div className="backgroundWhite" style={{width: "85%", height: "fit-content", minHeight: "500px"}}>
        <UserProfile/>
        <hr/>
        <section className="pt-3">
          <div id="registrations" className="container"  style={{width: "85%"}}>
            <p className="secondaryTitleText mb-3">My Registration</p>
            {registrations.length > 0 && (
              <div>
                {registrations.map(registration => (
                  <Ticket ticket={registration} key={registration.id} navigate={navigate} />
                ))}
                <nav aria-label="Page navigation" className="mb-5">
                    <ul className="pagination detailMainText justify-content-center">
                      <li className="page-item">
                        <button className="page-link" aria-label="Previous" onClick={(e)=> setRegistrationPage(parseInt(registrationPage)-1<1 ? 1 : parseInt(registrationPage)-1)}>
                          <span aria-hidden="true">&laquo;</span>
                        </button>
                      </li>
                      <li className="page-item"><input type="number" className="page-link" style={{background:"#FFFFFF", color:"#FABA40", width: "3.5rem"}} value={registrationPage} onChange={handlePageChange} min="1" max={maxRegistrationPage}></input></li>
                      <li className="page-item">
                        <button className="page-link" aria-label="Next" onClick={(e)=> setRegistrationPage(parseInt(registrationPage)+1<=maxRegistrationPage ? parseInt(registrationPage)+1 : parseInt(registrationPage))}>
                          <span aria-hidden="true">&raquo;</span>
                        </button>
                      </li>
                    </ul>
                  </nav>
              </div>
            )}
            {registrations.length <= 0 && (
              <p className="detailSubText" style={{paddingLeft: "1rem"}}>No registration is found.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}