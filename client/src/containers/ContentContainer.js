import React from "react";
import { connect } from "react-redux";
import { getBases } from "../actions/contentActions/contentBaseActions";
import { getEmployees } from "../actions/contentActions/contentEmployeeActions";
import { getAbsentEmployees } from "../actions/contentActions/contentAbsenceEmployeeActions";
import { getAbsentChildren } from "../actions/contentActions/contentAbsenceChildrenActions";

// components
import BaseOverview from "../components/BaseOverview";

class contentContainer extends React.Component {
  componentDidMount() {
    this.props.getBases();
    this.props.getEmployees();
    this.props.getAbsentEmployees();
    this.props.getAbsentChildren();
  }

  //Her skal komponentene som skal få data fra denne containeren ligge. Send ned den aktuelle dataen via props
  render() {
    return <BaseOverview bases={this.props.bases} employees={this.props.employees}/>
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBases: url => dispatch(getBases()),
    getEmployees: url => dispatch(getEmployees()),
    getAbsentEmployees: url => dispatch(getAbsentEmployees()),
    getAbsentChildren: url => dispatch(getAbsentChildren())
  };
};

const mapStateToProps = state => ({
  bases: state.contentBase.bases,
  employees: state.contentEmployee.employees,
  absentEmployees: state.contentAbsentEmployees.absentEmployees,
  absentChildren: state.contentAbsentChildren.absentChildren,
  loading: state.contentBase.loading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(contentContainer);
