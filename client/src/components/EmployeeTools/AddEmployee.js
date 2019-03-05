import React, { Component } from "react";
//heia material ui, må hente inn alt hver for seg, hehe, derfor så mye
import Button from '@material-ui/core/Button';
//import RaisedButton from '@material-ui/core/RaisedButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import DialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import {FaUserPlus} from "react-icons/fa";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class AddEmployee extends Component {

  constructor(props) {
  super(props);
  this.state = {
    open: false,
    employeeType: 'fast',
    base: 1,
  };
  // This binding is necessary to make `this` work in the callback
//  this.handleClick = this.handleClick.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

  //handle Radio Buttons changes for choose of base
  handleChangeBase= event => {
    this.setState({base: event.target.value})
  }

  //handle Radio Buttons changes for choose of type of employee
  handleChangeType = event => {
    this.setState({employeeType: event.target.value});
  }

  handleClickOpen = () => {
    this.setState({open:true});
  }

  handleClickClose = () =>{
    this.setState({open:false});
  }

  handleSubmit (event) {
    console.log(this.state.employeeType);
    console.log(this.state.base);
    this.handleClickClose();
    event.preventDefault();

  }

  render() {
    //presenting alternatives of actions in the popup
    const actions = [
      <Button
      label = "Abryt"
      onClick= {this.handleClickClose}
      />,
      <Button
      type="submit"
      label = "Registrer"
      />
    ];

    return(
      <div>
        <Button
        variant="contained"
        onClick={this.handleClickOpen}>
          <FaUserPlus/>
        </Button>
        <Dialog
        open={this.state.open}
        actions={[
          <Button type="submit" form="my-form-id" label="Submit" >
          Registrer
          </Button>
        ]}
        onClose={this.handleClickClose}
        >
          <DialogTitle> Registrer ny ansatt </DialogTitle>
          <DialogContent>
          <form onSubmit={this.handleSubmit}>
              <FormControl>
                <TextField margin="dense" id="firstName" label="Fornavn"/>
                <TextField margin="dense" id="lastName" label="Etternavn"/>
              </FormControl>
              <FormControl>
                <FormLabel> Ansettelsesform </FormLabel>
                  <RadioGroup value={this.state.value} onChange={this.handleChangeType}>
                    <FormControlLabel value="fast" control={<Radio />} label="Fast ansatt"/>
                    <FormControlLabel value="flyttbar" control={<Radio />} label="Flyttbar ansatt"/>
                    <FormControlLabel value="vikar" control={<Radio />} label="Vikar"/>
                  </RadioGroup>
                <FormLabel> Avdeling </FormLabel>
                  <RadioGroup value={this.state.value} onChange={this.handleChangeBase}>
                    <FormControlLabel value='1' control={<Radio />} label="Grønn"/>
                    <FormControlLabel value='2' control={<Radio />} label="Blå" />
                    <FormControlLabel value='3' control={<Radio />} label="Bla" />
                  </RadioGroup>
              </FormControl>
              <Button type="submit" value="Submit" variant="contained">
              Registrer
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles) (AddEmployee);
