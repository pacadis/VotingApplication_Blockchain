import React from "react";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";

var Candidate = (props) => {
    return <div className="card mt-3 col-md-6 col-lg-3 mr-5 mb-2" style={{ display: "block", justifyContent: "center", alignItems: "center", cursor: "pointer", width: "50px" }}>
        <div className="card-body">
            <h4 className="card-title">{props.candidate}</h4>
        </div>
        <div className="card-footer">
            <small className="text-muted">{props.votes}</small>
        </div>
    </div>
}

class Results extends React.Component {
    constructor() {
        super();

        let results = []
        fetch('http://localhost:3001/api/get_results', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => {
            res.json().then(json => {
                var candidates = json.map((candidate) => {
                    return <Candidate key={candidate.candidate} {...candidate}/>
                });
                this.setState({ candidates });
            });
            //     res.json().then(json => {
            //         json.forEach(json => {
            //             let data = Object.values(json);
            //             results[data[0]] = data[1];
            //         });
            //     });
            // } else {
            //     alert('error');
            // }
            // if (res.status === 200 || res.status === 304) {
        });
        this.state = { 'candidates': 'Please wait' };
        console.log(this.state.candidates);
    }

    renderCandidate = (candidate) => {
        console.log("render candidate" + candidate);
        return (
            <div className="card mt-3 col-md-6 col-lg-3 mr-5 mb-2" onClick={() => console.log(candidate)} style={{ cursor: "pointer", width: "50px" }}>
                <div className="card-body">
                    <h4 className="card-title">{candidate}</h4>
                </div>
                <div className="card-footer">
                    <small className="text-muted">{candidate[1]}</small>
                </div>
                <div className="card-footer">
                    <div className="btn-group justify-content-center d-flex align-items-center align-middle">
                        <Button className="btn btn-warning btn-md center-block mr-3" onClick={() => this.submitVote(candidate)}>
                            <FontAwesomeIcon icon={faEdit}/>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return <div className="" style={{margin:"80vh" ,height:"100vh", marginTop:"100px"}}>
                {/*<div className="container-fluid">*/}
                {/*    <Button className="align-self-center mybtn" onClick={this.getResults.bind(this)}>*/}
                {/*        AFISEAZA REZULTATE*/}
                {/*    </Button>*/}
                {/*    <div className="row">*/}
                {/*        {*/}
                {/*            this.state.candidates.map(rez => this.renderCandidate(rez))*/}
                {/*        }*/}
                {/*    </div>*/}
                {/*</div>*/}
                Results {this.props.candidate}
            {this.state.candidates}
            </div>

    }
}

export default Results;