import Joi from "joi-browser";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            id: "",
            name: "",
            cnp: "",
            address: "",
            email: "",
            phone: "",
            username: "",
            password: "",
            errors: {}
        }
        this.schema = {
            username: Joi
                .string()
                .required()
                .label('Username'),
            password: Joi
                .string()
                .required()
                .label('Password')
        };
        this.handleChange = this.handleChange.bind(this);
        this.addPerson = this.addPerson.bind(this);
        this.registerAccount = this.registerAccount.bind(this);
    }

    addPerson = () => {
        let payload = {
            id: localStorage.getItem('id'),
            name: this.state.name,
            cnp: this.state.cnp,
            address: this.state.address,
            email: this.state.email,
            phone: this.state.phone
        };

        console.log(payload);

        var formBody = [];
        for (var property in payload) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(payload[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");

        fetch('http://localhost:2999/api/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        }).then(res =>  {
            if (res.status === 201) {
                alert('ID-ul dumneavoastra este ' + localStorage.getItem("id") + '\n Va rugam sa va salvati acest ID, acesta va fi folosit pentru a vota');
                localStorage.clear();
                this.props.history.replace("/login");
            } else {
                const payload = {
                    username: localStorage.getItem('username')
                }

                var formBody = [];
                for (var property in payload) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(payload[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");

                fetch('http://localhost:2999/api/deleteuser', {
                   method: 'DELETE',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    body: formBody
                }).then(res =>{
                    if (res.status === 404) {
                        alert('user not found');
                    }
                });
                res.json().then(json => {
                    let errors = "";
                    Object.entries(json.error.errors).forEach(err => {
                        console.log(err[1].message);
                        errors += (err[1].message) + '\n';
                    });
                    alert(errors);
                });
            }
        });
    }

    registerAccount = () => {
        let payload = {
            username: this.state.username,
            password: this.state.password,

        };

        var formBody = [];
        for (var property in payload) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(payload[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://localhost:2999/api/add_user', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        }).then(res => {
            if (res.status === 201) {
                // const id = res.json().then(json => {
                //     return json.result.id.value();
                // });
                res.json().then(json => { localStorage.setItem("id", json.result.id); localStorage.setItem("username", json.result.username)});
                // localStorage.setItem("id", id.toString());
                this.addPerson();
            } else if (res.status === 404) {
                alert('error');
            } else {
                alert('error 500');
            }
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        document.body.classList = "";
        document.body.classList.add("background-general");
        return (
            <div>
                <div className="d-flex justify-content-center align-items-center" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '80%'}}>
                    <Form className="borderedform d-flex flex-column border rounded border-secondary custom-container" style={{ width: '30%', height: '70%'}}>
                        <h2 className="align-self-center">Înregistrare</h2>
                        <hr/>
                        <Form.Group controlId="formName">
                            <Form.Label className="labels">Nume complet</Form.Label>
                            <Form.Control className="align-self-center" name="name" type="text" placeholder="Nume complet" onChange={this.handleChange}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formCNP">
                            <Form.Label className="labels">CNP</Form.Label>
                            <Form.Control className="align-self-center" name="cnp" type="text" placeholder="CNP" onChange={this.handleChange}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formAdresa">
                            <Form.Label className="labels">Adresa</Form.Label>
                            <Form.Control className="align-self-center" name="address" type="text" placeholder="Adresa" onChange={this.handleChange}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label className="labels">Email</Form.Label>
                            <Form.Control className="align-self-center" name="email" type="text" placeholder="Email" onChange={this.handleChange}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formPhone">
                            <Form.Label className="labels">Telefon</Form.Label>
                            <Form.Control className="align-self-center" name="phone" type="text" placeholder="Telefon" onChange={this.handleChange}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formUser">
                            <Form.Label className="labels">Username</Form.Label>
                            <Form.Control className="align-self-center" name="username" type="text" placeholder="Username" onChange={this.handleChange}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label className="labels">Parola</Form.Label>
                            <Form.Control className="align-self-center" name="password" type="text" placeholder="Parola" onChange={this.handleChange}>
                            </Form.Control>
                        </Form.Group>

                        <Button className="align-self-center mybtn" onClick={() => {
                            // this.addPerson();
                            this.registerAccount();
                        }}>
                            Register
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Register;