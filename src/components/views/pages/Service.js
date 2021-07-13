import React from 'react'
import ServicePage from "../../../assets/img/theme/service-page.png";
import { makeStyles, Card, CardContent, CardMedia, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: "100%"
    },
    media: {
        height: 650
    }
}))
const Service = () => {
    const classes = useStyles();
    return (<>
        <Box>
            <Card className={classes.card}>
                <CardContent>
                    <CardMedia component="img"
                        image={ServicePage}
                    />
                </CardContent>
            </Card>
        </Box>
    </>)
}

export default Service
