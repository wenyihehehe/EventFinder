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
      <div className="backgroundWhite mt-4" style={{minWidth: "1000px", height: "fit-content", minHeight: "500px"}}>
        <UserProfile />
        <hr/>
        <p className="secondaryTitleText pt-3 pb-1" style={{paddingLeft: "6rem"}}>My Registration</p>
        {registrations.length > 0 && (
          registrations.map(registration => (
            <Ticket ticket={registration} key={registration.id} />
          ))
        )}
        {registrations.length <= 0 && (
          <p className="detailSubText" style={{paddingLeft: "7rem"}}>No registration is found.</p>
        )}
      </div>
    </main>
  );
}