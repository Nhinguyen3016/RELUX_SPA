import Header from "./component/Header"
import Footer from "./component/Footer"
<<<<<<< HEAD
import { SheetProvider } from "../context/SheetContext"
=======

>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
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