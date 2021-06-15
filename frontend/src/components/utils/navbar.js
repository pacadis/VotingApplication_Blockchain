import "bootstrap/dist/css/bootstrap.css";
import React from 'react'
import { Navbar,Nav } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

class BootstrapNavbar extends React.Component{

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(){
        const distanceY = window.pageYOffset || document.documentElement.scrollTop;
        if(distanceY > 80){
            document.getElementById('navigation').classList.add("smaller");
        }
        else{
            document.getElementById('navigation').classList.remove("smaller");
        }
    }

    handleLogout = () => {
        localStorage.clear();
    }

    links = () => {
            return (
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/results" className="mybtnnavbar">Rezultate</Nav.Link>
                        <Nav.Link href="/" className="mybtnnavbar" onClick={this.handleLogout.bind(this)}>
                            Deconectare
                            <FontAwesomeIcon icon={faSignOutAlt} style={{marginRight: "1rem"}}/>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            );
    }

    render(){
        return(
            <Navbar id="navigation" bg="dark" variant="dark" expand="sm" sticky="top">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                {this.links()}
            </Navbar>
        )
    }
}

export default BootstrapNavbar;
