import React from "react";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

export class InputField extends React.Component {
  handleTextChange = event => {
    let text = event.target.value;
    this.props.getEmployees(text);
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
