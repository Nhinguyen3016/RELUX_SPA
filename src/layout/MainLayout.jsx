import Header from "./component/Header"
import Footer from "./component/Footer"
import { SheetProvider } from "../context/SheetContext"
const MainLayout = ({children}) => {
    return (
        <SheetProvider>
            <Header />
            <div>
                {children}
            </div>
            <Footer />
        </SheetProvider>
    )
}

export default MainLayout