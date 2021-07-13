import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { makeStyles, Grid, Box, TextField, Container, Typography, Paper, Button, Divider } from "@material-ui/core";
import Epistic from "../../../assets/img/Parent+Child/epistic.png";
import Child1 from "./Child_1";
import Child2 from "./Child_2";
import { NewText } from "./SeparateComp";

const useStyles = makeStyles(theme => ({
    root:{border: '1px solid grey', padding:'25px'},
    paper: {padding: '25px', border: '1px solid black'},
    typography: {textAlign:'center'},
    images : {width: '50%', borderRadius:'50%', border:'1px solid lightgrey', padding:'5px', margin: '10px 0px 10px 0px' },
    imgBox : {textAlign:'center'},
    divider : {color:'red', margin: '10px 0px'},
}))

function Parent () {
    const classes = useStyles();
    const [email, setEmail] = useState();
    const [sendItem, setSendItem] = useState();
    const [sb1, setSb1] = useState();
    const [sb2, setSb2] = useState();

    const [sepData, setSepData] = useState();

    const { register, handleSubmit, errors, control, getValues } = useForm();

    let address = `646, 6th Floor, Iscon Emporio,
        Jodhpur Cross Road, Near Star Bazar,
        Satellite, Ahmedabad 380015, Gujarat, INDIA.`;
    let Email = 'info@epistic.net';

    const getData = (item) => {
        setEmail(item)
    }

    const sb1DataFunc = (item) => {
        // data retrive from sibling1
        setSb1(item) //set data of sibling1
    }

    const sb2dataFunc = (item) => {
        // data retrive from sibling2
        setSb2(item) //set data of sibling2
    }

    const submitData = (data) => {
        setSendItem(data.email);
    }

    // Fetch Data of Separate Component
    const handleFetch = () => {
        setSepData(NewText)
    }

    return(<>
        <Container component={Box} my='5rem'>
            <Grid container justify='center'>
     
                <Grid item lg={4} md={6} sm={6} xs={12}>
                    <Box className={classes.root}>
                    <Typography variant='h4' className={classes.typography} gutterBottom>Parent Component</Typography>
                    <Box component={Paper} elevation={12} className={classes.paper}>
                        <Typography variant='subtitle2' className={classes.typography}>{sepData}</Typography>
                            <Box className={classes.imgBox}>
                                <img className={classes.images} src={Epistic} alt='Epistic' />
                            </Box>

                            <Typography variant='h4' color='primary' className={classes.typography} gutterBottom>Epistic Technology</Typography>
                            <Typography variant='subtitle2' className={classes.typography}>Address : {address}</Typography>
                            <Typography variant='subtitle2' color='primary' className={classes.typography}>E-mail : {Email}</Typography>
                            <Divider className={classes.divider} />

                            <Box component='form' onSubmit={handleSubmit(submitData)}>                
                                <TextField fullWidth 
                                name='email' placeholder='Email'
                                variant='outlined' size='small'
                                error={Boolean(errors.email)}
                                inputRef={register({
                                    required: 'This field is required'
                                })}
                                helperText={errors.email?.message}
                                value={email}
                                />
                                <Box my='5px'>
                                    <Button variant='outlined' color='primary' type="Submit" fullWidth>Send</Button>
                                </Box> 

                                <Box my='5px'>
                                    <Button variant='outlined' color='primary' fullWidth onClick={() => handleFetch()}>Fetch from Sep Comp</Button>
                                </Box>                               
                            </Box>

                        </Box>
                    </Box>
                </Grid>

            </Grid>

            {/* Other Component */}
            <Grid container justify='center'>
                <Grid item lg={5} md={5} sm={5} xs={12}>
                    <Child1 emailValue={sendItem}
                    data={getData}
                    sibling1Data={sb1DataFunc} sb2={sb2} />    
                </Grid>

                <Grid item lg={5} md={5} sm={5} xs={12}>
                    <Child2 emailValue={sendItem}
                    data={getData} sibling2Data={sb2dataFunc} sb1={sb1} />    
                </Grid>
            </Grid>
        </Container>

    </>);
}

export default Parent;