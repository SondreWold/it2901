import React, { Component } from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Colors from '../../constants/Colors';


class EmployeeAbsenceList extends Component {

    render(){
        return(
            <div>
                <List style={style.list} component="nav">
                    <ListItem style={style.listItem}>
                        <ListItemText primary={"Her kommer det"}/>
                    </ListItem>
                    <ListItem style={style.listItem}>
                        <ListItemText primary={"en liste"}/>
                    </ListItem>
                    <ListItem style={style.listItem}>
                        <ListItemText primary={"Over fraværsdagene"}/>
                    </ListItem>
                    <ListItem style={style.listItem}>
                        <ListItemText primary={"til den"}/>
                    </ListItem>
                    <ListItem style={style.listItem}>
                        <ListItemText primary={"valgte ansatte"}/>
                    </ListItem>
                </List>
            </div>
        )
    }
} 

const style = {
    list: {
        width: "100%",
        border: "5px",
        minHeight: "150px",
        maxHeight: "200px",
        overflow: "auto"
      },
    listItem : {
        width: "99%",
        margin: "2px",
        border: "1px solid",
        borderColor: Colors.EmployeeColors.moveableEmployee,
        borderRadius: "10px",
        padding: "10px"
    }
}

export default EmployeeAbsenceList;