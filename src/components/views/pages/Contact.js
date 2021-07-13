import React from 'react'
import { makeStyles, Box, Card, CardContent, CardMedia, Grid } from '@material-ui/core';
import contactPhoto from '../../../assets/img/theme/contact.jpg';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: "100%"
    },
    media: {
        height: 650
    }
}))

const Contact = () => {
    const classes = useStyles();
    return (<>
        <Box>
            <Card className={classes.card}>
                <CardContent>
                    <CardMedia component="img"
                        image={contactPhoto}
                        title="Contact Us"
                    />
                </CardContent>
            </Card>
        </Box>
    </>)
}

export default Contact
