import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, CardMedia, CardActionArea } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: "100%"
    },
    media: {
        height: 700
    }
}));

const Home = () => {
    const classes = useStyles();
    return (
        <Box>
            <Card>
                <CardActionArea>
                    <CardMedia className={classes.media}
                        // component='img'
                        image="https://picsum.photos/1000/500"
                        title="HomePage Image"
                    />
                </CardActionArea>
            </Card>
        </Box>
    )
}

export default Home
