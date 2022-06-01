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
import ForgotPasswordPage from "./routes/forgotpassword";
import ResetPasswordPage from "./routes/resetpassword";
import Home from "./routes/home";
import Search from "./routes/search";
import EventPage from "./routes/event";
import Ticket from "./routes/ticket";
import UserProfilePage from "./routes/profile/userprofile";
import OrganizerProfilePage from "./routes/profile/organizerprofile";
import Account from "./routes/settings/account";
import SettingPage from "./routes/settings/index";
import OrganizerAccount from "./routes/settings/organizeraccount";
import DashboardPage from "./routes/dashboard/main";
import CreateEvent from "./routes/dashboard/create";
import EventDashboardTemplate from "./routes/dashboard/manage/index";
import EventDashboardEdit from "./routes/dashboard/manage/edit";
import EventDashboardAttendee from "./routes/dashboard/manage/attendee";
import EventDashboardMain from "./routes/dashboard/manage/main";
import EventDashboardPerformance from "./routes/dashboard/manage/performance";
import EventDashboardRegistration from "./routes/dashboard/manage/registration";
import NotFound from "./routes/notfound";
import CreateOrganizerProfilePage from "./routes/createorganizerprofile";
import OrganizerPage from './routes/organizer';
import TermsOfServicePage from './routes/doc/termsofservice'
import PrivacyPolicyPage from './routes/doc/privacypolicy'
import FAQPage from './routes/doc/faq'
import HelpPage from './routes/doc/help'
import HelpInfoPage from './routes/doc/helpinfo'

// Import AuthProvider
import * as AuthProvider from './config/authProvider'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AuthProvider.AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<AuthProvider.RequireBeforeAuth><LoginPage /></AuthProvider.RequireBeforeAuth>} />
        <Route path="signup" element={<AuthProvider.RequireBeforeAuth><SignUpPage /></AuthProvider.RequireBeforeAuth>} />
        <Route path="forgotpassword" element={<AuthProvider.RequireBeforeAuth><ForgotPasswordPage /></AuthProvider.RequireBeforeAuth>} />
        <Route path="resetpassword" element={<AuthProvider.RequireBeforeAuth><ResetPasswordPage /></AuthProvider.RequireBeforeAuth>} />
        <Route path="/" element={<NavTemplate />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="event/:eventId" element={<AuthProvider.BeforeAuthIsEventExist><EventPage /></AuthProvider.BeforeAuthIsEventExist>} />
          <Route path="organizer/:organizerId" element={<AuthProvider.BeforeAuthIsOrganizerExist><OrganizerPage/></AuthProvider.BeforeAuthIsOrganizerExist>}/>
          <Route path="ticket/:registrationId" element={<AuthProvider.RequireAuthIsOwner><Ticket /></AuthProvider.RequireAuthIsOwner>} />
          <Route path="profile">
            <Route path="user/view" element={<AuthProvider.RequireAuth><UserProfilePage /></AuthProvider.RequireAuth>}/>
            <Route path="organizer/view" element={<AuthProvider.RequireAuthGotOrganizerProfile><OrganizerProfilePage /></AuthProvider.RequireAuthGotOrganizerProfile>}/>
            <Route index element={<NotFound />}/>
          </Route>
          <Route path="settings" element={<AuthProvider.RequireAuth><SettingPage /></AuthProvider.RequireAuth>}>
            <Route path="account" element={<Account />}/>
            <Route path="organizeraccount" element={<OrganizerAccount />}/>
            <Route index element={<Account />}/>
          </Route>
          <Route path="dashboard">
            <Route index element={<AuthProvider.RequireAuthGotOrganizerProfile><DashboardPage /></AuthProvider.RequireAuthGotOrganizerProfile>} /> {/*Check if got organizer profile*/}
            <Route path="create" element={<AuthProvider.RequireAuthGotOrganizerProfile><CreateEvent /></AuthProvider.RequireAuthGotOrganizerProfile>}/> {/*Check if got organizer profile*/}
            <Route path="manage/:eventId" element={<AuthProvider.RequireAuthGotOrganizerProfileIsOrganizer><EventDashboardTemplate /></AuthProvider.RequireAuthGotOrganizerProfileIsOrganizer>}> {/*Check if got organizer profile and is organizer of the event*/}
              <Route index element={<EventDashboardMain />}/>
              <Route path="edit" element={<EventDashboardEdit />}/>
              <Route path="registration" element={<EventDashboardRegistration />}/>
              <Route path="attendee" element={<EventDashboardAttendee />}/>
              <Route path="performance" element={<EventDashboardPerformance />}/>
            </Route>
          </Route>
          <Route path="createorganizerprofile" element={<AuthProvider.RequireAuthNoOrganizerProfile><CreateOrganizerProfilePage /></AuthProvider.RequireAuthNoOrganizerProfile>}/>
          <Route path="doc">
            <Route path="termsofservice" element={<TermsOfServicePage/>}/>
            <Route path="privacypolicy" element={<PrivacyPolicyPage/>}/>
            <Route path="faq" element={<FAQPage/>}/>
            <Route path="help">
              <Route index element={<HelpPage/>}/>
              <Route path=":helpId" element={<HelpInfoPage/>}/>
            </Route>
            <Route index element={<NotFound />}/>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  {/* //</React.StrictMode> */}
  </AuthProvider.AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
