import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Import templates
import NavTemplate from './templates/navTemplate';

// Import routes
import LoginPage from "./routes/login";
import SignUpPage from "./routes/signup";
import Home from "./routes/home";
import Search from "./routes/search";
import Event from "./routes/event";
import Ticket from "./routes/ticket";
import UserProfilePage from "./routes/profile/userprofile";
import OrganizerProfile from "./routes/profile/organizerprofile";
import Account from "./routes/settings/account";
import OrganizerAccount from "./routes/settings/organizeraccount";
import Dashboard from "./routes/dashboard/main";
import CreateEvent from "./routes/dashboard/create";
import EventDashboardEdit from "./routes/dashboard/manage/edit";
import EventDashboardAttendee from "./routes/dashboard/manage/attendee";
import EventDashboardMain from "./routes/dashboard/manage/main";
import EventDashboardPerformance from "./routes/dashboard/manage/performance";
import EventDashboardRegistration from "./routes/dashboard/manage/registration";
import NotFound from "./routes/notfound";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="/" element={<NavTemplate />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="event/:eventId" element={<Event />} />
          <Route path="ticket/:registrationId" element={<Ticket />} />
          <Route path="profile">
            <Route path="user/view" element={<UserProfilePage />}/>
            <Route path="organizer/view" element={<OrganizerProfile />}/>
          </Route>
          <Route path="settings">
            <Route path="account" element={<Account />}/>
            <Route path="organizeraccount" element={<OrganizerAccount />}/>
          </Route>
          <Route path="dashboard">
            <Route index element={<Dashboard />} />
            <Route path="create" element={<CreateEvent />}/>
            <Route path="manage">
              <Route path=":eventId" element={<EventDashboardMain />}/>
              <Route path=":eventId/edit" element={<EventDashboardEdit />}/>
              <Route path=":eventId/registration" element={<EventDashboardRegistration />}/>
              <Route path=":eventId/attendee" element={<EventDashboardAttendee />}/>
              <Route path=":eventId/performance" element={<EventDashboardPerformance />}/>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();