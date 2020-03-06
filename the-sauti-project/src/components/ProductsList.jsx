import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import Product from './Product';
import { Grid, Container } from '@material-ui/core';
import PostItems from "../crud_Operation/PostForm";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const ProductsList = () => {
    const [itemsList, setItemsList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await Axios.get('http://africanmarketplace.ddns.net:5000/api/listings');
            setItemsList(res.data);
            console.log(res.data);
        }

        fetchData();
    }, [])
    return (

        <Container>
       
        <Button><Link to="/">Home</Link></Button>
        <Button><Link to="/prices">prices</Link></Button>
        <Button><Link to="/listings">Add Products</Link></Button>
    
        <h1 style={{textAlign:"center"}}>Welcome to your Dashboard</h1>
        <PostItems />

            <Grid style={{border: "solid 2px black", padding: "3%", borderRadius: "20px"}} justify='center' container>
                { itemsList.map(item => (
                    <Product key={item.id} product={item} />
                )) }
            </Grid>
        </Container>
    )
}

export default ProductsList
