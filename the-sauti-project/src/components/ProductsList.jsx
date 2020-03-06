import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import Product from './Product';
import { Grid, Container } from '@material-ui/core';
import PostItems from "../crud_Operation/PostForm";

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
        <PostItems />

            <Grid justify='center' container>
                { itemsList.map(item => (
                    <Product key={item.id} product={item} />
                )) }
            </Grid>
        </Container>
    )
}

export default ProductsList
