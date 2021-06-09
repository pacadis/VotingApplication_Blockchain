import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { values: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.vote_status = false;

        fetch('http://localhost:2999/api/status', {
           method: 'GET',
           headers: {
               'Content-type': 'application/json'
           }
        }).then(res => {
            console.log(res.status);
            if (res.status === 200 || res.status === 304) {
                this.vote_status = true;
                console.log(this.vote_status);
                console.log("este aici");
            } else if (res.status === 404) {
                this.vote_status = false;
            }
        })
    }

    createUI(){
        return this.state.values.map((el, i) =>
            <div key={i} style={{display: 'inline-flex',  justifyContent:'center', alignItems:'center', flex: 1}}>
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
                // this.props.history.replace('/');
            } else {
                alert('Error');
            }
        })
    }

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
        // let { status } = this.state;
        // console.log(status + "render");
        // if (status === false) {
            return (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                    <div className="border d-flex align-items-center justify-content-center"
                         style={{display: 'inline-flex', justifyContent: 'center', alignItems: 'center'}}>
                        <div className="border d-flex align-items-center justify-content-center" style={{
                            display: 'inline-grid',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                            height: '100vh'
                        }}>
                            {this.createUI()}
                        </div>
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
            );
        // } else {
        //     return (
        //         <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        //             <Button className="align-self-center mybtn" onClick={() => this.handleResults()}
        //                     style={{margin: "10px"}}>
        //                 Calculeaza rezultate
        //             </Button>
        //         </div>
        //     );
        // }
    }
}

export default AdminDashboard;