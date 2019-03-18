import React, {Component} from "react";
import { connect } from "react-redux";
import {
  FormControlLabel,
  RadioGroup,
  Radio
} from '@material-ui/core';

class RadioBase extends Component {

state = {
  base: 1,
};

/*
if (this.props.bases.length > 0) {
{this.props.bases.map(base => {
  return(
    <RadioGroup value={this.state.value} onChange={this.handleChangeBase}>
      <FormControlLabel value={base.id} control={<Radio />} label={base.name}/>
    </RadioGroup>
  )
})
}
}
*/

  render(){

    return(
      <p> hei </p>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => ({
  bases: state.contentBase.bases,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RadioBase);
