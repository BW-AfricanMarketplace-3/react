import React from "react";
import { connect } from "react-redux";
import { actionUser } from "../actions";
import { Link } from "react-router-dom";




class HomePage extends React.Component{


    componentDidMount(){
        this.props.getUsers()
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render(){
        // const { user, users } = this.props;
        return(
            <div>
            <Link to="/">Home</Link>
            <Link to="/product">Product</Link>
            <Link to="/listings">Listings</Link>
                <h1>Hello and Welcome to your MarketPlace</h1>
                
                <h3>All your personal listings</h3>
            
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionUserCreators = {
    getUsers: actionUser.getAll,
    deleteUser: actionUser.delete
}

const connectHomePage = connect(mapState, actionUserCreators)(HomePage);
export { connectHomePage as HomePage };