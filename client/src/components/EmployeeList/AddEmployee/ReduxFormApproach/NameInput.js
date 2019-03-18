import React, {Component} from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  DialogActions,
  MuiThemeProvider,
  getMuiTheme,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {FaUserPlus} from "react-icons/fa";

class NameInput extends Component {
  render() {
    const {
      input: { value, onChange}
    } = this.props
    return(
      <div>
      <span> The current values is {value} </span>
        <FormControl>
          <TextField margin="dense"
           id="firstName"
           label="NameInput"
           onChange={(e) =>onChange(value +1)}/>
        </FormControl>
      </div>
    )
  }
}

export default NameInput;
