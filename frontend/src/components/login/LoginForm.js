import React from "react";
import Form from "react-bootstrap/Form";
import Joi from "joi-browser";
import Button from "react-bootstrap/Button";

class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
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
        this.doSubmit = this.doSubmit.bind(this);
    }

    doSubmit = () => {
        const payload = {
            username: this.state.username,
            password: this.state.password
        };

        var formBody = [];
        for (var property in payload) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(payload[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        }).then(res => res.json()).then(res => {
            if (res.status === 200) {
                const token = res.token;
                localStorage.setItem('username', this.state.username);
                localStorage.setItem('token', token);
                this.props.history.replace("/voter_dashboard");
            } else if (res.status === 404) {
                alert('User not found!');
            } else if (res.status === 401) {
                alert('Wrong password');
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
              <div className="d-flex justify-content-center align-items-center" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                  <Form className="d-flex flex-column border rounded border-secondary custom-container" style={{ width: "40%" }}>
                      <h2 className="align-self-center">Login</h2>
                      <hr/>
                      <Form.Group controlId="formUser">
                          <Form.Label className="labels">Nume utilizator</Form.Label>
                          <Form.Control className="align-self-center" name="username" type="text" placeholder="Nume utilizator" onChange={this.handleChange}>
                          </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="formPassword">
                          <Form.Label className="labels">Parola</Form.Label>
                          <Form.Control className="align-self-center" name="password" type="password" placeholder="Parola" onChange={this.handleChange}/>
                      </Form.Group>
                      <Button className="align-self-center mybtn" onClick={this.doSubmit}>
                          Login
                      </Button>
                  </Form>
              </div>
          </div>
        );
    }
}

export default LoginForm;