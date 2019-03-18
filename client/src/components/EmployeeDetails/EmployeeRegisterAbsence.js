import React from "react";
import moment from "moment";
import DatePicker from "react-date-picker";
import Button from "@material-ui/core/Button";
import "./EmployeeRegisterAbsence.css";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

const calendar2 = require("../../images/calendar2.svg");

class EmployeeRegisterAbsence extends React.Component {
  constructor(props) {
    super(props);
    this.calendarIcon = (
      <img style={{ width: 20 }} src={calendar2} alt="calendar" />
    );

    // using tmp to avoid error when copying
    const tmp = new Date();
    this.state = {
      from: new Date(),
      to: new Date(tmp.setDate(tmp.getDate() + 1)),
      open: false
    };

    this.handleChangeFrom = this.handleChangeFrom.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChangeFrom(date) {
    date > this.state.to
      ? this.setState({ from: date, to: date })
      : this.setState({ from: date });
  }

  handleChangeTo(date) {
    this.state.from > date
      ? this.setState({ from: date, to: date })
      : this.setState({ to: date });
  }

  handleSubmit(event) {
    // in case there is no selectedEmployee
    if (this.props.selectedEmployee) {
      const diff = this.diffDates(this.state.from, this.state.to);
      console.log("SHOULD INSERT", diff.length, "ROWS");
      diff.forEach(date =>
        this.props.insertAbsentEmployee(this.props.selectedEmployee.id, date)
      );
    }
    this.setState({ open: false });
    event.preventDefault();
  }

  diffDates(date1, date2) {
    const a = moment(date1).format("YYYY-MM-DD");
    const b = moment(date2).format("YYYY-MM-DD");
    const m = moment(a);
    const dates = [];
    for (m; m.diff(b, "days") <= 0; m.add(1, "days")) {
      dates.push(m.format("YYYY-MM-DD"));
    }
    return dates;
  }

  render() {
    return (
      <div>
        <Button variant="contained" onClick={this.handleClickOpen}>
          <p>Legg til fravær</p>
        </Button>
        <Dialog
          open={this.state.open}
          actions={[
            <Button
                  style={style.submitButton}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {" "}
                  REGISTRER
                </Button>
          ]}
          onEscapeKeyDown={() => this.setState({ open: false })}
          onBackdropClick={() => this.setState({ open: false })}
        >
          <DialogTitle className="registerAbsenceHeader"> Registrer fravær </DialogTitle>
          <DialogContent>
            <div className="absenceFormWrapper">
              <h4> Velg antall dager med fravær </h4>
              <p> Fra og med </p>
              <form className="absenceForm" noValidate onSubmit={this.handleSubmit}>
                <DatePicker
                  className="absenceFormDatePicker"
                  onChange={this.handleChangeFrom}
                  clearIcon={null}
                  value={this.state.from}
                  locale={"nb"}
                  returnValue={"start"}
                  showLeadingZeros={true}
                  calendarIcon={this.calendarIcon}
                  placeholderText={"Fra"}
                  minDate={this.minDateObj}
                />
                <p> Til og med </p>
                <DatePicker
                  className="absenceFormDatePicker"
                  onChange={this.handleChangeTo}
                  clearIcon={null}
                  value={this.state.to}
                  locale={"nb"}
                  returnValue={"start"}
                  showLeadingZeros={true}
                  calendarIcon={this.calendarIcon}
                  minDate={this.state.from}
                />
                <Button
                  style={style.submitButton}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {" "}
                  REGISTRER
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const style = {
  // MUI Button doesn't support styling by className
  submitButton: {
    maxWidth: "200px",
    margin: "20px auto"
  }
};

export default EmployeeRegisterAbsence;
