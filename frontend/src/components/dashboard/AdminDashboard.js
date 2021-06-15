import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import NavBar from '../utils/navbar';

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { values: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.vote_status = false;


    }

    createUI(){
        return this.state.values.map((el, i) =>
            <div className="border-dark" key={i} style={{display: 'inline-flex',  justifyContent:'center', alignItems:'center', flex: 1, borderStyle: 'solid', margin: "10px", backgroundColor: '#DEDEDE'}}>
                <Form.Group controlId="formCandidat">
                    <Form.Label className="labels">Nume candidat</Form.Label>
                    <Form.Control className="align-self-center" name="candidat" type="text" placeholder="Nume candidat" onChange={this.handleChange.bind(this, i)}>
                    </Form.Control>
                </Form.Group>

                <Button className="align-self-center mybtn" style={{ margin: "10px"}} onClick={this.removeClick.bind(this, i)}>
                    STERGE
                </Button>
            </div>
        )
    }

    handleChange(i, event) {
        let values = [...this.state.values];
        values[i] = event.target.value;
        this.setState({ values });
    }

    addClick(){
        this.setState(prevState => ({ values: [...prevState.values, '']}))
    }

    removeClick(i){
        let values = [...this.state.values];
        values.splice(i,1);
        this.setState({ values });
    }

    handleSubmit() {
        if (this.state.values.length <= 1) {
            alert('Nu au fost adăugați candidați')
        } else {
            var formBody = [];
            for (let cand in this.state.values) {
                console.log(this.state.values[cand]);
                var encodedKey = encodeURIComponent(this.state.values[cand]);
                var encodedValue = encodeURIComponent(this.state.values[cand]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            fetch('http://localhost:2999/api/data', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formBody
            }).then(res => {
                if (res.status === 200) {
                    alert('created');
                    this.props.history.replace('/end_vote');
                } else {
                    alert('Error');
                }
            });
        }
    }

    render() {
        document.body.classList = "";
        document.body.classList.add("background-general");
        return (
            <div style={{display: 'grid', justifyContent: 'center', alignItems: 'center', grid: '1', padding:'10px', backgroundColor: 'transparent'}}>
                <div className="border-dark d-flex align-items-center justify-content-center"
                     style={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderColor:'black', padding: '10px'}}>
                    <div className="border-dark  align-items-center justify-content-center" style={{
                        display: 'inline-grid',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderStyle: 'solid'
                    }}>
                        {this.createUI()}
                    </div>
                    <div className="border-dark d-flex align-items-center justify-content-center"
                         style={{display: 'grid', grid: '1', borderStyle: 'solid', backgroundColor: '#DEDEDE'}}>
                        <Button className="align-self-center mybtn" onClick={this.addClick.bind(this)}
                                style={{margin: "10px"}}>
                            Adauga candidat
                        </Button>
                        <Button className="align-self-center mybtn" onClick={() => this.handleSubmit()}
                                style={{margin: "10px"}}>
                            Creeaza Votul
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;