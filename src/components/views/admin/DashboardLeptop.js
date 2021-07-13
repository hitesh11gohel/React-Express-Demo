import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid, Typography, Box, Paper, Table, TableHead, TableBody, TableRow, TableCell,
    TableContainer, TablePagination, Checkbox, Button, Dialog, DialogTitle, DialogContent,
    Select, MenuItem
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import ClearIcon from '@material-ui/icons/Clear';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import SearchBar from "material-ui-search-bar";
import UpdateUser from '../user/UpdateUser';

const useStyles = makeStyles(theme => ({
    cells: {
        fontWeight: "bold",
    }
}))

const DashboardLeptop = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    // const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [showDialogRegister, setShowDialogRegister] = useState(false)
    const [showDialog, setShowDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const [userID, setUserID] = useState();

    // Retrieve API data
    const [page , setPage] = useState('');
    const [pageNo, setPageNo] = useState('');
    const [size, setSize] = useState('');


    const loadUsers = async () => {
        const res = await axios.get('http://localhost:4004/registerFSP');
        setUsers(res.data.data);
        setPage(res.data.totalPage);
        // console.log(`TotalPages : ${res.data.totalPage}`);
        setSize(res.data.rows);
        // console.log(`Total Rows of this page is : ${res.data.rows}`);

    }

    const FetchPage = async (page) => {
         const res = await axios.get(`http://localhost:4004/registerFSP/?page=${page}&rows=${size}`)
         setUsers(res.data.data);
        setPageNo(page);
    }

    const FetchRows = async (rows) => {
        const res = await axios.get(`http://localhost:4004/registerFSP/?page=${pageNo}&rows=${rows}`)
        setUsers(res.data.data);
        setPage(res.data.totalPage);
        setSize(rows)
    }

    useEffect(() => {
        loadUsers();
    }, []);

    const onChangePage = (event, nextPage) => {
        setPage(nextPage);
    };

    const onChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value)
    };

    const updateUserData = async _id => {
        setShowDialog(true)
        setUserID(_id)
    }

    const deleteUser = async () => {
        console.log(`Id : ${userID} is Deleted`);
        await axios.delete(`http://localhost:4004/register/${userID}`);
        loadUsers();
        window.location.reload(true);
        console.clear();
    }

    const openDeleteDialoBox = () => {
        setDeleteDialog(true);
    }

    return (
        <>
            <Grid container justify="center" style={{ marginTop: "30px" }}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box >
                        <Typography align="center" variant="h4" gutterBottom>Dashboard</Typography>
                        <Box align='right'>
                            {/* <SearchBar
                                onChange={() => console.log('onChange')}
                                onRequestSearch={() => console.log('onRequestSearch')}
                                style={{maxWidth: '350px', marginBottom:'15px'}}
                            /> */}
                        </Box>
                    </Box>
                   
                    <Box height="500px">
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow >
                                    <TableCell className={classes.cells}>#</TableCell>
                                    <TableCell className={classes.cells}>FirstName</TableCell>
                                    <TableCell className={classes.cells}>LastName</TableCell>
                                    <TableCell className={classes.cells}>UserName</TableCell>
                                    <TableCell className={classes.cells}>Email</TableCell>
                                    <TableCell className={classes.cells}>Phone</TableCell>
                                    <TableCell className={classes.cells}>Birthdate</TableCell>
                                    <TableCell className={classes.cells}>Gender</TableCell>
                                    <TableCell className={classes.cells}>State</TableCell>
                                    <TableCell className={classes.cells}>City</TableCell>
                                    <TableCell className={classes.cells} align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {users.map((item) => (
                                    <TableRow>
                                        <TableCell> {item.id} </TableCell>
                                        <TableCell>{item.fname}</TableCell>
                                        <TableCell>{item.lname}</TableCell>
                                        <TableCell>{item.user}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.phone}</TableCell>
                                        <TableCell>{item.dob.substr(0, 10)}</TableCell>
                                        <TableCell>{item.gender}</TableCell>
                                        <TableCell>{item.states}</TableCell>
                                        <TableCell>{item.city}</TableCell>
                                        <TableCell>
                                            <Button style={{ color: "blue" }} onClick={() => { updateUserData(item._id) }}><EditIcon /></Button>
                                            <Button style={{ color: "red" }} onClick={() => { openDeleteDialoBox(); setUserID(item._id) }}><DeleteForeverIcon /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>                            
                                                    
                        {/* Bottom Pagination  */}                        
                        <TableCell colSpan={6} padding='100px'>
                            <Pagination color="primary" 
                            count={page} 
                            onChange={page => { FetchPage(page.target.innerText)
                            console.log(page)}}
                            />
                        </TableCell>

                        {/* Select rows */}
                        <TableCell colSpan={6} padding='100px'>
                            <Typography style={{display:'inline-block'}} variant="subtitle1">Rows per page</Typography>
                            <Select name={size} onChange={(e) => {FetchRows(e.target.value)}}>
                                    <MenuItem value='10'>10</MenuItem>
                                    <MenuItem value='20'>20</MenuItem>
                                    <MenuItem value='50'>50</MenuItem>
                                    <MenuItem value='100'>100</MenuItem>
                            </Select>
                        </TableCell>                       
                        </Table>

                    </TableContainer>
                    </Box>

                    <Button style={{ position: "fixed", bottom: "50px", right: "25px" }}
                        startIcon={<AddIcon />} variant="contained" color="primary" onClick={() => setShowDialogRegister(true)}>Add User</Button>
                </Grid>
            </Grid>


            {/* {/ {/ add new User /} /} */}
            <Dialog open={showDialogRegister}>
                <DialogTitle >
                    <div style={{ display: "flex" }}>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>Add New User</Typography>
                        <Button onClick={() => { setShowDialogRegister(false) }}><ClearIcon /></Button>
                    </div>
                </DialogTitle>
                <UpdateUser />
            </Dialog>

            {/* {/ {/ update user /} /} */}
            <Dialog open={showDialog}>
                <DialogTitle>Update Data User
                    <Button style={{ position: "absolute", right: "10px" }} onClick={() => { setShowDialog(false) }}>
                        <ClearIcon />
                    </Button>
                </DialogTitle>

                <DialogContent>
                    <UpdateUser id={userID} />
                </DialogContent>
            </Dialog>

            {/* {/ Delete Dialog-box /} */}
            <Dialog open={deleteDialog}>
                <DialogContent>
                    <Grid container spacing={2} align="center" justify="space-evenly" style={{ width: "300px" }}>
                        <Grid item lg={12} >
                            <HighlightOffRoundedIcon fontSize="large" color="secondary" />
                        </Grid>
                        <Typography variant="h5" >Are you Sure ?</Typography>
                        <Typography variant="subtitle2" style={{ marginBottom: "25px" }}>You will not be able to recover this record!</Typography>
                        <Grid item lg={6} >
                            <Button color="default" variant="outlined" onClick={() => { setDeleteDialog(false) }}>Cancel</Button>
                        </Grid>
                        <Grid item lg={6}>
                            <Button color="secondary" variant="contained" onClick={() => deleteUser()}>Delete</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

        </>)
}

export default DashboardLeptop;
