// init code
import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

// material-ui components
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  InputAdornment
} from '@material-ui/core'

// icons import
import PersonIcon from '@material-ui/icons/Person'
import LockIcon from '@material-ui/icons/Lock'

// image import
import Img from '../../../assets/img/theme/signin2.jpg'

// code of login from
function Login () {
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm()
  const [user, setuser] = useState('')
  const [password, setPassword] = useState('')

  const [MainError, setMainError] = useState('')

  const onSubmit = data => {
    console.log(data)

    axios
      .post('http://localhost:4004/login', { user, password })
      .then(response => {
        localStorage.setItem('UserName', user)
        console.log('Data inserted', response)
        history.push('/dashboard')
      })
      .catch(error => {
        console.log(error)
        setMainError('INVALID CREDENTIAL')
      })
  }

  return (
    <>
      <Container>
        <Grid container justify='space-evenly' alignItems='center'>
          <Grid item lg={9} sm={10}>
            <Paper
              style={{ borderRadius: '2rem' }}
              elevation={12}
              component={Box}
              mb='50px'
              mt='4rem'
              p={4}
            >
              <Grid container spacing={2} justify='space-evenly'>
                <Grid item lg={6} sm={10}>
                  <Box
                    textAlign='center'
                    pt={6}
                    pd={6}
                    maxWidth='100%'
                    maxHeight='100%'
                  >
                    <img
                      src={Img}
                      width='80%'
                      height='80%'
                      alt='signin_image'
                    />
                    <Typography component={Box} pt={0}>
                      <a
                        style={{
                          color: 'grey',
                          textDecoration: 'none',
                          fontSize: '13px'
                        }}
                        href='/Register'
                      >
                        Create an account
                      </a>
                    </Typography>
                  </Box>
                </Grid>

                <Grid item lg={6} sm={10}>
                  <Box
                    component='form'
                    pr={6}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Box pt={6} pb={6}>
                      <Typography
                        align='left'
                        style={{ fontWeight: 750, fontSize: '2.5rem' }}
                      >
                        Sign in
                      </Typography>
                      <Typography
                        style={{
                          color: 'red',
                          fontSize: '20px',
                          fontWeight: 'bold'
                        }}
                      >
                        {MainError}
                      </Typography>
                    </Box>

                    {/* {/ username filed /} */}
                    <TextField
                      fullWidth='true'
                      margin='normal'
                      variant='standard'
                      error={Boolean(errors.user)}
                      placeholder='Username'
                      inputRef={register({
                        required: 'Enter Username'
                      })}
                      name='user'
                      helperText={errors.user?.message}
                      onChange={event => {
                        setuser(event.target.value)
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <PersonIcon />
                          </InputAdornment>
                        )
                      }}
                    />

                    {/* {/ Password filed /} */}
                    <TextField
                      autoComplete='true'
                      type='password'
                      margin='normal'
                      variant='standard'
                      fullWidth='true'
                      placeholder='Password'
                      inputRef={register({
                        required: 'Enter a password'
                      })}
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message}
                      name='password'
                      onChange={event => {
                        setPassword(event.target.value)
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <LockIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                    <Box pt={6}>
                      <Button
                        margin=''
                        color='primary'
                        size='large'
                        variant='contained'
                        type='Submit'
                      >
                        Submit
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Login
