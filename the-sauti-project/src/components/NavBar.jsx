import React, { Fragment } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, makeStyles, Container } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    appbar: {
        backgroundColor: theme.palette.secondary.main
    },
    tab: {
        backgroundColor: '#fff',
        marginBottom: '20px'
    }
}))

const Navbar = () => {
    const classes = useStyles();

    let pathName = useLocation().pathname;
    
    if(!sessionStorage.getItem('token')) {
        if(!['/login', '/signup'].includes(pathName)) {
            pathName = '/login';
        }    
    }
    

    return (
        <Fragment>
            <AppBar className={classes.appbar} position="static">
                <Container>
                    <Toolbar>
                        <Typography variant="h6">
                            Sauti Marketplace
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            { sessionStorage.getItem('token') ?
                <Tabs className={classes.tab} value={pathName} indicatorColor='primary' textColor='primary' centered>
                    <Tab label="Home" component={Link} value="/" to='/' />
                    <Tab label="Prices" component={Link} value="/prices" to='/prices' />
                    <Tab label="Listings" component={Link} value="/listings" to='/listings' />
                </Tabs>
                : 
                <Tabs className={classes.tab} value={pathName} indicatorColor='primary' textColor='primary' centered>
                    <Tab label="Login" component={Link} value="/login" to='/login' />
                    <Tab label="Sign Up" component={Link} value="/signup" to='/signup' />
                </Tabs>
            }
        </Fragment>
    )
}

export default Navbar
