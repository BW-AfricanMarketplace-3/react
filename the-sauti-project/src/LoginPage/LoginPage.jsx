import React from "react";
import { actionUser } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";;




class LoginPage extends React.Component{
    constructor(props){
        super(props);

        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const { name, value }= e.target;
        this.setState({ [name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if ( username && password) {
            this.props.login(username, password)
        }
    }

    

    render(){
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return(
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                <div className={ "form-group" + (submitted && !username ? " has error" : ''  )}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={username} onChange={this.handleChange} />
                    {submitted && !username && 
                    <div> username is requires</div>
                    }
                </div>
                <div className={ "form-group" + (submitted && !username ? " has error" : ''  )}>
                        <label htmlFor="password">password</label>
                        <input type="password" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                        <div> password is required</div>
                        }
                </div>
                <div>
                    <button>Login</button>
                    {loggingIn}
                    <Link to="/register">Register</Link>
                </div>

                </form>
            </div>
        )
    }
}
function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators ={
    login: actionUser.login,
    logout: actionUser.logout
}
const connectLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectLoginPage as LoginPage };