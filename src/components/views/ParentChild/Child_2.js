import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { makeStyles, Grid, Box, TextField, Container, Typography, Paper, Button, FormControlLabel, Divider } from "@material-ui/core";
// import Child1 from "./Child_1";
import User2 from "../../../assets/img/Parent+Child/user2.png";

import GetAppIcon from '@material-ui/icons/GetApp';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
    root:{border: '1px solid grey', padding:'25px'},
    paper: {padding: '25px', border: '1px solid black'},
    typography: {textAlign:'center'},
    typographyJustify: {textAlign:'justify'},
    images : {width: '47%', borderRadius:'50%', border:'1px solid lightgrey', padding:'5px', margin: '10px 0px 10px 0px' },
    imgBox : {textAlign:'center'},
    divider : {color:'red', margin: '10px 0px'},
}))

function Child2 (props) {
    const classes = useStyles();

    const [sibling2, setSibling2] = useState();
    const {register, errors, handleSubmit} = useForm();

    let userInfo = `12+ years of IT experience in Web Development and Mobile Application Development and services & solutions globally.
                We feel empowered with our certified tech experts and our R&D team who have always challenged themselves -
                to help global clients with a plethora of IT services and solutions.`;
    let emailId = 'kenil.patel@gmail.com';

    // send data to Parent component
    const SendData = () => {
        // props.data(emailId)
        props.data(sibling2)
    }

    const onSubmit = (data) => {
        props.sibling2Data(data.email)
    }

    return(<>
        <Container component={Box} mt='5rem'>
            <Grid container justify='center'>
            <Grid item lg={10}>
            <Box className={classes.root}>
            <Typography variant='h4' className={classes.typography} gutterBottom>Child-2 Component</Typography>
                <Box component={Paper} elevation={12} className={classes.paper}>
                    <Box className={classes.imgBox}>
                        <img className={classes.images} src={User2} alt='Epistic' />
                    </Box>
                    <Typography variant='h5' color='primary' className={classes.typography} gutterBottom>Mr. Kenil Patel</Typography>
                    <Typography variant='subtitle2' className={classes.typographyJustify} gutterBottom>{userInfo}</Typography>
                    <Typography variant='subtitle2' color='primary' className={classes.typography} gutterBottom>{emailId}</Typography>
                    <Divider className={classes.divider} />
                    
                    {/* Sibling TextField and Button */}
                    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
                        <Typography variant='subtitle1' className='text-center'>{props.sb1}</Typography>
                        <TextField fullWidth  
                            name='email' placeholder='Fetch Email from Sibling' 
                            variant='outlined' size='small'
                            error={Boolean(errors.email)}
                            inputRef={register({
                                required: 'this field is required'
                            })}
                            helperText={errors.email?.message}
                            onBlur={(e) => setSibling2(e.target.value)}
                        />

                        <Grid container justify='center' spacing={4} component={Box} py='1rem'>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <Button variant="contained" color='primary' fullWidth onClick={() => SendData()} endIcon={<SendIcon />}>Parent</Button>
                            </Grid>

                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <Button variant="contained" color='primary' fullWidth type='Submit' endIcon={<SendIcon />}>Sibling</Button>
                            </Grid>
                        </Grid>
                        <Typography variant='h6' className='text-center'>{props.emailValue}</Typography>
                        <Typography variant='h6' className='text-center'>{props.toChild2}</Typography>
                    </Box>
                </Box>
            </Box>
            </Grid>
            </Grid>
        </Container>

    </>);
}

export default Child2;