import React from 'react';
import { connect } from 'react-redux';
import { saveLoginCredentials } from '../../modular/auth';

class Callback extends React.Component {
    componentDidMount() {
        this.props.saveLoginCredentials();
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default connect(null, { saveLoginCredentials })(Callback);