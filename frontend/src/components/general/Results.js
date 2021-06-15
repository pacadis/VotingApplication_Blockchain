import React from "react";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import NavBar from '../utils/navbar';

var Candidate = (props) => {
    return <div className="card mt-3 col-md-6 col-lg-3 mr-5 mb-2" style={{ display: "block", justifyContent: "center", alignItems: "center", cursor: "pointer", width: "50px" }}>
        <div className="card-body">
            <h4 className="card-title">{ props.candidate }</h4>
        </div>
        <div className="card-footer">
            <small className="text-muted">{ props.votes }</small>
        </div>
    </div>
}

class Results extends React.Component {
    constructor() {
        super();

        this.state = { candidates: [] };
        this.results = false;
        fetch('http://localhost:3001/api/get_results', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => {
            if (res.status === 400) {
                alert('Sesiunea de votare este in desfasurare');
                this.results = false;
            }
            else {
                console.log(res.body);
                this.results = true;
                res.json().then(json => {
                    console.log(json);
                    let candidates = json.map((candidate) => {
                        return <Candidate key={candidate.candidate} {...candidate}/>
                    });
                    this.setState({'candidates': candidates});
                    console.log(this.state.candidates);
                });
            }
        });
    }

    renderCandidate = (candidate) => {
        if (this.results === false)
            this.props.history.replace('/');
        return (
            <div className="borderedformb"
                 style={{ display: 'grid', cursor: "pointer", grid:'2', alignItems:'center', justifyContent: 'center', height:'min-content', padding:'10px',
                     width:'inherit', borderStyle:'solid', borderRadius:'15px', margin:'15px'}}>
                <h4 className="">{candidate.props.candidate}</h4>
                <h4 className="">{candidate.props.votes} voturi</h4>
            </div>
        );
    }

    render() {
        document.body.classList = "";
        document.body.classList.add("background-general");
        return <div className="" style={{marginTop:"100px", display: 'grid', alignItems:'center', justifyContent:'center', grid:'2'}}>
            <NavBar/>
            <div className="container-fluid" style={{ padding:'10px', display: 'grid', grid:'2', marginTop:'100px'}}>
                <h4 style={{fontSize:'30px'}}>Rezultate sesiune votare</h4>
                { this.state.candidates.map(candidate => this.renderCandidate(candidate)) }
            </div>
            </div>

    }
}

export default Results;