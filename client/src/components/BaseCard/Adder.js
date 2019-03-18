import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import AddEmployee from "../EmployeeList/AddEmployee";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

class Adder extends Component {
  constructor(props) {
    super(props);
    this.state = { icon: true, open: false, selectedIndex: [] };
  }

  addTemp = () => {
    this.close();
    for (let i = 0; i < this.state.selectedIndex.length; i++) {
      this.props.addTempToBase(
        this.props.date,
        this.state.selectedIndex[i],
        this.props.base.id
      );
    }
  };

  close = () => {
    this.setState({ open: false, selectedIndex: [] });
  };

  selectTemp = id => {
    if (this.state.selectedIndex.includes(id)) {
      var array = [...this.state.selectedIndex];
      array.splice(array.indexOf(id), 1);
      this.setState({ selectedIndex: array });
    } else {
      this.setState(prevState => ({
        selectedIndex: [...prevState.selectedIndex, id]
      }));
    }
  };

  render() {
    return (
      <div>
        {" "}
        {this.state.icon ? (
          <div
            className="addButton"
            onMouseOver={() => this.setState({ icon: false })}
          >
            <div className="ic" key="1">
              <MaterialIcon icon="add" color="white" size={18} />
            </div>
          </div>
        ) : (
          <div
            className="addText"
            onMouseLeave={() => this.setState({ icon: true })}
            onClick={() => this.setState({ open: true })}
          >
            <div className="txt">Legg til vikar på base</div>
            <div className="ic" key="2">
              <MaterialIcon icon="add" color="white" size={18} />
            </div>
          </div>
        )}
        <Dialog
          open={this.state.open}
          onEscapeKeyDown={this.close}
          onBackdropClick={this.close}
        >
          <DialogTitle> Legg til vikar på {this.props.base.name} </DialogTitle>
          <DialogContent>
            <div style={style.window}>
              <div style={style.new}>
                <div>Legg til ny: </div>
                <AddEmployee />
              </div>
              <List style={style.list} component="nav">
                {this.props.freeTemps.map(employee => (
                  <ListItem
                    style={
                      this.state.selectedIndex.includes(employee.id)
                        ? style.listItemSelected
                        : employee.position === 1
                        ? style.listItemRegular
                        : style.listItemTemporary
                    }
                    button
                    key={employee.id}
                    onClick={() => this.selectTemp(employee.id)}
                  >
                    <ListItemText
                      primary={employee.first_name + " " + employee.last_name}
                    />
                  </ListItem>
                ))}
              </List>
              {
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.addTemp}
                  disabled={this.state.selectedIndex.length === 0}
                >
                  Legg til
                </Button>
              }
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const style = {
  window: {
    padding: "5%"
  },
  list: {
    width: "100%",
    border: "5px",
    maxHeight: "300px",
    overflow: "auto"
  },
  listItemRegular: {
    margin: "2px",
    backgroundColor: "#43a047"
  },
  listItemTemporary: {
    margin: "2px",
    backgroundColor: "#fb8c00"
  },
  listItemSelected: {
    margin: "2px",
    backgroundColor: "#0091ea"
  },
  new: {
    display: "flex",
    justifyContent: "space-around"
  }
};

export default Adder;
