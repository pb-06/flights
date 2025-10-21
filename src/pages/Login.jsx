import { Component } from "react";
import LoginForm from "../components/LoginForm.jsx";

export default class Login extends Component {
    render() {
        return (
            <>
                <LoginForm onLogin={this.props.onLogin} />
            </>
        )
    }
}