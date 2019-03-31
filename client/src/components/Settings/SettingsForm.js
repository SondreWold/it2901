import React, { Component } from "react";
import Alert from "react-s-alert";
import {
  Button,
  TextField,
  FormControl
} from "@material-ui/core";
import Colors from "../../constants/Colors"
import "./Settings.css";

class SettingsForm extends Component {
	constructor(props) {
    super(props);
		this.state = this.initialState;
		this.originalState = Object.assign(this.state)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  get initialState() {
    return {
    	id: this.props.id,
  		name: this.props.name,
  		total_children: this.props.total_children,
  		ratio: this.props.ratio,
  		isChanged: false
    };
  }

  reset = () => {
  	this.setState(this.initialState)
  }
  
  hasStateChanged = (newState) => {
  	if (
  		newState.name === this.originalState.name
  		&& newState.total_children === this.originalState.total_children
  		&& newState.ratio === this.originalState.ratio){
  		return true
  	}
  	return false
  }

  handleChange = name => event => {
    event.preventDefault();
    this.setState({ [name]: event.target.value, isChanged: true});
  };

  handleSubmit = event => {
  	this.setState({ isChanged: false })
  	this.props.editBaseSettings(
  		this.state.id,
      this.state.name,
      this.state.total_children,
      this.state.ratio
    );

    Alert.success("Endringen er registrert", {
      position: "bottom-right",
      effect: "jelly",
      timeout: 3000
    });
  }

  render() {
    return (
      <div className="settingsForm">
      	<form onSubmit={this.handleSubmit}>
	      	<FormControl>
	          <TextField
		          id="standard-name"
		          label="Navn"
		          className="textField"
		          type="text"
		          inputProps={{ pattern: "[A-ÅÆØÅ][a-åA-ÅæøåÆØÅ]*[^#&<>\"~;$^%{}?]"}}
		          value={this.state.name}
		          onChange={this.handleChange("name")}
		          margin="normal"
		        />
		        <TextField
		          id="standard-name"
		          label="Antall barn"
		          className="textField"
		          type="number"
		          inputProps={{ min: "0", max: "100", step: "1" }}
		          value={this.state.total_children}
		          onChange={this.handleChange("total_children")}
		          margin="normal"
		        />
		        <TextField
		          id="standard-name"
		          label="Forholdstall"
		          type="number"
		          inputProps={{ min: "0", max: "10", step: "0.01" }}
		          className="textField"
		          value={this.state.ratio}
		          onChange={this.handleChange("ratio")}
		          margin="normal"
		        />
		        <div className="settingsButtons">
			        <Button
		            type="submit"
		            value="Submit"
		            variant="outlined"
		            size="small"
		            color="primary"
		            style={style.editButton}
		          >
		            {"Registrer"}
		          </Button>
			        <Button
		            variant="outlined"
		            size="small"
		            color="secondary"
		            style={style.editButton}
		            onClick={this.reset}
		          >
		            {"Tilbakestill"}
		          </Button>
	          </div>

	        </FormControl>
        </form>
      </div>
    );
  }
}

const style = {
  editButton: {
    maxWidth: "130px",
    minWidth: "100px",
    margin: "5px auto",
    border: "1px solid",
    borderColor: Colors.EmployeeColors.moveableEmployee,
    color: Colors.EmployeeColors.moveableEmployee
  }
};

export default SettingsForm;
