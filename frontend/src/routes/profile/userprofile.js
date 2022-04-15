import UserProfile from '../../components/UserProfile';
import Ticket from '../../components/Ticket';
import * as User from '../../services/user';
import { useState, useEffect } from 'react';

export default function UserProfilePage() {
  const [registrations, setRegistrations] = useState([])

  const getData = async () =>{
    let registrations = await User.getRegistrations()
    setRegistrations(registrations.data)
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <main className="container-fluid row justify-content-center" >
      <div className="backgroundWhite mt-4" style={{width: "85%", height: "fit-content", minHeight: "500px"}}>
        <UserProfile/>
        <hr/>
        <section className="pt-3">
          <div className="container"  style={{width: "85%"}}>
            <p className="secondaryTitleText mb-3">My Registration</p>
            {registrations.length > 0 && (
              registrations.map(registration => (
                <Ticket ticket={registration} key={registration.id} />
              ))
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