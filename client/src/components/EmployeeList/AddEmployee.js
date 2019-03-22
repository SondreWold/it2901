import React, { Component } from "react";
import { connect } from "react-redux";
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
  Checkbox,
  withStyles
} from "@material-ui/core";
import { FaUserPlus } from "react-icons/fa";
import { insertNewEmployee } from "../../actions/newEmployeeAction";
import moment from "moment";
import Colors from "../../constants/Colors";

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      nameError: "",
      first_name: "",
      last_name: "",
      base_id: "1",
      moveable: true,
      position: "2"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickClose = () => {
    this.setState({
      open: false,
      moveable: true
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

  handleSubmit(event) {
    event.preventDefault();
    this.props.insertNewEmployee(
      this.state.first_name,
      this.state.last_name,
      this.state.base_id,
      this.state.moveable,
      this.state.position,
      moment(this.props.date).format("YYYY-MM-DD")
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
          <FaUserPlus color={Colors.EmployeeColors.moveableEmployee} />
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClickClose}>
          <DialogTitle>
            {" "}
            Registrer ny {this.props.tempOnly ? "vikar" : "ansatt"}{" "}
          </DialogTitle>
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
              {!this.props.tempOnly && (
                <div>
                  <FormControl className={classes.formControl}>
                    <FormLabel> Ansettelsesform </FormLabel>
                    <RadioGroup
                      value={this.state.position}
                      onChange={this.handleChange("position")}
                    >
                      <FormControlLabel
                        value="2"
                        control={<Radio color="primary" />}
                        label="Vikar"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio color="primary" />}
                        label="Fast ansatt"
                      />
                    </RadioGroup>
                    <FormLabel disabled={this.state.position === "2"}>
                      {" "}
                      Skal ansatt være flyttbar?{" "}
                    </FormLabel>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={this.state.moveable}
                          onClick={this.handleChange("moveable")}
                          disabled={this.state.position === "2"}
                        />
                      }
                      label="Ja"
                    />
                    <FormLabel disabled={this.state.position === "2"}>
                      {" "}
                      Avdeling{" "}
                    </FormLabel>
                    <RadioGroup
                      value={this.state.position === "1" && this.state.base_id}
                      onChange={this.handleChange("base_id")}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio color="primary" />}
                        label="Gåsedammen"
                        disabled={this.state.position === "2"}
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio color="primary" />}
                        label="Bekkdalen"
                        disabled={this.state.position === "2"}
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio color="primary" />}
                        label="Steinbruddet"
                        disabled={this.state.position === "2"}
                      />
                      <FormControlLabel
                        value="4"
                        control={<Radio color="primary" />}
                        label="Gårdsbruket"
                        disabled={this.state.position === "2"}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              )}
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

const mapStateToProps = state => ({
  date: state.date.selectedDate
});

const mapDispatchToProps = dispatch => {
  return {
    insertNewEmployee: (
      firstName,
      lastName,
      baseID,
      moveable,
      position,
      date
    ) =>
      dispatch(
        insertNewEmployee(firstName, lastName, baseID, moveable, position, date)
      )
  };
};

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

const styledComponent = withStyles(styles)(AddEmployee);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(styledComponent);
