// react material-ui components
import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid, Typography, TextField, Box, Paper, Table, TableHead, TableBody, TableRow, TableCell, 
    TableContainer, TablePagination, Checkbox, Button, Dialog,
    DialogTitle, DialogContent, Select, MenuItem, InputAdornment
} from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import { DataGrid } from '@material-ui/data-grid';
import { Pagination } from "@material-ui/lab";

// icons 
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import ClearIcon from '@material-ui/icons/Clear';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import SearchIcon from '@material-ui/icons/Search';

// components
import UpdateUser from '../user/UpdateUser';

const useStyles = makeStyles(theme => ({
    cells: {
        fontWeight: "bold",
    }
}))

const Dashboard = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    // const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [showDialogRegister, setShowDialogRegister] = useState(false)
    const [showDialog, setShowDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);

    // const [user, setUser] = useState();
    const [userID, setUserID] = useState("");
    const [id,setID] = useState(""); 

    // serverside pagination code
    const [page, setPage] = useState('');
    const [pageNo, setPageNo] = useState('')
    const [size, setSize] = useState('');

    // Fetch All data from the Server
    const loadUsers = async () => {
        // console.clear();
        const res = await axios.get('http://localhost:4004/registerFSP');
        setUsers(res.data.data)
        // console.log(res.data.data)

        setPage(res.data.totalPage);
        // console.log(`TotalPages: ${res.data.totalPage}`);
    }

    // FetchPage All Pages from the Server
    const FetchPage = async (page) => {
        const res = await axios.get(`http://localhost:4004/registerFSP/?page=${page}&rows=${size}`);
        setUsers(res.data.data);
        setPageNo(page);
    }

    // FetchPage All Rows from the Server
    const FetchRows = async (rows) => {
        const res = await axios.get(`http://localhost:4004/registerFSP/?page=${pageNo}&rows=${rows}`);
        setUsers(res.data.data);
        setPage(res.data.totalPage);
        setSize(rows)
    }

    // Fetch Data using Search API
    const FetchSearch = async (string) => {
        const userData = await axios.get(`http://localhost:4004/registerSearch/${string}`)
        setUsers(userData.data.result)
    }

    useEffect(() => {
        loadUsers();
    }, []);

    // Update User Data
    const updateUserData = async id => {
        setShowDialog(true)
        setUserID(id)
    }

    // Delete User Data
    const deleteUser = async () => {
        debugger
        console.log(`Id : ${id} is Deleted`);
        await axios.delete(`http://localhost:4004/register/${id}`);
        loadUsers();
        setDeleteDialog(false)
    }

    // open Delete Dialog Box
    const openDeleteDialoBox = () => {
        setDeleteDialog(true);
    }

    const rows = users;
    const columns = [
        {
            field:'id',
            headerName:'Id',
            width:75
        }
        ,{
            field : "fname",
            headerName: "First Name",
            width:125
        },
        {
            field : "lname",
            headerName:"Last Name",
            width:125
        },
        {
            field : "user",
            headerName : "User Name",
            width:125
        },
        {
            field : "email",
            headerName: "Email Addrress",
            width:200
        },
        {
            field : "phone",
            headerName : "Phone Number",
            width:125
        },
        {
            field : "gender",
            headerName:"Gender",
            width:125
        },
        {
            field : "dob",
            headerName:"BirthDate",
            width:125
        },
        {
            field: "states",
            headerName : "State",
            width:125
        },
        {
            field : "city",
            headerName:"City",
            width:125
        },
    ]

    const [currentRow, setCurrentRow] = useState(null);

    return (
        <>
            <Grid container justify="center"  component={Box} pb={10}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    {/* <Typography align="center" variant="h3" gutterBottom>Dashboard</Typography> */}
                    <Grid container>

                        {/* Add New User */}
                        <Grid item lg={2} md={2} sm={2} component={Box} pb={1}>        
                            <Button style={{ borderRadius:"50px"}}
                            variant="contained" color="primary" onClick={() => setShowDialogRegister(true)}> <AddIcon /> </Button>
                        </Grid>

                        {/* SearchBar */}
                         <Grid item lg={7} md={7} sm={7} component={Box} pb={1}>

                            <TextField
                                style={{backgroundColor:'white' ,width:'100%'}}
                                placeholder="Search Here ..."
                                InputProps={{endAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>),
                                }}
                                size='small'
                                variant='outlined'
                                onChange={(e) => { FetchSearch(e.target.value) }}
                            />
                            
                        </Grid>
                        
                        <Grid item lg={1} md={1
                        
                        } sm={1} />
                    
                        {/* Update and Delete Button */}
                        <Grid item lg={2} md={2} sm={2} component={Box} pb={1}>                            
                            <Button style={{  marginRight:'20px'}}
                                startIcon={<EditIcon />} variant="contained" color="primary" disabled={!currentRow} onClick={() => { updateUserData(users._id) }}>Edit</Button>
                            
                            <Button startIcon={<DeleteForeverIcon />} variant="contained" color="secondary" disabled={!currentRow} onClick={() => { openDeleteDialoBox() }}>Delete</Button>                            
                        </Grid>
                       
                    </Grid>
                   
                   {/* DataGrid */}                    
                    <Box component={Paper} style={{height:"578px",  width:"100%"}}>
                        <DataGrid 
                            onRowSelected={(item) => {setCurrentRow(item.data); setID(item.data._id)} }
                            rows={rows}
                            columns={columns}
                        />
                        <Grid container style={{backgroundColor:'white', padding: '10px 0px 10px 0px'}}>
                            <Grid item lg={6}>
                                <Box>
                                    <Pagination color="primary" count={page} onChange={page => { FetchPage(page.target.innerText)}} /> 
                                </Box>
                            </Grid>
                            <Grid item lg={4} />
                            <Grid item lg={2}>
                                <Box style={{display:'flex'}}>
                                    <Typography variant='subtitle1'>Rows per page :</Typography>
                                    <Select name={size} onChange={(e) => {FetchRows(e.target.value)}}>
                                    <MenuItem value='10'>10</MenuItem>
                                    <MenuItem value='20'>20</MenuItem>
                                    <MenuItem value='50'>50</MenuItem>
                                    <MenuItem value='100'>100</MenuItem>
                                </Select>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                </Grid>
            </Grid>


            {/* {/ add new User /} */}
            <Dialog open={showDialogRegister}>
                <DialogTitle >
                    <div style={{ display: "flex" }}>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>Add New User</Typography>
                        <Button onClick={() => { setShowDialogRegister(false) }}><ClearIcon /></Button>
                    </div>
                </DialogTitle>
                <UpdateUser />
            </Dialog>

            {/* {/ update user /} */}
            <Dialog open={showDialog}>
                <DialogTitle>Update Data User
                    <Button style={{ position: "absolute", right: "10px" }} onClick={() => { setShowDialog(false) }}>
                        <ClearIcon />
                    </Button>
                </DialogTitle>

                <DialogContent>
                    <UpdateUser id={id} />
                </DialogContent>
            </Dialog>

            {/* Delete Dialog-box */}
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

export default Dashboard;
