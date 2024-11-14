import Header from "./component/Header"
import Footer from "./component/Footer"

const MainLayout = ({children}) => {
    return (
        <>
        <Header />
        <div>
            {children}
        </div>
        <Footer />
        </>
    )
}

export default MainLayout