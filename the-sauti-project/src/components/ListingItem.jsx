import React from 'react'
import { Card, CardContent, Typography, makeStyles, Grid } from '@material-ui/core';
import { LocationOn, AccountCircle } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
        minHeight: '150px'
    },
    infoText: {
        display: 'flex',
        alignItems: 'center',
        margin: '4px 0'
    },
    itemTitle: {
        borderBottom: '2px inset'
    },
    addMarginBottom: {
        marginBottom: '1rem'
    }
}))

const ListingItem = ({ listing }) => {
    const { id, user_id, username, location, item, description, price } = listing;
    const classes = useStyles();

    return (
        <Grid item xs={12} md={6} lg={3} >
            <Card className={classes.root}>
                <CardContent>
                    <Grid container justify='space-between'>
                        <Grid item>
                            <Typography className={classes.itemTitle} color='textPrimary' variant="h5" component="h2">
                                {item}
                            </Typography>
                            <Typography className={classes.addMarginBottom} variant="body2" color="textSecondary" component="p">
                                {description}
                            </Typography>
                            <Typography className={classes.infoText} variant="body2" color="textSecondary" component="p">
                                <AccountCircle /> {username}
                            </Typography>
                            <Typography className={classes.infoText} variant="body2" color="textSecondary" component="p">
                               <LocationOn /> {location}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">
                                ${price.toFixed(2)}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default ListingItem
