import React from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AppBar } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }} >
    <AppBar position="static" style={{marginTop:'0%',backgroundColor:'black'}}>
      <Toolbar>
   
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="left">
     Employe Dashboard
        </Typography>
       <Link to={'/'}  style={{color:'white'}} > <Button color="inherit">Add Feedback</Button> </Link>
       <Link to={'/dash'}  style={{color:'white'}}> <Button color="inherit">Dashboard</Button> </Link>
     
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Navbar