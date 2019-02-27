import React from "react";
import { connect } from "react-redux";
import { getBases } from "../actions/contentActions/contentBaseActions";
import { getEmployees } from "../actions/contentActions/contentEmployeeActions";
import { getAbsentEmployees } from "../actions/contentActions/contentAbsenceEmployeeActions";
import { changeDate } from "./../actions/dateAction";
import { getMovedEmployee } from "../actions/movedEmployeeAction";
import moment from "moment";
import BaseOverview from "../components/BaseOverview";
import { getAbsentChildren } from "../actions/contentActions/contentAbsenceChildrenActions";
import TotalOverview from "../components/TotalOverview/TotalOverview";


class contentContainer extends React.Component {

  componentDidMount() {
    this.fetchDataPoints();
    this.interval = setInterval(() => {
      this.fetchDataPoints();
    }, 1000);
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

  componentDidUpdate(prevProps) {
    if (prevProps.date !== this.props.date) {
      this.props.getAbsentChildren(
        moment(this.props.date).format("YYYY-MM-DD")
      );
      this.props.getMovedEmployee(moment(this.props.date).format("YYYY-MM-DD"));
    }
  }

    getTotalOverview = () => {
      let totalChildren = 0;
      let totalAbsentChildren = 0;
      let totalAbsentEmployees = this.props.absentEmployees.length;
      let totalEmployees = this.props.employees.length;
      console.log(this.props.employees);
      //Hvis ikke har med over null så klikker og blir bare undefined
      if (this.props.absentChildren.length > 0){
        this.props.absentChildren.map(obj => {
          const index = this.props.absentChildren.indexOf(obj);
          totalChildren += this.props.absentChildren[index].total_children;
          totalAbsentChildren += this.props.absentChildren[index].children;
        })
        return (
      <TotalOverview
        date={this.props.date}
        changeDate={this.props.changeDate}
        totalChildren={totalChildren}
        totalAbsentChildren = {totalAbsentChildren}
        totalEmployees = {totalEmployees}
        totalAbsentEmployees = {totalAbsentEmployees}
      />
    )}
    }

  //Her skal komponentene som skal få data fra denne containeren ligge. Send ned den aktuelle dataen via props
  render() {
    return (
      <div>
      {this.getTotalOverview()}
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
