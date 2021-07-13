import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { makeStyles, Grid, Box, TextField, Container, Typography, Paper, Button } from "@material-ui/core";
import User3 from "../../../assets/img/Parent+Child/user3.jpg";

const useStyles = makeStyles(theme => ({
    root:{border: '1px solid grey', padding:'25px'},
    paper: {padding: '25px', border: '1px solid black'},
    typography: {textAlign:'center'},
    typographyJustify : { textAlign:'justify'},
    images : {width: '50%', borderRadius:'55%', border:'1px solid lightgrey', padding:'5px', margin: '10px 0px 10px 0px' },
    imgBox : {textAlign:'center'}
}))

function SeparateComponent () {
    const classes = useStyles();

    const [email, setEmail] = useState();
    const [sendItem, setSendItem] = useState();

    const { register, handleSubmit, errors, control, getValues } = useForm();

    let bio = `My name is Hitesh and I am a Junior Web Developer for Epistic Technologies.
    I am an accomplished coder and programmer, and I enjoy using my skills to contribute to the exciting technological
    advances that happen every day at Epistic Technology.`

    let phone = '+91 8866868512';

    const submitData = (data) => {
        console.log(data.email);
        setSendItem(data.email);
    }

    return(<>
        <Container component={Box}>
            <Grid container justify='center'>
     
                <Grid item lg={4} md={6} sm={6} xs={12}>
                    <Box className={classes.root} my="5rem">
                    <Typography variant='h4' className={classes.typography} gutterBottom>Separate Component</Typography>
                        <Box component={Paper} elevation={12} className={classes.paper}>
                            <Box className={classes.imgBox}>
                                <img className={classes.images} src={User3} alt='User3' />
                            </Box>

                            <Typography variant='h4' color='primary' className={classes.typography} gutterBottom>Hitesh Gohel</Typography>
                            <Typography variant='subtitle2' className={classes.typographyJustify}>{bio}</Typography>
                            <Typography variant='subtitle2' color='primary' className={classes.typography}>Conatct : {phone}</Typography>
                            <Typography variant='subtitle2'  className={classes.typography}>Message : `I'm Separate Component`;</Typography>

                            {/* <Box component='form' onSubmit={handleSubmit(submitData)}>
                                <TextField fullWidth 
                                name='email' placeholder='Email'
                                variant='outlined' size='small'
                                error={Boolean(errors.email)}
                                inputRef={register({
                                    required: 'This Field is required'
                                })}
                                helperText={errors.email?.message}
                                value={email}
                                />

                                <Box my='5px'>
                                    <Button variant='outlined' color='primary' type="Submit" fullWidth>Send</Button>
                                </Box>                                
                            </Box> */}

                        </Box>
                    </Box>
                </Grid>

            </Grid>
        </Container>

    </>);
}

const NewText = `I'm Message from Separate Component`;

export default SeparateComponent;
export { NewText };