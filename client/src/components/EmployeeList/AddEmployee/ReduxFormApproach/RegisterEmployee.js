import React from 'react';
import AddEmployeeForm from './AddEmployeeForm';
//import { Values } from 'redux-form-website-template';

class RegisterEmployee extends React.Component {
  //The submitted data is passed as JSON object to your onSubmit function
  submit = values => {
    //do your staff here, for now print the form to the console
    console.log(values);
  }
  render() {
    return (
      <div>
       <AddEmployeeForm onSubmit={this.submit} />
      </div>
    );
  }
}

export default RegisterEmployee;
