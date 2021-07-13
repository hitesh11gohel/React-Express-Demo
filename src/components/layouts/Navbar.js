import React, { useState } from 'react'
import { Typography, Button, AppBar, Toolbar, Menu, MenuItem } from "@material-ui/core";
import { makeStyles, IconButton } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from "react-router-dom";

// MobileMenu style
const useStyles = makeStyles(theme => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: { display: "flex" }
  }
}))

const Navbar = () => {

  const classes = useStyles();

  // MobileMenu hook
  const [mobileMenuAnchorEle, setMobileMenuAnchorEle] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMenuAnchorEle);

  // Open MobileMenu 
  const openMobileMenu = (event) => {
    setMobileMenuAnchorEle(event.currentTarget);
  }

  // Close MobileMenu
  const closeMobileMenu = () => {
    setMobileMenuAnchorEle(null)
  }

  // MobileMenu
  const mobileMenu = (
    <Menu anchorEl={mobileMenuAnchorEle} id="mobile-menu" keepMounted open={isMobileMenuOpen}>
      <MenuItem component={Link} onClick={closeMobileMenu} to="/">Home</MenuItem>
      <MenuItem component={Link} onClick={closeMobileMenu} to="/login">Login</MenuItem>
      <MenuItem component={Link} onClick={closeMobileMenu} to="/register">Register</MenuItem>
      <MenuItem component={Link} onClick={closeMobileMenu} to="/contact">Contact</MenuItem>
      <MenuItem component={Link} onClick={closeMobileMenu} to="/service">Service</MenuItem>
    </Menu>
  )
  return (<>
    <AppBar>
      <Toolbar>
        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }} component={Link} to="/">Epistic Technologies</Typography>
        <div className={classes.sectionDesktop}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/register">Register</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>
          <Button color="inherit" component={Link} to="/service">Service</Button>
        </div>
        <IconButton color="inherit" onClick={openMobileMenu}><MoreVertIcon /></IconButton>

      </Toolbar>
    </AppBar>
    {mobileMenu}
  </>
  )
}

export default Navbar;