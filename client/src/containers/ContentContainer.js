import React from "react";
import { connect } from "react-redux";
import { getBases } from "../actions/contentActions/contentBaseActions";
import { getEmployees } from "../actions/contentActions/contentEmployeeActions";
import { getAbsentEmployees } from "../actions/contentActions/contentAbsenceEmployeeActions";

class contentContainer extends React.Component {
  componentDidMount() {
    this.props.getBases();
    this.props.getEmployees();
    this.props.getAbsentEmployees();
  }

  render() {
    return <p>Yo, sjekk redux logg for å kontrollere at shit har kommet</p>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBases: url => dispatch(getBases()),
    getEmployees: url => dispatch(getEmployees()),
    getAbsentEmployees: url => dispatch(getAbsentEmployees())
  };
};

const mapStateToProps = state => ({
  bases: state.contentBase.bases,
  employees: state.contentEmployee.employees,
  absentEmployees: state.contentAbsentEmployees.absentEmployees
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(contentContainer);
