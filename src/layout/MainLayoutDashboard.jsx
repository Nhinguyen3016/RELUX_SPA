import { Outlet } from 'react-router-dom';
import HeaderDashboard from "./component/header-dashboard";
import SidebarDashboard from "./component/sidebar-dashboard";
import '../styles/dashboard/MainLayoutDashboard.css';

const MainLayoutDashboard = () => {
    return (
        <div className="App">
        <HeaderDashboard />
        <div className="main-container">
          <div className="sidebar-container">
              <SidebarDashboard />
          </div>
          <div className="service-content">
              <Outlet />
          </div>
        </div>
      </div> 
    )
}

export default MainLayoutDashboard;
