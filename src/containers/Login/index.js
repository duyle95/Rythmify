import React from 'react';
import { connect } from 'react-redux';
import { authorizeUser } from '../../modular/auth';
import "./Login.scss";

class Login extends React.Component {
    render() {
        return (
            <div className="login">
                <div className="login__content">
                    {/* <span className="login__title">Search and preview songs</span> */}
                    <button className="login__button" onClick={this.props.authorizeUser}>Log in with Spotify</button>
                </div>
                <span className="login__background-image"></span>
            </div>
        )
    }
}

export default connect(null, { authorizeUser })(Login);