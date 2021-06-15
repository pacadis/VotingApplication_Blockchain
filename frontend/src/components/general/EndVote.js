import React from "react";
import NavBar from "../utils/navbar";
import {Button} from "react-bootstrap";

class EndVote extends React.Component {
    handleResults() {
        fetch('http://localhost:3001/api/close_vote', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                alert('Vote closed');
                localStorage.clear();
                this.props.history.replace('/');
            } else {
                alert('Error');
            }
        })
        alert('compute results');
        localStorage.clear();
        this.props.history.replace('/');
    }
    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <NavBar/>
                <Button className="align-self-center mybtn" onClick={() => this.handleResults()}
                        style={{margin: "10px", marginTop: '100px'}}>
                    Calculeaza rezultate
                </Button>
            </div>
        );
    }
}

export default EndVote;