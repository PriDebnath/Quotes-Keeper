import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

export default function AddEditQuote(props:any) {
  const {inputValue,handleInputs,handleSubmit ,editableTodo,handleEdit, openAddEditQuote, setOpenAddEditQuote,handleClickOpenAddEditQuote} = props

 
// console.log(openAddEditQuote)
  const handleClose = () => {
    setOpenAddEditQuote(!openAddEditQuote);
  };



  return (
    <Slide direction='up' in={openAddEditQuote} appear={openAddEditQuote} >
     

     
      {/* <Dialog open={openAddEditQuote} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog> */}

<div className='formContainer'>

    
<form className={`inputContainer ${openAddEditQuote ? "" : "hideForm"}`}  >
        <input
          type="text"
          maxLength={10}
          placeholder="Author"
          name="quote_author"
          value={inputValue.quote_author}
          onChange={handleInputs}
          required
        />

        <textarea
        
          maxLength={200}
          placeholder="Type a Quote"
          name="quote_text"
          value={inputValue.quote_text}
          onChange={handleInputs}
          required
        ></textarea>

        <button type='submit' onClick={editableTodo ? handleEdit : handleSubmit}
        className={`${editableTodo ? "editButton" : "addButton"}`}
        >
          
          {" "}
          {editableTodo ? "Edit Quote" : "Add Quote"}
        </button>
      </form>
  
</div>

    </Slide>
  );
}