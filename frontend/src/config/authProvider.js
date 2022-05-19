import { useState, createContext, useContext, useEffect } from 'react';
import { useLocation, Navigate, useParams } from 'react-router-dom';
import React from 'react';
import Cookie from "js-cookie";
import * as Auth from '../services/auth';
import * as Permission from '../services/permission';
import { get } from '../services/network';

let AuthContext = createContext({});

function AuthProvider({children}){
    let cookieToken = Cookie.get("token");
    let [token, setToken] = useState(cookieToken);

    let signIn = (token, callback) => {
        Auth.storeTokenInCookie({ token });
        setToken(token);
        callback();
    };

    let signOut = (callback) => {
        Auth.logout();
        setToken(null);
        callback();
    }

    let value = {token, signIn, signOut}

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
    return useContext(AuthContext);
}

function RequireAuth({ children }) {
    let auth = useAuth();
    let location = useLocation();
    
    if (!auth.token) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
}

function RequireAuthIsOwner({ children }){
    let auth = useAuth();
    let params = useParams();
    let registrationId = parseInt(params.registrationId, 10);
    let [permission, setPermission] = useState({});
    let location = useLocation();

    const getPermission = async() => {
        if(!auth.token){
            setPermission({"status": "Not Login"})
            return;
        }
        let data = await Permission.getIsRegistrationOwnerOrEventOwner({id:registrationId});
        setPermission(data)
    }
    
    useEffect(()=>{
        getPermission();
    }, [])

    const getObject = () => {
        if (!auth.token) {
            return <Navigate to="/login" state={{ from: location }} replace />;
        }
        if(permission.status === 'OK'){
            return children;
        }
        return <Navigate to="/notfound" replace/>;    
    }

    return (
        <div>
            {Object.keys(permission).length !== 0 && getObject()}
        </div>
    )
}

function RequireAuthGotOrganizerProfile({ children }){
    let auth = useAuth();
    let [organizerProfile, setOrganizerProfile] = useState({});
    let location = useLocation();

    const getPermission = async() => {
        if(!auth.token){
            setOrganizerProfile({"status": "Not Login"})
            return;
        }
        let data = await Permission.getHaveOrganizerProfile();
        setOrganizerProfile(data)
    }
    
    useEffect(()=>{
        getPermission();
    }, [])

    const getObject = () => {
        if (!auth.token) {
            return <Navigate to="/login" state={{ from: location }} replace />;
        }
        if(organizerProfile.status === 'OK'){
            return children;
        }
        return <Navigate to="/notfound" replace/>;   
    }

    return (
        <div>
            {Object.keys(organizerProfile).length !== 0 && getObject()}
        </div>
    )
}

function RequireAuthGotOrganizerProfileIsOrganizer({ children }){
    let auth = useAuth();
    let params = useParams();
    let eventId = parseInt(params.eventId, 10);
    let [organizerProfile, setOrganizerProfile] = useState({});
    let location = useLocation();

    const getPermission = async() => {
        if(!auth.token){
            setOrganizerProfile({"status": "Not Login"})
            return;
        }
        let data = await Permission.getHaveOrganizerProfileIsOrganizer({id: eventId});
        setOrganizerProfile(data)
    }
    
    useEffect(()=>{
        getPermission();
    }, [])

    const getObject = () => {
        if (!auth.token) {
            return <Navigate to="/login" state={{ from: location }} replace />;
        }
        if(organizerProfile.status === 'OK'){
            return children;
        } else if (organizerProfile.detail === "Organizer profile not found"){
            return <Navigate to="/createorganizerprofile" replace/>;    
        } else {
            return <Navigate to="/notfound" replace/>;    
        }
    }

    return (
        <div>
            {Object.keys(organizerProfile).length !== 0 && getObject()}
        </div>
    )
}

function RequireBeforeAuth({ children }) {
    let auth = useAuth();
    
    if (auth.token) {
      return <Navigate to="/" replace />;
    }
  
    return children;
}



export { AuthProvider, useAuth, RequireAuth, RequireAuthIsOwner, 
    RequireAuthGotOrganizerProfile, RequireAuthGotOrganizerProfileIsOrganizer,
    RequireBeforeAuth }