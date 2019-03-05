import React, { Component } from "react";
//heia material ui, må hente inn alt hver for seg, hehe, derfor så mye
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import {FaUserPlus} from "react-icons/fa";

const employeeTypes = [
  {
    value: "Fast ansatt",
    label: "1"
  },
  {
    value: "Flyttbar ansatt",
    label: "2"
  },
  {
    value: "Vikar",
    label: "3"
  }
];


class AddEmployee extends Component {

  constructor() {
  super();
  this.state = {
    open: false,
    employeeType: 'fast',
  };
  // This binding is necessary to make `this` work in the callback
  this.handleClick = this.handleClick.bind(this);
}

  handleChange = event => {
    this.setState({value: event.target.value});
  }

/*
toogle = () => {
  this.setState({
    window: !this.state.window
  });
}
*/

  handleClickOpen = () => {
    this.setState({open:true});
  }

  handleClickClose = () =>{
    this.setState({open:false});
  }

  handleClick = () => {
      console.log("Halla");
  }

/*
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  }
  <Button
  variant="contained"
  onClick={(e) => this.handleClick(e)}
  >
*/

  render() {
    return(
      <div>
      <Button
      variant="contained"
      onClick={this.handleClickOpen}
      >
        <FaUserPlus/>
      </Button>
      <Dialog
      open={this.state.open}
      onClose={this.handleClickClose}
      >
      <DialogTitle> Registrer ny ansatt </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="firstName"
          label="Fornavn"
        />
        <TextField
          margin="dense"
          id="lastName"
          label="Etternavn"
        />
        <FormControl>
          <FormLabel> Ansettelsesform </FormLabel>
            <RadioGroup
            aria-label="Gender"
            value={this.state.value}
            onChange={this.handleChange}
            >
            <FormControlLabel
            value="fast"
            control={<Radio />}
            label="Fast ansatt"
            />
            <FormControlLabel
            value="flyttbar"
            control={<Radio />}
            label="Flyttbar ansatt"
            />
            <FormControlLabel
            value="vikar"
            control={<Radio />}
            label="Vikar"
            />
            </RadioGroup>
          <FormLabel> Avdeling </FormLabel>
        </FormControl>
      </DialogContent>
      </Dialog>
      </div>
    )
  }
}

export default AddEmployee;
