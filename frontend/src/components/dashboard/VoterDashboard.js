import React from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {withRouter} from "react-router";
import * as Joi from "joi-browser";

class VoterDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            candidates: [],
            id_voter: ""
        }

        this.schema = {
            id_voter: Joi.string()
                .required()
                .label("id_votant")
        }

        this.renderCandidates = this.renderCandidate.bind(this);
        this.submitRegistration = this.submitRegistration.bind(this);
        this.showCandidates = this.showCandidates.bind(this);
    }

    getCandidates() {
        fetch('http://localhost:3001/api/get_candidates', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                res.json().then(json => {
                    this.setState({ candidates: json });
                });
            } else {
                console.log("error");
            }
        });
    }

    showCandidates() {
        return (<div className="container-fluid">
            <div className="row">
                { this.state.candidates.map(candidate => this.renderCandidate(candidate)) }
            </div>
        </div>);
    }

    submitRegistration = () => {
        const payload = {
            id_voter: this.state.id_voter,
            username: localStorage.getItem('username')
        }

        console.log(payload.id_voter);
        console.log(localStorage.getItem('username'));

        var formBody = [];
        for (var property in payload) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(payload[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://localhost:3001/api/add_vote', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formBody
        }).then(res => {
            if (res.status === 200 || res.status === 204) {
                console.log('cerere creata');
                alert('Cerere de votare inregistrata!');
                // this.showCandidates();
                this.getCandidates();
            } else if (res.status === 404) {
                alert('ID VOTANT INVALID!');
            } else if (res.status === 403) {
                alert('Se poate vota o singura data!');
                localStorage.clear();
                this.props.history.replace('/vote_done');
            }
        });
    }

    submitVote = (candidate_selected) => {
        const payload = {
            id_voter: this.state.id_voter,
            candidate: candidate_selected,
        }

        var formBody = [];
        for (var property in payload) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(payload[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://localhost:3001/api/confirm_vote', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formBody
        }).then(res => {
            if (res.status === 200 || res.status === 204) {
                // alert('Ati votat cu succes!');
                this.props.history.replace('/vote_done');
            } else {
                alert('error');
            }
        });
    }

    logout() {
        localStorage.clear();
        this.props.history.replace('/login');
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    renderCandidate = (candidate) => {
        return (
          <div className="card mt-3 col-md-6 col-lg-3 mr-5 mb-2" onClick={() => console.log(candidate)} style={{ cursor: "pointer", width: "50px" }}>
              <div className="card-body">
                  <h4 className="card-title">{candidate}</h4>
              </div>
              <div className="card-footer">
                  <small className="text-muted">Some details</small>
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
        return (
            <div className="d-flex justify-content-center align-items-center" style={{margin:"80vh" ,height:"100vh", marginTop:"100px"}}>
                <Form className="d-flex flex-column borderedform border rounded border-secondary custom-container" style={{width:"40%"}}>
                    <h2 className="align-self-center">Inregistrare cerere vot</h2>
                    <hr/>
                    <Form.Group controlId="formUser">
                        <Form.Label className="labels">ID VOTANT</Form.Label>
                        <Form.Control className="align-self-center" name="id_voter" type="text" placeholder="ID VOTANT" onChange={this.handleChange.bind(this)}>
                        </Form.Control>
                    </Form.Group>

                    <Button className="align-self-center mybtn" onClick={this.submitRegistration}>
                        TRIMITE
                    </Button>
                </Form>
                <div className="container-fluid">
                    <div className="row">
                        { this.state.candidates.map(candidate => this.renderCandidate(candidate)) }
                    </div>
                </div>
            </div>
        );
    }
}

export default VoterDashboard;