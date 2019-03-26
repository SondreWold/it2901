import React, { Component } from "react";
import Alert from "react-s-alert";
import {
  Button,
  TextField,
  FormControl
} from "@material-ui/core";
import "./Settings.css";

class SettingsForm extends Component {
	constructor(props) {
    super(props);
		this.state = this.initialState;
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

  handleChange = name => event => {
    event.preventDefault();
  	this.setState({ [name]: event.target.value, isChanged: true});
  };

  handleSubmit = event => {
  	event.preventDefault();
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
		          inputProps={{ pattern: "[A-Z][a-z]*"}}
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

		        <Button
	            type="submit"
	            value="Submit"
	            variant={this.state.isChanged ? "contained" : "outlined"}
	            size="small"
	            color="primary"
	          >
	            {"Registrer endring"}
	          </Button>
	        </FormControl>
        </form>
      </div>
    );
  }
}

export default SettingsForm;
