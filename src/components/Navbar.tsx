import {Button, Container, Nav, Navbar as NavbarBs,NavLink as NavLinkBs} from "react-bootstrap"
import {NavLink} from "react-router-dom"

export function Navbar() {
    return (
        <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
            <Container>
                <Nav className="me-auto" variant="tabs">
                    <NavLinkBs to="/" as={NavLink} >
                        Home
                    </NavLinkBs>

                    <NavLinkBs to="/store" as={NavLink} >
                        Store
                    </NavLinkBs>

                    <NavLinkBs to="/contacts" as={NavLink}>
                        Contacts
                    </NavLinkBs>
                </Nav>
                <Button className="rounded-circle"
                        variant="outline-primary"
                        style={{width: "3rem", height: "3rem", position: "relative"}}>
                    <img className="icon" width="20px" height="20px" src="cart.svg" />
                    <div className="rounded-circle bg-danger d-flex justify-content-center align-content-center"
                         style={{
                             width: "1.5rem",
                             height: "1.5rem",
                             position: "absolute",
                             bottom: 0,
                             right: 0,
                             transform: "translate(30%,20%)",
                         }}
                    >
1
                    </div>
                </Button>
            </Container>

        </NavbarBs>
    )
}

