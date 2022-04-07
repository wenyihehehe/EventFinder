import { Outlet } from "react-router-dom";
import NavigationBar from '../components/NavigationBar';

export default function NavTemplate(){
    return (
        <div>
            <NavigationBar />
            <Outlet />
        </div>
    );
}
