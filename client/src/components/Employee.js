import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import Colors from "../constants/Colors";
import { withStyles } from "@material-ui/core";
import { MdClose } from "react-icons/md";
import moment from "moment";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props =>
    props.isDragging ? Colors.EmployeeColors.selectedEmployee : "white"};
  display: flex;
`;

const HandleRegular = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${Colors.EmployeeColors.moveableEmployee};
  border-radius: 10px;
  margin-right: 8px;
`;

const HandleTemp = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${Colors.EmployeeColors.tempEmployee};
  border-radius: 10px;
  margin-right: 8px;
`;

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = { showX: false };
  }

  employeeClicked = () => {
    this.setState({ showX: true });
  };

  componentDidMount() {}
  handleClick = () => {
    this.props.delete(
      this.props.employee.employee_id,
      moment(this.props.date).format("YYYY-MM-DD"),
      this.props.baseId,
      this.props.index
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <Draggable
        draggableId={this.props.employee.employee_id}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            onMouseOver={() => this.setState({ showX: true })}
            onMouseLeave={() => this.setState({ showX: false })}
          >
            {this.props.employee.position === 2 ? (
              <HandleTemp />
            ) : (
              <HandleRegular />
            )}
            {this.props.employee.first_name}
            {this.props.employee.position === 2 && (
              <div className={classes.root}>
                {this.state.showX && (
                  <button className={classes.button} onClick={this.handleClick}>
                    <MdClose />
                  </button>
                )}
              </div>
            )}
          </Container>
        )}
      </Draggable>
    );
  }
}

const styles = theme => ({
  root: {
    textAlign: "right",
    flex: 1
  },
  button: {
    color: "#696969",
    cursor: "pointer",
    backgroundColor: "Transparent",
    border: "none"
  }
});

export default withStyles(styles)(Employee);
