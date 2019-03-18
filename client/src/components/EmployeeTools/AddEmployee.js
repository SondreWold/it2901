import React, { Component } from "react";
//heia material ui, må hente inn alt hver for seg, hehe, derfor så mye
//import RaisedButton from '@material-ui/core/RaisedButton';
import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  DialogActions,
  MuiThemeProvider,
  getMuiTheme,
  Checkbox,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {FaUserPlus} from "react-icons/fa";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: 16,
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    marginRight:10,
  },
  buttons: {
    'text-align': 'center',
  }

});

class AddEmployee extends Component {
  constructor(props) {
  super(props);
  this.state = {
    open: false,
    nameError: "",
    first_name: "",
    last_name: "",
    base_id: '1',
    moveable: false,
    position: '1',
  };
  // This binding is necessary to make `this` work in the callback
//  this.handleClick = this.handleClick.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

  handleClickOpen = () => {
    this.setState({open:true});
  }

  handleClickClose = () =>{
    this.setState({
      open:false,
      moveable: false,
    });
  }

  handleChange = name => event => {
    event.preventDefault();
    if (name=="moveable"){
      this.setState({moveable: !this.state.moveable});
    } else {
    this.setState({ [name]: event.target.value });
  }
 };

/*
validate =() => {
  //const letters = /^[a-zA-Z]+$/;
  let name = this.state.first_name;
  let isError = false;
  const errors = {};
  if(name.match(/[a-z]/i)){
    isError = true;
    errors.nameError = "Brukernavn kan bare inneholde bokstaver"
  }
  if (isError){
    this.setState({
      ...this.state,
      ...errors
    });
  }
  return isError;
}
*/

//Note til INGRID! moveable er blitt til true/false nå!
  handleSubmit (event) {
    event.preventDefault();
    //const err = this.validate();

      const newEmployee = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        base_id: this.state.base_id,
        moveable: this.state.moveable,
        position: this.state.position
      }
      console.log(newEmployee);
      this.handleClickClose();

  }

  render() {
    const { classes } = this.props;
    return(
      <div>
        <Button variant="contained" onClick={this.handleClickOpen} size="large">
          <FaUserPlus/>
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClickClose}>
          <DialogTitle> Registrer ny ansatt </DialogTitle>
          <DialogContent>
          <form onSubmit={this.handleSubmit}>
                <TextField required margin="dense" id="firstName" onChange={this.handleChange('first_name')} label="Fornavn" variant="outlined" className={classes.textField} errorText={this.state.nameError}/>
                <TextField required margin="dense" id="lastName" onChange={this.handleChange('last_name')} label="Etternavn" variant="outlined" errorText={this.state.nameError}/>
              <FormControl className={classes.formControl}>
                <FormLabel > Ansettelsesform </FormLabel>
                  <RadioGroup value={this.state.value} onChange={this.handleChange('position')}>
                    <FormControlLabel value='2' control={<Radio color="primary" />} label="Fast ansatt"/>
                    <FormControlLabel value='1' control={<Radio color="primary"/>} label="Vikar"/>
                  </RadioGroup>
                  <FormLabel > Skal ansatt være flyttbar? </FormLabel>
                  <FormControlLabel
                    control={
                       <Checkbox
                        color="primary"
                        checked={this.state.moveable}
                        onClick={this.handleChange('moveable')}
                      />
                    }
                      label="Ja"
                  />
                <FormLabel> Avdeling </FormLabel>
                  <RadioGroup value={this.state.value} onChange={this.handleChange('base_id')}>
                    <FormControlLabel value='1' control={<Radio color="primary"/>} label="Gåsedammen"/>
                    <FormControlLabel value='2' control={<Radio color="primary"/>} label="Bekkdalen" />
                    <FormControlLabel value='3' control={<Radio color="primary"/>} label="Steinbruddet" />
                    <FormControlLabel value='4' control={<Radio color="primary"/>} label="Gårdsbruket" />
                  </RadioGroup>
              </FormControl>
              <div className={classes.buttons}>
                <Button type="submit" value="Submit" variant="contained" className={classes.textField}>
                Registrer
                </Button>
                <Button variant="contained" onClick={this.onClose}>
                Avbryt
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

/*const mapDispatchToProps = dispatch => ({
  return{
    insertNewEmployee:()
  }
});
*/

export default withStyles(styles) (AddEmployee);
