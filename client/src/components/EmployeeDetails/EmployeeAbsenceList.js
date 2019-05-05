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
import { MdClose, MdStayCurrentPortrait } from "react-icons/md";

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

  handleClick = absence => {
    if (absence[1]) {
      this.props.removeAbsence(
        this.props.selectedEmployee.id,
        moment(absence[1].date).format("YYYY-MM-DD"),
        moment(absence[0].date).format("YYYY-MM-DD")
      );
    } else {
      this.props.removeAbsence(
        this.props.selectedEmployee.id,
        moment(absence.date).format("YYYY-MM-DD")
      );
    }
  };

  createDateList = (startDate, endDate) => {
    let dateList = [];
    startDate = moment(startDate).valueOf();
    endDate = moment(endDate).valueOf();
    console.log(endDate - startDate);

    while (startDate <= endDate) {
      console.log("lol");
      dateList.push(moment(startDate).format("YYYY-MM-DD"));
      startDate += 1000 * 60 * 60 * 24;
    }
    return dateList;
  };

  formatDate = date => {
    return moment(date)
      .locale("nb", localization)
      .format("Do MMMM YYYY");
  };

  formatList = absenceList => {
    let abs = [];
    absenceList.forEach(absence => {
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
              {absenceList.length !== 0
                ? absenceList.map((absence, index) => {
                    let text;
                    if (absence[1]) {
                      text =
                        this.formatDate(absence[1].date) +
                        " - " +
                        this.formatDate(absence[0].date);
                    } else {
                      text = this.formatDate(absence.date);
                    }
                    return (
                      <ListItem key={index} style={style.listItem}>
                        <ListItemText primary={text} />
                        <button
                          style={style.button}
                          onClick={() => this.handleClick(absence)}
                        >
                          <MdClose />
                        </button>
                      </ListItem>
                    );
                  })
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
    borderBottom: "1px solid",
    borderColor: Colors.EmployeeColors.borderColor,
    padding: "10px",
    textAlign: "center"
  },
  button: {
    paddingTop: 5,
    cursor: "pointer",
    backgroundColor: "Transparent",
    border: "none"
  }
};

export default EmployeeAbsenceList;
