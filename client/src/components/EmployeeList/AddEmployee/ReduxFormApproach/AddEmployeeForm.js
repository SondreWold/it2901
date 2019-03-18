import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioButtonGroup,
  Radio,
  RadioGroup,
  DialogActions,
  MuiThemeProvider,
  getMuiTheme,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {FaUserPlus} from "react-icons/fa";
//simport RadioBase from './RadioBase';
//Redux Form
import {Field, reduxForm} from 'redux-form';
//import NameInput from './NameInput';

/*To make your form component communicate with the store, we need to wrap it with reduxForm().
 It will provide the props about the form state and function to handle the submit process.
*/

//teste ut og prøve noen små fileds
//<Field> component connects each input to the store
//It creates an HTML <input/> element of type text.
// It also passes additional props such as value, onChange, onBlur, etc.
// Those are used to track and maintain the input state under the hood.

/* Try this one then
<FormLabel> Fornavn </FormLabel>
<Field name="firstName" component="TextField"/>
*/

const renderTextField = (
  {input, label, meta:{ touched, error}, ...custom},
) => (
  <TextField
    hintText={label}
    label={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

const renderRadio = ({input, ...rest}) => (
  <RadioGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

let AddEmployeeForm = props => {
  const {handleSubmit, pristine, submitting} = props;
  return (
    //Redax Form skal da provide selve submit funksjonalitet allerede
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="firstName" component={renderTextField} label = "Fornavn" />
      </div>
      <div>
        <Field name="lastName" component={renderTextField} label="Etternavn" />
      </div>
      <div>
        <FormControl>
          <FormLabel> Ansettelsesform </FormLabel>
            <Field name="position" component={renderRadio}>
              <FormControlLabel value="1" control={<Radio />} label="Fast ansatt"/>
              <FormControlLabel value="2" control={<Radio />} label="Vikar"/>
            </Field>
        </FormControl>
      </div>
      <Button type="submit" variant="contained" disabled={pristine || submitting}> Registrer </Button>
    </form>
  );
};




//have to wrap this component with form reducer to get access to needed functionality
AddEmployeeForm = reduxForm({
  //a unique name for the form
  form: 'AddEmployeeForm'
})(AddEmployeeForm)

export default AddEmployeeForm;
