import React, { Component } from "react";
import { connect } from "react-redux";
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
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { FaUserPlus } from "react-icons/fa";
import { insertNewEmployee } from "../../actions/newEmployeeAction";

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      nameError: "",
      first_name: "",
      last_name: "",
      base_id: "1",
      moveable: false,
      position: "1"
    };
    // This binding is necessary to make `this` work in the callback
    //  this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickClose = () => {
    this.setState({
      open: false,
      moveable: false
    });
  };

  handleChange = name => event => {
    event.preventDefault();
    if (name == "moveable") {
      this.setState({ moveable: !this.state.moveable });
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
  handleSubmit(event) {
    event.preventDefault();
    //const err = this.validate();
    this.props.insertNewEmployee(
      this.state.first_name,
      this.state.last_name,
      this.state.base_id,
      this.state.moveable,
      this.state.position
    );
    this.handleClickClose();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant="contained"
          onClick={this.handleClickOpen}
          size="large"
          style={styles.addButton}
        >
          <FaUserPlus />
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClickClose}>
          <DialogTitle> Registrer ny ansatt </DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                required
                margin="dense"
                id="firstName"
                onChange={this.handleChange("first_name")}
                label="Fornavn"
                variant="outlined"
                className={classes.textField}
              />
              <TextField
                required
                margin="dense"
                id="lastName"
                onChange={this.handleChange("last_name")}
                label="Etternavn"
                variant="outlined"
              />
              <FormControl className={classes.formControl}>
                <FormLabel> Ansettelsesform </FormLabel>
                <RadioGroup
                  value={this.state.value}
                  onChange={this.handleChange("position")}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="Fast ansatt"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio color="primary" />}
                    label="Vikar"
                  />
                </RadioGroup>
                <FormLabel> Skal ansatt være flyttbar? </FormLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={this.state.moveable}
                      onClick={this.handleChange("moveable")}
                    />
                  }
                  label="Ja"
                />
                <FormLabel> Avdeling </FormLabel>
                <RadioGroup
                  value={this.state.value}
                  onChange={this.handleChange("base_id")}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="Gåsedammen"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio color="primary" />}
                    label="Bekkdalen"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio color="primary" />}
                    label="Steinbruddet"
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio color="primary" />}
                    label="Gårdsbruket"
                  />
                </RadioGroup>
              </FormControl>
              <div className={classes.buttons}>
                <Button
                  type="submit"
                  value="Submit"
                  variant="contained"
                  className={classes.textField}
                >
                  Registrer
                </Button>
                <Button variant="contained" onClick={this.handleClickClose}>
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

const mapDispatchToProps = dispatch => {
  return {
    insertNewEmployee: (firstName, lastName, baseID, moveable, position) =>
      dispatch(
        insertNewEmployee(firstName, lastName, baseID, moveable, position)
      )
  };
};

const styledComponent = withStyles(styles)(AddEmployee);
export default connect(
  null,
  mapDispatchToProps
)(styledComponent);

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: 16,
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    marginRight: 10
  },
  buttons: {
    "text-align": "center"
  },
  addButton: {
    marginBottom: "10px"
  }
});
