import React from "react";
import Button from "react-bootstrap/Button";

class StartDashboard extends React.Component {
    // constructor() {
    //     super();
    // }

    render() {
        return (
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                <Button className="align-self-center mybtn" onClick={() => this.props.history.push('/login')} style={{ width: "25vh", margin: "2vh"}}>
                    VOTEAZĂ
                </Button>
                <Button className="align-self-center mybtn" onClick={() => this.props.history.push('/register')} style={{ width: "25vh", margin: "2vh" }}>
                    ÎNREGISTREAZĂ-TE
                </Button>
            </div>
        );
    }
}

export default StartDashboard;