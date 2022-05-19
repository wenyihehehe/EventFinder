import { Outlet } from "react-router-dom";
import NavigationBar from '../components/NavigationBar2';
import * as AuthProvider from './../config/authProvider'

export default function NavTemplate(){
    let authContext = AuthProvider.useAuth();

    return (
        <div>
            <NavigationBar authContext={authContext}/>
            <Outlet />
        </div>
    );
}
