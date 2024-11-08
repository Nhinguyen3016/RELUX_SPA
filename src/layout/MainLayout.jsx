import { Outlet } from 'react-router-dom';
import Header from "./component/Header"
import Footer from "./component/Footer"


const MainLayout = () => {
    return (
        <>
        <Header />
        <div>
            <Outlet />
        </div>
        <Footer />
        </>
    )
}

export default MainLayout;

