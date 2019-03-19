import React from "react";
import moment from "moment";
import DatePicker from "react-date-picker";
import { Button } from "@material-ui/core";
import "./EmployeeDetails.css";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { TiPlus } from 'react-icons/ti';
import Alert from 'react-s-alert';
import Colors from "../../constants/Colors";

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
    	const diff = this.diffDates(this.state.from, this.state.to)
	    diff.forEach( date => this.props.insertAbsentEmployee(this.props.selectedEmployee.id, date))
    }
    this.setState({ open: false });
    event.preventDefault();
    Alert.success('Fravær registrert', {
      position: 'bottom-right',
      effect: 'jelly',
      timeout: 3000
    });
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
        <Button onClick={this.handleClickOpen} style={style.addAbsenceButton}>
          <TiPlus/>
          Legg til fravær
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
              <form className="absenceForm" noValidate onSubmit={this.handleSubmit}>
                <div className="dateHolder">
                  <b> Fra og med </b>
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
                </div>
                <div className="dateHolder">
                  <b> Til og med </b>
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
                </div>
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
    margin: "20px auto",
    marginTop: "45px"
  },
  addAbsenceButton: {
    maxWidth: "200px",
    minWidth:"150px",
    margin: "20px auto",
    marginTop: "5px",
    border: "1px solid",
    borderColor: Colors.EmployeeColors.moveableEmployee,
    color: Colors.EmployeeColors.moveableEmployee
  },
};

export default EmployeeRegisterAbsence;
