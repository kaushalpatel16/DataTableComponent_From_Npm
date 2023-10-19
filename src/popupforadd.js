import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Add, AirplanemodeActive, AirplanemodeInactive, Female, Male } from '@mui/icons-material';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import useAddDataToAPI from './addapi';
import { useState } from 'react';


const currencies = [
    {
      value: 'male',
      label:(<div>
          <Male/> Male
      </div>),
    },
    {
        value: 'female',
        label: (<div>
            <Female/> FeMale
        </div>),
    },
    {
        value: 'other',
        label: (<div>
              Other
        </div>),
    },
    
  ];
  const Status = [
    {
      value: 'active',
      label:(<div>
          <AirplanemodeActive/> Active
      </div>),
    },
    {
        value: 'inactive',
        label: (<div>
            <AirplanemodeInactive/> Inactive
        </div>),
    },
   
    
  ];
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {

  const {  error, isLoading, addData } = useAddDataToAPI();

 
  const [open, setOpen] = React.useState(false);
  
  const [name, setname] = useState()
  const [email, setemail] = useState()
  const [gender, setgender] = useState()
  const [status, setstatus] = useState()


  const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
  };

  const nameHandler=(event)=>{
      setname(event.target.value)
  }
  const emailHandler=(event)=>{
      setemail(event.target.value)
  }
 
  const handleClose = (event) => {
      event.preventDefault(); 

      if (!validateEmail(email)) {
        alert('Invalid email format');
        return;
      }
      const expenseData = {  
        name: name,
        email: email,
        gender: gender,
        status:status,
      };

      addData(expenseData);
      console.log(expenseData)
      setname("")
      setemail("")
      setgender("")
      setstatus("")

      
     
      if (isLoading) {
        return <div>Loading...</div>;
      }
      if (error) {
        return <div>Error fetching data: {error.message}</div>;
      }
      else{
        setOpen(false);
      }

  }

 
  const handleClickOpen = () => {
    setOpen(true);
  };


  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} endIcon={<Add/>}>
        Add
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Data
        </DialogTitle>
        <IconButton
          
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <TextField sx={{m:"3px"}} fullWidth label="Name" id="fullWidth" color="success" onChange={nameHandler}
          />
          <TextField sx={{m:"3px"}} fullWidth type="email" label="Email" id="fullWidth" color="success" onChange={emailHandler}/>
          <TextField
          sx={{m:"3px"}} fullWidth color="success"
          id="outlined-select-currency"
          select
          label="Gender"
          onChange={(event)=>{
                    setgender(event.target.value);
                   }}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>    

        <TextField
          sx={{m:"3px"}} fullWidth color="success"
          id="outlined-select-currency"
          select
          label="Status"
          onChange={(event)=>{
                     setstatus(event.target.value);
                   }}
        >
          {Status.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>  
        </DialogContent>
        <DialogActions>
          <Button autoFocus type="submit" onClick={handleClose}>
            Submit Data
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
