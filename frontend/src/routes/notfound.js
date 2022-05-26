import { Link } from "react-router-dom";

export default function NotFound() {
  return (
      <main className="row align-items-center justify-content-center mx-auto my-auto" style={{height:'90vh'}}>
        <div>
          <p className="text-center superBigText tonedTextOrange">404</p>
          <p className="text-center secondaryTitleText tonedTextOrange mb-3">Not Found</p>
          <p className="text-center detailMainText subTextColor">Sorry, we couldn't find that page.</p>
          <Link to='/'><button className="btn primaryButton w-100">Go to Homepage</button></Link>
        </div>
      </main>
    );
  }