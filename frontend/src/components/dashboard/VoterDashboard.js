import React from "react";
import {Container, Nav} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {withRouter} from "react-router";
import * as Joi from "joi-browser";
import NavBar from '../utils/navbar';

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
            } else if (res.status === 400) {
                alert('Nu există sesiunde de vot activă');
                this.props.history.replace('/results');
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
          <div className="borderedformb"
               style={{ display: 'inline-grid', cursor: "pointer", grid:'2', alignItems:'center', justifyContent: 'center', height:'min-content', padding:'10px',
               width:'inherit', borderStyle:'solid', borderRadius:'15px', margin:'15px'}}>
                  <h4 className="">{candidate}</h4>
                  <Button className="mybtn" onClick={() => this.submitVote(candidate)}>
                      VOTEAZĂ
                  </Button>
          </div>
        );
    }

    render() {
        document.body.classList = "";
        document.body.classList.add("background-general");
        return (
            <div className="d-grid justify-content-center align-items-center"
                 style={{display: 'flex', alignItems:'center', justifyContent:'center', padding: '10px', flex:'1', position: "relative"}}>
                <NavBar/>
                <Form className="d-flex flex-column borderedform border rounded border-secondary custom-container"
                      style={{width:'min-content', display: 'grid', alignItems:'center', justifyContent:'center', padding: '10px', grid: '2', marginTop:"100px"}}>
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
                <div className="" style={{display: 'flex', justifyContent:'center', alignItems:'center', padding:'10px'}}>
                        { this.state.candidates.map(candidate => this.renderCandidate(candidate)) }
                </div>
            </div>
        );
    }
}

export default VoterDashboard;