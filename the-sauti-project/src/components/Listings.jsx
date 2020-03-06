import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import ListingItem from './ListingItem';
import { Grid, Container, makeStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    }
  }));

const Listings = () => {
    // debugger
    // TODO change to dinamic token
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6OSwiaWF0IjoxNTgzMzQ5MjAyLCJleHAiOjE1ODM0MzU2MDJ9.AIa9vshllTsHHXFmJ8E_yp65tsQ3fCcUtbG9BroPGnM';
    const token = sessionStorage.getItem('token');


    const classes = useStyles();
    const [listings, setListings] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({
        id: '',
        username: ''
    });

    // Fetches data when user selects an user
    useEffect(() => {
        const config = { headers: { 'Authorization':token } }
        const fetchAllListings = async () => {            
            try {
                const res = await Axios.get('http://africanmarketplace.ddns.net:5000/api/listings');                    
                setListings(res.data);
            } catch(err) {
                console.log(err.message);
            }
        }

        const fetchUserListings = async () => {
            try {
                const res = await Axios.get(`http://africanmarketplace.ddns.net:5000/api/users/${selectedUser.id}/listings`, config);
                setListings(res.data);
            } catch(err) {
                console.log(err.message);
            }
        }

        if(selectedUser.id === '') {
            fetchAllListings();
        } else {
            fetchUserListings();
        }
    }, [selectedUser]);

    useEffect(() => {
        // Fetch users for the select input
        const fetchUsers = async () => {
            try {
                const res = await Axios.get('http://africanmarketplace.ddns.net:5000/api/users/');
                setUsers(res.data);
            } catch(err) {
                console.log(err.message);
            }
        }
        fetchUsers();
    }, [])

    const handleChange = e => setSelectedUser(e.target.value);
    
    return (
        <Container>
            <FormControl className={classes.formControl}>
                <InputLabel id="user-select-label">Select User</InputLabel>
                <Select value={selectedUser.id === '' ? '' : selectedUser} labelId='user-select-label' displayEmpty onChange={handleChange}>
                    <MenuItem value={{id: ''}}>All Listings</MenuItem>
                    {users.map(user => (
                        <MenuItem key={user.id} value={user}>
                            {user.username}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Grid justify='flex-start' container>
                { listings.map(item => (
                    <ListingItem key={item.id} listing={item} />
                )) }
            </Grid>
        </Container>
    )
}

export default Listings
