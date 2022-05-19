import UserProfile from '../../components/UserProfile';
import Ticket from '../../components/Ticket';
import * as User from '../../services/user';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function UserProfilePage() {
  const [registrations, setRegistrations] = useState([])
  const location = useLocation();

  const getData = async () =>{
    let registrations = await User.getRegistrations()
    setRegistrations(registrations.data)
  }

  useEffect(() => {
    getData();
    if (location.hash) {
      let element = document.getElementById(location.hash.slice(1))
      element.scrollIntoView(true);
    } 
  },[])

  return (
    <main className="container-fluid row justify-content-center mt-4" >
      <div className="backgroundWhite" style={{width: "85%", height: "fit-content", minHeight: "500px"}}>
        <UserProfile/>
        <hr/>
        <section className="pt-3">
          <div id="registrations" className="container"  style={{width: "85%"}}>
            <p className="secondaryTitleText mb-3">My Registration</p>
            {registrations.length > 0 && (
              registrations.map(registration => (
                <Ticket ticket={registration} key={registration.id} />
              ))
            )}
            {registrations.length <= 0 && (
              <p className="detailSubText" style={{paddingLeft: "1rem"}}>No registration is found.</p>
            )}
            {/* TODO: ADD PAGINATION */}
          </div>
        </section>
      </div>
    </main>
  );
}