import React from "react";
import DatePicker from "react-date-picker";
import { Button } from "@material-ui/core";
import "./EmployeeDetails.css";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { TiPlus } from "react-icons/ti";
import Alert from "react-s-alert";
import Colors from "../../constants/Colors";
import * as fn from "../../constants/Functions";
import { FaUserClock } from "react-icons/fa";
import Checkbox from "@material-ui/core/Checkbox";

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
      open: false,
      severalDays: false
    };

    this.handleChangeFrom = this.handleChangeFrom.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const tmp = new Date();
    this.setState({
      from: new Date(),
      to: new Date(tmp.setDate(tmp.getDate() + 1)),
      open: false,
      severalDays: false
    });
  };

  handleChangeFrom(date) {
    let date2 = new Date(date.getTime());
    date > this.state.to
      ? this.setState({
          from: date,
          to: new Date(date2.setDate(date2.getDate() + 1))
        })
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
      const diff = fn.diffDates(
        this.state.from,
        this.state.severalDays ? this.state.to : this.state.from
      );
      diff.forEach(date =>
        this.props.insertAbsentEmployee(this.props.selectedEmployee.id, date)
      );
    }
    this.handleClose();
    event.preventDefault();
    Alert.success("Fravær registrert", {
      position: "bottom-right",
      effect: "jelly",
      timeout: 3000
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen} style={style.addAbsenceButton}>
          <TiPlus />
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
          onEscapeKeyDown={this.handleClose}
          onBackdropClick={this.handleClose}
        >
          <DialogTitle className="registerAbsenceHeader">
            {" "}
            Registrer fravær{" "}
          </DialogTitle>
          <DialogContent className="dialogContent">
            <div className="absenceFormWrapper">
              <h4> Velg antall dager med fravær </h4>
              <form
                className="absenceForm"
                noValidate
                onSubmit={this.handleSubmit}
              >
                <div className="datePickers">
                  <FaUserClock size="150px" style={{ marginLeft: "12%" }} />
                  <div className="dateHolder">
                    <b> {this.state.severalDays ? "Fra og med" : <br />} </b>
                    <DatePicker
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
                  <div>
                    Flere dager:
                    <Checkbox
                      checked={this.state.severalDays}
                      onChange={() =>
                        this.setState({ severalDays: !this.state.severalDays })
                      }
                      value="checkedB"
                      color="primary"
                    />
                  </div>
                  {this.state.severalDays && (
                    <div className="dateHolder">
                      <b> Til og med </b>
                      <DatePicker
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
                  )}
                  <Button
                    style={style.submitButton}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    {" "}
                    REGISTRER
                  </Button>
                </div>
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
    minWidth: "150px",
    margin: "20px auto",
    marginTop: "5px",
    border: "1px solid",
    borderColor: Colors.EmployeeColors.moveableEmployee,
    color: Colors.EmployeeColors.moveableEmployee
  }
};

export default EmployeeRegisterAbsence;
