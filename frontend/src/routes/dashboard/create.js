import EventForm from '../../components/EventForm';
import { useNavigate } from 'react-router-dom';

export default function CreateEvent() {
    let navigate = useNavigate();
    return (
      <main className="container-fluid row justify-content-center mt-4"  style={{width: "50%", minWidth:"700px", marginLeft:"auto", marginRight:"auto", padding: "0"}}>
        <EventForm navigate={navigate}/>
      </main>
    );
  }