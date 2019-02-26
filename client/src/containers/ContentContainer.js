import React from "react";
import { connect } from "react-redux";
import { getBases } from "../actions/contentActions/contentBaseActions";
import { getEmployees } from "../actions/contentActions/contentEmployeeActions";
import { getAbsentEmployees } from "../actions/contentActions/contentAbsenceEmployeeActions";
import { changeDate } from "./../actions/dateAction";
import DateComponent from "../components/DateComponent";
import { getMovedEmployee } from "../actions/movedEmployeeAction";
import moment from "moment";
import BaseOverview from "../components/BaseOverview";
import { getAbsentChildren } from "../actions/contentActions/contentAbsenceChildrenActions";

class contentContainer extends React.Component {
  componentDidMount() {
    this.props.getBases();
    this.props.getEmployees();
    this.props.getAbsentEmployees();
    this.props.getMovedEmployee(moment(this.props.date).format("YYYY-MM-DD"));
    this.props.getAbsentChildren(moment(this.props.date).format("YYYY-MM-DD"));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.date !== this.props.date) {
      this.props.getAbsentChildren(
        moment(this.props.date).format("YYYY-MM-DD")
      );
      this.props.getMovedEmployee(moment(this.props.date).format("YYYY-MM-DD"));
    }
  }

  //Her skal komponentene som skal få data fra denne containeren ligge. Send ned den aktuelle dataen via props
  render() {
    return (
      <div>
        <DateComponent
          date={this.props.date}
          changeDate={this.props.changeDate}
        />

        <BaseOverview
          moved_employees={this.props.moved_employees}
          bases={this.props.bases}
          employees={this.props.employees}
          date={moment(this.props.date).format("YYYY-MM-DD")}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBases: url => dispatch(getBases()),
    getEmployees: url => dispatch(getEmployees()),
    getAbsentEmployees: url => dispatch(getAbsentEmployees()),
    getAbsentChildren: date => dispatch(getAbsentChildren(date)),
    getMovedEmployee: date => dispatch(getMovedEmployee(date)),
    changeDate: date => dispatch(changeDate(date))
  };
};

const mapStateToProps = state => ({
  bases: state.contentBase.bases,
  employees: state.contentEmployee.employees,
  absentEmployees: state.contentAbsentEmployees.absentEmployees,
  absentChildren: state.contentAbsentChildren.absentChildren,
  loading: state.contentBase.loading,
  moved_employees: state.movedEmployee.data,
  date: state.date.selectedDate,
  dateSet: state.date.dateSet
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(contentContainer);
