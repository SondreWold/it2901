import React from "react";
import { connect } from "react-redux";
import { getBases } from "../actions/contentActions/contentBaseActions";
import { getEmployees } from "../actions/contentActions/contentEmployeeActions";
import { getAbsentEmployees } from "../actions/contentActions/contentAbsenceEmployeeActions";
import {
  getAbsentChildren,
  updateAbsentChildren
} from "../actions/contentActions/contentAbsenceChildrenActions";
import { changeDate } from "./../actions/dateAction";
import ChildrenPresent from "../components/ChildrenPresent";
import ChildrenAbsentIncDec from "../components/ChildrenAbsentIncDec";
import DateComponent from "../components/DateComponent";

class contentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: "2019-02-19" };
  }

  componentDidMount() {
    this.props.getBases();
    this.props.getEmployees();
    this.props.getAbsentEmployees();
    this.props.getAbsentChildren(this.props.date);
  }

  //Her skal komponentene som skal få data fra denne containeren ligge. Send ned den aktuelle dataen via props
  render() {
    return (
      <div>
        <p>Content Container //ToBeRemoved </p>
        {this.props.absentChildren
          .sort((a, b) => a.base_id - b.base_id)
          .map(absence => (
            <div>
              <ChildrenPresent
                base={absence.base_id}
                absent={absence.children}
                totalChildren={absence.total_children}
              />
              <ChildrenAbsentIncDec
                base={absence.base_id}
                absent={absence.children}
                date={absence.date}
                totalChildren={absence.total_children}
                update={this.props.updateAbsentChildren}
              />
            </div>
          ))}

        <DateComponent
          date={this.props.date}
          dateSet={this.props.dateSet}
          changeDate={this.props.changeDate}
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
    changeDate: date => dispatch(changeDate(date)),
    updateAbsentChildren: (amount, baseId, date) =>
      dispatch(updateAbsentChildren(amount, baseId, date))
  };
};

const mapStateToProps = state => ({
  bases: state.contentBase.bases,
  employees: state.contentEmployee.employees,
  absentEmployees: state.contentAbsentEmployees.absentEmployees,
  absentChildren: state.contentAbsentChildren.absentChildren,
  date: state.date.selectedDate,
  dateSet: state.date.dateSet
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(contentContainer);
