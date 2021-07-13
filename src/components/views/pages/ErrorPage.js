import React from 'react'
import { Card, CardMedia, CardContent, Grid, Typography, Button } from "@material-ui/core";
import { Link } from 'react-router-dom';
import errPageimg from "../../../assets/img/theme/page-not-found.jpg";

const ErrorPage = () => {
    return (    
        <Grid container justify="center">
            <Grid item lg={6}>
            <Card style={{ marginTop:"20px"}}>
                <CardContent align="center">                
                    <CardMedia image={errPageimg} style={{height:"550px", width:"100%"}} title="Error" />
                    <Typography variant="h4" color="primary" align="center" gutterBottom>OPPS! Page Not found</Typography>
                    <Button variant="outlined" color="primary" component={Link} to="/">Return Home</Button>
                </CardContent>
            </Card>
            </Grid>
        </Grid>

    )
}

export default ErrorPage
