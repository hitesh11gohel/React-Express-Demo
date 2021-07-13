import React, {useState} from "react";
import { Controller, useForm } from 'react-hook-form';
import { makeStyles, Grid, Box, TextField, Container, Typography, Paper, Button, FormControlLabel, Divider } from "@material-ui/core";
import User1 from "../../../assets/img/Parent+Child/user1.png";

import GetAppIcon from '@material-ui/icons/GetApp';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
    root:{border: '1px solid grey', padding:'25px'},
    paper: {padding: '25px', border: '1px solid black'},
    typography: {textAlign:'center'},
    typographyJustify: {textAlign:'justify'},
    images : {width: '50%', borderRadius:'50%', border:'1px solid lightgrey', padding:'5px', margin: '10px 0px 10px 0px' },
    imgBox : {textAlign:'center'},
    divider : {color:'red', margin: '10px 0px'},
}))

function Child1(props) {
    const classes = useStyles();

    const [sibling1, setSibling1] = useState();
    const {register, errors, handleSubmit} = useForm();

    let userInfo = `14+ years of IT experience in Web application development in Microsoft Technologies.
                    I am expertise in designing enterprise-level architecture using SOLID Principal for Microsoft Web Application.
                    I have good command over Database Development, Administration, Database design & support of MS SQL Server.` 
    const emailId = 'kaushal.solanki@gmail.com';

    const onSubmit = (data) => {
        props.sibling1Data(data.email)
    }

    // send data to Parent component
    const SendData = () => {        
        props.data(sibling1);
        // props.data(emailId)
    }

    return(<>
        <Container component={Box} mt='5rem'>
            <Grid container justify='center'>
            {/* <Grid item lg={4} /> */}
            <Grid item lg={10} >
            
            <Box className={classes.root}>
            <Typography variant='h4' className={classes.typography} gutterBottom>Child-1 Component</Typography>
                <Box component={Paper} elevation={12} className={classes.paper}>
                    <Box className={classes.imgBox}>
                        <img className={classes.images} src={User1} alt='Epistic' />
                    </Box>
                    <Typography variant='h5' color='primary' className={classes.typography} gutterBottom>Mr. Kaushal Solanki</Typography>
                    <Typography variant='subtitle2' className={classes.typographyJustify} gutterBottom>{userInfo}</Typography>
                    <Typography variant='subtitle2' color='primary' className={classes.typography} gutterBottom>{emailId}</Typography>
                    <Divider className={classes.divider} />

                    {/* Sibling TextField and Button */}
                    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant='subtitle1' className='text-center'>{props.sb2}</Typography>
                    <TextField fullWidth  
                        name='email' placeholder='Fetch Email from Sibling' 
                        variant='outlined' size='small'
                        error={Boolean(errors.email)}
                        inputRef={register({
                            required: 'this field is required'
                        })}
                        helperText={errors.email?.message}
                        defaultValue = {props.sb2}
                        onBlur={(e) => setSibling1(e.target.value)}
                    />   
                    {/* <input defaultValue={props.sb2} />                  */}
                    
                    <Grid container justify='center' spacing={4} component={Box} py='1rem'>
                       <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Button variant="contained" color='primary' fullWidth onClick={() => SendData()} endIcon={<SendIcon />}>Parent</Button>
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Button variant="contained" color='primary' type='Submit' fullWidth endIcon={<SendIcon />}>Sibling</Button>
                        </Grid>
                    </Grid>

                    <Typography variant='h6' className='text-center'>{props.emailValue}</Typography>
                    <Typography variant='h6' className='text-center'>{props.toChild1}</Typography>
                    </Box>
                </Box>
            </Box>
            </Grid>
            </Grid>
        </Container>
    </>);
}

export default Child1;