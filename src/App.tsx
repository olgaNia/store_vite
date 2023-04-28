import {Container} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Store} from "./pages/Store";
import {Contacts} from "./pages/Contacts";
import {Navbar} from "./components/Navbar"
import {ShoppingCartProvider} from "./context/ShoppingCartContext";


function App() {
    return (
        <ShoppingCartProvider>

            <Navbar/>
            <Container className="me-3">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/store" element={<Store/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                </Routes>
            </Container>
        </ShoppingCartProvider>
    )

}

export default App
