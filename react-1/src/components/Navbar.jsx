import React, { Fragment } from 'react';
import { AppBar, Toolbar, Typography, Paper, Tabs, Tab } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const pathName = useLocation().pathname;
    return (
        <Fragment>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        African Marketplace
                    </Typography>
                </Toolbar>
            </AppBar>

            <Paper>
                <Tabs value={pathName} indicatorColor='primary' textColor='primary' centered>
                    <Tab label="Home" component={Link} value="/" to='/' />
                    <Tab label="Sign Up" component={Link} value="/signup" to='/signup' />
                    <Tab label="Sign In" component={Link} value="/signin" to='/signin' />
                </Tabs>
            </Paper>
        </Fragment>
    )
}

export default Navbar
