import React from "react";
import TextField from "@material-ui/core/TextField";

export class InputField extends React.Component {
  handleTextChange = event => {
    let text = event.target.value;
    this.props.getSearchEmployees(text);
  };

  render() {
    return (
      <TextField
        id="outlined-full-width"
        label="Søk i ansatte"
        style={{ margin: 8 }}
        placeholder="Feks: Børge Brende"
        helperText=""
        fullWidth
        onChange={this.handleTextChange}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
      />
    );
  }
}
