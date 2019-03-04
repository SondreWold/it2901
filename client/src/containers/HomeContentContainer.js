import React from "react";
import { connect } from "react-redux";
import { getBases } from "../actions/contentActions/contentBaseActions";
import { getEmployees } from "../actions/contentActions/contentEmployeeActions";
import { getAbsentEmployees } from "../actions/contentActions/contentAbsenceEmployeeActions";
import { changeDate } from "../actions/dateAction";
import { getMovedEmployee } from "../actions/movedEmployeeAction";
import moment from "moment";
import BaseOverview from "../components/BaseOverview";
import { getAbsentChildren } from "../actions/contentActions/contentAbsenceChildrenActions";
import TotalOverview from "../components/TotalOverview/TotalOverview";

class contentContainer extends React.Component {
  componentDidMount() {
    this.fetchDataPoints();
    //DO NOT DELETE
    /* this.interval = setInterval(() => {
      this.fetchDataPoints();
    }, 1000);*/
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchDataPoints() {
    this.props.getBases();
    this.props.getEmployees();
    this.props.getAbsentEmployees();
    this.props.getMovedEmployee(moment(this.props.date).format("YYYY-MM-DD"));
    this.props.getAbsentChildren(moment(this.props.date).format("YYYY-MM-DD"));
  }

  //Rerenders the page when new date is selected
  componentDidUpdate(prevProps) {
    if (prevProps.date !== this.props.date) {
      this.props.getAbsentChildren(
        moment(this.props.date).format("YYYY-MM-DD")
      );
      this.props.getMovedEmployee(moment(this.props.date).format("YYYY-MM-DD"));
    }
  }

  render() {
    return (
      <div>
        <TotalOverview
          date={this.props.date}
          changeDate={this.props.changeDate}
          children={this.props.absentChildren}
          employees={this.props.employees}
          absentEmployees={this.props.absentEmployees}
        />
        <BaseOverview/>
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
