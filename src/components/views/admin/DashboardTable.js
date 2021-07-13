//init code
import React, { useState, useEffect } from 'react';
//material-ui componets
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button, IconButton, Snackbar, Fab, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, InputAdornment, RadioGroup, Radio, FormControlLabel, FormLabel, FormControl, FormHelperText, Select, MenuItem, Typography, TableSortLabel } from '@material-ui/core';
//axios
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
//icons 
import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';
import ClearIcon from '@material-ui/icons/Clear';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import {  } from ".src/components/views/user/UpdateUser";
import UpdateUser from '../user/UpdateUser';
import { Pagination } from '@material-ui/lab';
//insert csss
const useStyle = makeStyles((theme) => ({
    tableheader: {
        width: "100%",
        height: "100vh",
        backgroundColor: theme.palette.grey[200]
    },
    add: {
        position: "fixed",
        zIndex: theme.zIndex.tooltip
    }
}))
//main code 
function User() {
    //history use    
    const history = useHistory();
    //style 
    const claases = useStyle();
    //tablepagination variables
    const [rowsPerPage, setRowsPerPage] = useState(0);
    //set userdata in this variable
    const [userData, setUserData] = useState([]);
    //Snackbar 
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [pageNo, setPageNo] = useState(1)
    const [size, setSize] = useState();

    //close snackbar
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return
        }
        setOpen(false)
    }

    //call api
    async function loadUsers() {
        const userData = await axios.get(`http://localhost:4004/register/ssp`)
        setUserData(userData.data.data);
        setPage(userData.data.total_pages)
        setSize(userData.data.size)
    }

    //display all data in page load
    useEffect(() => {
        loadUsers();
    }, [])
    
    const fetchpage = async (page) => {
        // const userData = await axios.get(`http://localhost:4004/fsp/?page=${page}&size=${size}`)
        const userData = await axios.get(`http://localhost:4004/fsp`)
        setUserData(userData.data.data);
        
        setPageNo(page)
    }

    const fechrow = async (row) => {
        // const userData = await axios.get(`http://localhost:4004/ssp/?page=${pageNo}&size=${row}`)
        const userData = await axios.get(`http://localhost:4004/fsp`)
        setUserData(userData.data.data)
        setPage(userData.data.total_pages)
        setSize(row)
    }

    //pageination || set next page display  
    const onChangePage = (event, nextPage) => {
        setPage(nextPage)
    }
    //pagination || set display in row data
    const onChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value)
    }

    //delete user function
    const deleteUserData = async () => {
        await axios.delete(`http://localhost:4004/register/${userID}`);

        loadUsers();
        window.location.reload(true);
        setOpen(true);
    }

    //edit user function
    const editUserData = _id => {
        setShowDialog(true)
        setUserID(_id)
    }
    
    const [STate, setSTate] = useState([]);
    const [city, setCity] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [showDialogRegister, setShowDialogRegister] = useState(false);
    const [showDialogDelete, setShowDialogDelete] = useState(false);
    const [userID, setUserID] = useState();
    //return jax  
    return (<>
        <Box p={4} pb={4} className={claases.tableheader}>
            <Grid container justify="flex-end" >
                <Grid component={Box} p={1} item lg={1}>
                    {/* {/ adduser Button /} */}
                    <Button color="primary" variant="contained" onClick={() => setShowDialogRegister(true)}>Add User</Button>
                </Grid>
            </Grid>

            {/* {/ add new User /} */}
            <Dialog open={showDialogRegister}>
                <DialogTitle >
                    <div style={{ display: "flex" }}>
                        <Typography variant="h6" color="secondary" style={{ flexGrow: 1 }}>Add User</Typography>
                        <Button color="secondary" onClick={() => { setShowDialogRegister(false) }}><ClearIcon /></Button>
                    </div>
                </DialogTitle>
                <UpdateUser />
            </Dialog>

            {/* {/ update user /} */}
            <Dialog open={showDialog}>
                <DialogTitle>
                    <div style={{ display: "flex" }}>
                        <Typography variant="h6" color="secondary" style={{ flexGrow: 1 }}>Update User</Typography>
                        <Button color="secondary" onClick={() => { setShowDialog(false) }}><ClearIcon /></Button>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <UpdateUser id={userID} />
                </DialogContent>
            </Dialog>

            {/* {/ delete user /} */}
            <Dialog open={showDialogDelete}>
                <DialogTitle>
                    <ErrorOutlineIcon fontSize="large" />
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h3">Are you sure?</Typography>
                    <Typography variant="subtitle1">User will be deleted!</Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={() => {
                        deleteUserData()
                    }} variant="contained">Yes, delete it!</Button>
                    <Button color="secondary" onClick={() => {
                        setShowDialogDelete(false)
                    }} variant="contained">No, cancel!</Button>
                </DialogActions>
            </Dialog>

            {/* {/ Table start in  /} */}
            <TableContainer component={Paper} elevation={12} >
                <Table>
                    {/* {/ Header section /} */}
                    <TableHead >
                        <TableRow style={{ backgroundColor: "#0000FF" }}>

                            <TableCell style={{ color: "white", fontWeight: "700", fontSize: "1rem" }}>Sr</TableCell>
                            <TableCell style={{ color: "white", fontWeight: "700", fontSize: "1rem" }}>
                                <TableSortLabel onClick={async () => {
                                    let number = 1
                                    let user = await axios.post(`http://localhost:4004/useracd/${number}`);
                                    setUserData(user.data)
                                }}>
                                    FirstName
                                </TableSortLabel>
                            </TableCell>
                            <TableCell style={{ color: "white", fontWeight: "700", fontSize: "1rem" }}>LastName</TableCell>
                            <TableCell style={{ color: "white", fontWeight: "700", fontSize: "1rem" }}>UserName</TableCell>
                            <TableCell style={{ color: "white", fontWeight: "700", fontSize: "1rem" }}>Email</TableCell>
                            <TableCell style={{ color: "white", fontWeight: "700", fontSize: "1rem" }}>Phone</TableCell>
                            <TableCell style={{ color: "white", fontWeight: "700", fontSize: "1rem" }}>Gender</TableCell>
                            <TableCell style={{ color: "white", fontWeight: "700", fontSize: "1rem" }}>Data of Birth</TableCell>
                            <TableCell style={{ color: "white", fontWeight: "700", fontSize: "1rem" }}>State</TableCell>
                            <TableCell style={{ color: "white", fontWeight: "700", fontSize: "1rem" }}>City</TableCell>
                            <TableCell style={{ color: "white", fontWeight: "700", fontSize: "1rem" }} align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>

                    {/* {/ Mapping user /} */}
                    <TableBody>
                        {
                            userData.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.fname}</TableCell>
                                    <TableCell>{item.lname}</TableCell>
                                    <TableCell>{item.user}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.phone}</TableCell>
                                    <TableCell>{item.gender}</TableCell>
                                    <TableCell>{item.dob.substr(0, 10)}</TableCell>
                                    <TableCell>{item.states}</TableCell>
                                    <TableCell>{item.city}</TableCell>
                                    <TableCell style={{ color: 'red !importan' }} align="center" >
                                        <Box
                                            style={{ color: "red" }}
                                            component={Button}
                                            onClick={() => {
                                                editUserData(item._id)
                                            }}
                                        >
                                            <CreateIcon />
                                        </Box>
                                        <Box
                                            style={{ color: "red" }}
                                            component={Button}
                                            onClick={() => {
                                                setUserID(item._id)
                                                setShowDialogDelete(true)
                                            }}
                                        >
                                            <DeleteForeverIcon />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            
                            ))}
                        <TableRow>
                            <TableCell colSpan={6} padding="100px">
                            <Pagination count={page} onChange={page => { fetchpage(page.target.innerText) }} color="primary" /></TableCell>
                            <TableCell colSpan={6}>
                                <Typography style={{ display: "inline-block" }}>Row</Typography>
                                <Select name="row" onChange={(e) => { fechrow(e.target.value) }}>
                                    <MenuItem value="5">5</MenuItem>
                                    <MenuItem value="10">10</MenuItem>
                                    <MenuItem value="25">25</MenuItem>
                                    <MenuItem value="50">50</MenuItem>
                                    <MenuItem value="75">75</MenuItem>
                                    <MenuItem value="100">100</MenuItem>
                                </Select>
                            </TableCell>
                        </TableRow>

                    </TableBody>

                </Table>

            </TableContainer>


            <Snackbar
                style={{ marginTop: "10px" }}
                anchorOrigin={{
                    vertical: "buttom",
                    horizontal: "center"
                }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message="User is deleted Successfully...."
                action={
                    <React.Fragment>
                        <Button onClick={handleClose}>Click me</Button>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </Box>
        {/* {/ Snack bar here /} */}

    </>)
}

export default User;