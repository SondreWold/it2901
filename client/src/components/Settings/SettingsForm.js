import React, { Component } from "react";

import {
  Button,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio
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
		          value={this.state.name}
		          onChange={this.handleChange("name")}
		          margin="normal"
		        />
		        <TextField
		          id="standard-name"
		          label="Antall barn"
		          className="textField"
		          value={this.state.total_children}
		          onChange={this.handleChange("total_children")}
		          margin="normal"
		        />
		        <TextField
		          id="standard-name"
		          label="Forholdstall"
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
