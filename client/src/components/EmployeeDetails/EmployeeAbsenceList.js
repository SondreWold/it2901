import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Colors from "../../constants/Colors";
import "./EmployeeDetails.css";
import moment from "moment";
import localization from "moment/locale/nb";
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";

const override = css`
  margin-top: 10%;
  display: block;
`;

class EmployeeAbsenceList extends Component {
  componentDidMount() {
    this.props.getAbsence(this.props.selectedEmployee.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedEmployee !== this.props.selectedEmployee) {
      this.props.getAbsence(this.props.selectedEmployee.id);
    }
  }

  formatDate = date => {
    return moment(date)
      .locale("nb", localization)
      .format("Do MMMM YYYY");
  };

  formatList = absenceList => {
    let abs = [];
    absenceList.map(absence => {
      let last = abs[abs.length - 1];

      absence.date = moment(absence.date).set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      })._i;

      if (last) {
        if (last[1]) {
          last = last[1];
        }
        if (
          (moment(last.date).valueOf() - moment(absence.date).valueOf()) /
            1000 /
            60 /
            60 <=
          25
        ) {
          if (!abs[abs.length - 1][1]) {
            abs[abs.length - 1] = [abs[abs.length - 1]];
            abs[abs.length - 1].push(absence);
          } else {
            abs[abs.length - 1][1] = absence;
          }
        } else {
          abs.push(absence);
        }
      } else {
        abs.push(absence);
      }
    });
    for (let i = 0; i < abs.length; i++) {
      if (abs[i][1]) {
        abs[i] =
          this.formatDate(abs[i][1].date) +
          " - " +
          this.formatDate(abs[i][0].date);
      } else {
        abs[i] = this.formatDate(abs[i].date);
      }
    }
    return abs;
  };

  render() {
    const absenceList = this.formatList(this.props.absence);


    return (
      <div>
        {this.props.loading ? (
          <ClipLoader
            css={override}
            sizeUnit={"px"}
            size={50}
            color={"#123abc"}
            loading={this.props.loading}
          />
        ) : (
          <div>
            <h3>Fravær </h3>
            <List style={style.list} className="absenceList" component="nav">
              {absenceList !== 0
                ? absenceList.map((absence, index) => (
                    <ListItem key={index} style={style.listItem}>
                      <ListItemText primary={absence} />
                    </ListItem>
                  ))
                : "Ingen fraværshistorikk å vise..."}
            </List>
          </div>
        )}
      </div>
    );
  }
}

const style = {
  list: {
    margin: "auto"
  },
  listItem: {
    width: "99%",
    margin: "2px",
    border: "1px solid",
    borderColor: Colors.EmployeeColors.borderColor,
    borderRadius: "10px",
    padding: "10px",
    textAlign: "center"
  }
};

export default EmployeeAbsenceList;
